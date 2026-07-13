import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../utils/storage';

export function useOrders() {
  const [orders, setOrders] = useLocalStorage('pearl_orders', []);

  const addOrder = useCallback((orderData) => {
    const newOrder = {
      ...orderData,
      id: generateId('ord'),
      status: 'completed',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, [setOrders]);

  const cancelOrder = useCallback((id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'cancelled' } : o));
  }, [setOrders]);

  const todayOrders = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return orders.filter(o => o.createdAt.startsWith(today) && o.status === 'completed');
  }, [orders]);

  const todayRevenue = useMemo(() =>
    todayOrders.reduce((sum, o) => sum + o.total, 0),
  [todayOrders]);

  const getOrdersByRange = useCallback((startDate, endDate) => {
    return orders.filter(o => {
      const d = new Date(o.createdAt);
      return d >= startDate && d <= endDate && o.status === 'completed';
    });
  }, [orders]);

  const popularItems = useCallback((days = 30) => {
    const start = new Date();
    start.setDate(start.getDate() - days);
    const relevantOrders = orders.filter(o => new Date(o.createdAt) >= start && o.status === 'completed');

    const itemCounts = {};
    relevantOrders.forEach(order => {
      order.items.forEach(item => {
        if (!itemCounts[item.name]) itemCounts[item.name] = 0;
        itemCounts[item.name] += item.quantity;
      });
    });

    return Object.entries(itemCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [orders]);

  const revenueByDay = useCallback((days = 7) => {
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayOrders = orders.filter(o => o.createdAt.startsWith(dateStr) && o.status === 'completed');
      const revenue = dayOrders.reduce((sum, o) => sum + o.total, 0);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      result.push({
        date: dateStr,
        day: dayNames[date.getDay()],
        revenue: Math.round(revenue * 100) / 100,
        orders: dayOrders.length,
      });
    }
    return result;
  }, [orders]);

  return { orders, addOrder, cancelOrder, todayOrders, todayRevenue, getOrdersByRange, popularItems, revenueByDay };
}