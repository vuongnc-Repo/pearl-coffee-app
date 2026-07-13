import { useState, useMemo } from 'react';
import { useOrders } from '../hooks/useOrders';
import { useRecipes } from '../hooks/useRecipes';
import { useStock } from '../hooks/useStock';
import { useToast } from '../components/common/Toast';
import { formatCurrency, formatDate, formatTime } from '../utils/formatters';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Select } from '../components/common/Input';
import Badge from '../components/common/Badge';
import { StatusBadge } from '../components/common/Badge';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Plus, Trash2, ShoppingCart, DollarSign, TrendingUp,
  CreditCard, Banknote, Receipt,
} from 'lucide-react';
import './OrdersPage.css';

const ANALYTICS_TABS = ['today', 'week', 'month'];

export default function OrdersPage() {
  const { orders, addOrder, todayOrders, todayRevenue, revenueByDay, popularItems } = useOrders();
  const { recipes } = useRecipes();
  const { deductStock } = useStock();
  const toast = useToast();

  const [orderItems, setOrderItems] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [selectedQty, setSelectedQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [analyticsTab, setAnalyticsTab] = useState('today');

  const orderTotal = useMemo(() =>
    orderItems.reduce((sum, item) => sum + item.subtotal, 0),
  [orderItems]);

  function addItemToOrder() {
    if (!selectedRecipe) {
      toast('Select a drink first', 'error');
      return;
    }
    const recipe = recipes.find(r => r.id === selectedRecipe);
    if (!recipe) return;

    const qty = Math.max(1, Number(selectedQty) || 1);
    const existing = orderItems.find(i => i.recipeId === recipe.id);
    if (existing) {
      setOrderItems(prev => prev.map(i =>
        i.recipeId === recipe.id
          ? { ...i, quantity: i.quantity + qty, subtotal: (i.quantity + qty) * i.price }
          : i
      ));
    } else {
      setOrderItems(prev => [...prev, {
        recipeId: recipe.id,
        name: recipe.name,
        price: recipe.sellingPrice,
        quantity: qty,
        subtotal: recipe.sellingPrice * qty,
        ingredients: recipe.ingredients || [],
      }]);
    }
    setSelectedRecipe('');
    setSelectedQty(1);
  }

  function removeOrderItem(recipeId) {
    setOrderItems(prev => prev.filter(i => i.recipeId !== recipeId));
  }

  function handleSubmitOrder() {
    if (orderItems.length === 0) {
      toast('Add at least one item', 'error');
      return;
    }

    const orderData = {
      items: orderItems.map(i => ({
        recipeId: i.recipeId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        subtotal: i.subtotal,
      })),
      total: orderTotal,
      paymentMethod,
    };

    addOrder(orderData);

    const allIngredients = [];
    for (const item of orderItems) {
      if (item.ingredients) {
        for (const ing of item.ingredients) {
          allIngredients.push({
            stockId: ing.stockId,
            quantity: ing.quantity * item.quantity,
          });
        }
      }
    }
    if (allIngredients.length > 0) {
      deductStock(allIngredients);
    }

    toast(`Order placed - ${formatCurrency(orderTotal)}`, 'success');
    setOrderItems([]);
    setPaymentMethod('cash');
  }

  const analyticsData = useMemo(() => {
    const daysMap = { today: 1, week: 7, month: 30 };
    const days = daysMap[analyticsTab];
    const revenue = revenueByDay(days);
    const popular = popularItems(days);

    const totalOrders = revenue.reduce((sum, d) => sum + d.orders, 0);
    const totalRev = revenue.reduce((sum, d) => sum + d.revenue, 0);
    const avgOrder = totalOrders > 0 ? totalRev / totalOrders : 0;

    return { revenue, popular: popular.slice(0, 8), totalOrders, totalRev, avgOrder };
  }, [analyticsTab, revenueByDay, popularItems]);

  const recentOrders = orders.slice(0, 20);

  return (
    <div className="orders-page">
      <div className="orders-page__header">
        <div>
          <h2 className="orders-page__title">Orders</h2>
          <p className="orders-page__subtitle">{todayOrders.length} orders today</p>
        </div>
      </div>

      <div className="orders-page__layout">
        {/* New Order Form */}
        <Card className="orders-page__new-order">
          <h3 className="orders-page__section-title"><ShoppingCart size={18} /> New Order</h3>

          <div className="orders-page__add-row">
            <Select value={selectedRecipe} onChange={e => setSelectedRecipe(e.target.value)}>
              <option value="">Select drink...</option>
              {recipes.map(r => (
                <option key={r.id} value={r.id}>{r.name} - {formatCurrency(r.sellingPrice)}</option>
              ))}
            </Select>
            <input
              type="number"
              className="orders-page__qty-input"
              min="1"
              value={selectedQty}
              onChange={e => setSelectedQty(e.target.value)}
            />
            <Button size="sm" onClick={addItemToOrder}><Plus size={14} /></Button>
          </div>

          {orderItems.length > 0 && (
            <div className="orders-page__line-items">
              {orderItems.map(item => (
                <div key={item.recipeId} className="orders-page__line-item">
                  <div className="orders-page__line-info">
                    <span className="orders-page__line-name">{item.name}</span>
                    <span className="orders-page__line-qty">x{item.quantity} @ {formatCurrency(item.price)}</span>
                  </div>
                  <div className="orders-page__line-right">
                    <span className="orders-page__line-subtotal">{formatCurrency(item.subtotal)}</span>
                    <button className="orders-page__line-remove" onClick={() => removeOrderItem(item.recipeId)}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="orders-page__total-section">
            <div className="orders-page__total-row">
              <span>Total</span>
              <span className="orders-page__total-value">{formatCurrency(orderTotal)}</span>
            </div>
          </div>

          <div className="orders-page__payment">
            <label className="orders-page__payment-label">Payment Method</label>
            <div className="orders-page__payment-options">
              <button
                className={`orders-page__payment-btn ${paymentMethod === 'cash' ? 'orders-page__payment-btn--active' : ''}`}
                onClick={() => setPaymentMethod('cash')}
              >
                <Banknote size={16} /> Cash
              </button>
              <button
                className={`orders-page__payment-btn ${paymentMethod === 'card' ? 'orders-page__payment-btn--active' : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={16} /> Card
              </button>
            </div>
          </div>

          <Button className="orders-page__submit-btn" onClick={handleSubmitOrder} disabled={orderItems.length === 0}>
            <Receipt size={16} /> Place Order
          </Button>
        </Card>

        {/* Analytics */}
        <div className="orders-page__analytics">
          <div className="orders-page__analytics-tabs">
            {ANALYTICS_TABS.map(tab => (
              <button
                key={tab}
                className={`orders-page__analytics-tab ${analyticsTab === tab ? 'orders-page__analytics-tab--active' : ''}`}
                onClick={() => setAnalyticsTab(tab)}
              >
                {tab === 'today' ? 'Today' : tab === 'week' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>

          <div className="orders-page__summary-cards">
            <Card className="orders-page__summary-card">
              <div className="orders-page__summary-icon" style={{ background: 'rgba(33, 150, 243, 0.15)', color: 'var(--color-info)' }}>
                <ShoppingCart size={20} />
              </div>
              <div>
                <span className="orders-page__summary-value">{analyticsData.totalOrders}</span>
                <span className="orders-page__summary-label">Orders</span>
              </div>
            </Card>
            <Card className="orders-page__summary-card">
              <div className="orders-page__summary-icon" style={{ background: 'rgba(76, 175, 80, 0.15)', color: 'var(--color-success)' }}>
                <DollarSign size={20} />
              </div>
              <div>
                <span className="orders-page__summary-value">{formatCurrency(analyticsData.totalRev)}</span>
                <span className="orders-page__summary-label">Revenue</span>
              </div>
            </Card>
            <Card className="orders-page__summary-card">
              <div className="orders-page__summary-icon" style={{ background: 'var(--color-gold-muted)', color: 'var(--color-gold-primary)' }}>
                <TrendingUp size={20} />
              </div>
              <div>
                <span className="orders-page__summary-value">{formatCurrency(analyticsData.avgOrder)}</span>
                <span className="orders-page__summary-label">Avg Order</span>
              </div>
            </Card>
          </div>

          {analyticsData.revenue.length > 1 && (
            <Card className="orders-page__chart-card">
              <h4 className="orders-page__chart-title">Revenue Trend</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.revenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,169,110,0.1)" />
                  <XAxis dataKey="day" stroke="#6b6560" tick={{ fill: '#a09888', fontSize: 12 }} />
                  <YAxis stroke="#6b6560" tick={{ fill: '#a09888', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: '#242424', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 8 }} />
                  <Line type="monotone" dataKey="revenue" stroke="#c9a96e" strokeWidth={2} dot={{ fill: '#c9a96e', r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          )}

          {analyticsData.popular.length > 0 && (
            <Card className="orders-page__chart-card">
              <h4 className="orders-page__chart-title">Popular Items</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.popular} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,169,110,0.1)" />
                  <XAxis type="number" stroke="#6b6560" tick={{ fill: '#a09888', fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" stroke="#6b6560" tick={{ fill: '#a09888', fontSize: 12 }} width={120} />
                  <Tooltip contentStyle={{ background: '#242424', border: '1px solid rgba(201,169,110,0.2)', borderRadius: 8 }} />
                  <Bar dataKey="count" fill="#c9a96e" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          )}
        </div>
      </div>

      {/* Order History */}
      {recentOrders.length > 0 && (
        <Card className="orders-page__history">
          <h3 className="orders-page__section-title"><Receipt size={18} /> Recent Orders</h3>
          <div className="orders-page__history-table-wrapper">
            <table className="orders-page__history-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td className="orders-page__order-id">{order.id}</td>
                    <td className="orders-page__order-date">
                      {formatDate(order.createdAt)}<br />
                      <span className="orders-page__order-time">{formatTime(order.createdAt)}</span>
                    </td>
                    <td>{order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</td>
                    <td className="orders-page__order-total">{formatCurrency(order.total)}</td>
                    <td>
                      <Badge variant="gold">{order.paymentMethod}</Badge>
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
