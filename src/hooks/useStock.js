import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../utils/storage';

export function useStock() {
  const [items, setItems] = useLocalStorage('pearl_stock', []);

  const addItem = useCallback((item) => {
    const newItem = {
      ...item,
      id: generateId('stk'),
      createdAt: new Date().toISOString(),
      lastRestocked: new Date().toISOString(),
    };
    setItems(prev => [...prev, newItem]);
    return newItem;
  }, [setItems]);

  const updateItem = useCallback((id, updates) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }, [setItems]);

  const deleteItem = useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, [setItems]);

  const restockItem = useCallback((id, quantity) => {
    setItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + quantity, lastRestocked: new Date().toISOString() }
        : item
    ));
  }, [setItems]);

  const lowStockItems = useMemo(() =>
    items.filter(item => item.quantity <= item.minThreshold),
  [items]);

  const getByCategory = useCallback((category) => {
    if (!category || category === 'all') return items;
    return items.filter(item => item.category === category);
  }, [items]);

  const deductStock = useCallback((ingredientsList) => {
    setItems(prev => {
      const updated = [...prev];
      for (const ingredient of ingredientsList) {
        const idx = updated.findIndex(s => s.id === ingredient.stockId);
        if (idx !== -1) {
          updated[idx] = { ...updated[idx], quantity: Math.max(0, updated[idx].quantity - ingredient.quantity) };
        }
      }
      return updated;
    });
  }, [setItems]);

  return { items, addItem, updateItem, deleteItem, restockItem, lowStockItems, getByCategory, deductStock };
}