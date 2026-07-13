import { useNavigate } from 'react-router-dom';
import { useStock } from '../hooks/useStock';
import { useOrders } from '../hooks/useOrders';
import { useEmployees } from '../hooks/useEmployees';
import { formatCurrency } from '../utils/formatters';
import { ShoppingCart, DollarSign, AlertTriangle, ListTodo, Plus, Package, ClipboardList } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { StatusBadge } from '../components/common/Badge';
import './DashboardOverview.css';

export default function DashboardOverview() {
  const { lowStockItems } = useStock();
  const { todayOrders, todayRevenue } = useOrders();
  const { tasks } = useEmployees();
  const navigate = useNavigate();

  const activeTasks = tasks.filter(t => t.status !== 'done').length;

  const stats = [
    { label: "Today's Orders", value: todayOrders.length, icon: ShoppingCart, color: 'var(--color-info)' },
    { label: "Today's Revenue", value: formatCurrency(todayRevenue), icon: DollarSign, color: 'var(--color-success)' },
    { label: 'Low Stock Items', value: lowStockItems.length, icon: AlertTriangle, color: lowStockItems.length > 0 ? 'var(--color-warning)' : 'var(--color-success)' },
    { label: 'Active Tasks', value: activeTasks, icon: ListTodo, color: 'var(--color-gold-primary)' },
  ];

  return (
    <div className="overview">
      <div className="overview__stats">
        {stats.map(stat => (
          <Card key={stat.label} className="stat-card">
            <div className="stat-card__icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-card__info">
              <span className="stat-card__value">{stat.value}</span>
              <span className="stat-card__label">{stat.label}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="overview__grid">
        <Card className="overview__section">
          <div className="overview__section-header">
            <h3>Recent Orders</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/orders')}>View All</Button>
          </div>
          {todayOrders.length === 0 ? (
            <p className="overview__empty">No orders today yet</p>
          ) : (
            <div className="overview__table-wrapper">
              <table className="overview__table">
                <thead>
                  <tr><th>Order ID</th><th>Items</th><th>Total</th><th>Payment</th></tr>
                </thead>
                <tbody>
                  {todayOrders.slice(0, 5).map(order => (
                    <tr key={order.id}>
                      <td className="overview__order-id">{order.id}</td>
                      <td>{order.items.map(i => i.name).join(', ')}</td>
                      <td>{formatCurrency(order.total)}</td>
                      <td><StatusBadge status={order.paymentMethod} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        <Card className="overview__section">
          <div className="overview__section-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="overview__actions">
            <Button variant="primary" onClick={() => navigate('/dashboard/orders')}><Plus size={16} /> New Order</Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard/stock')}><Package size={16} /> Manage Stock</Button>
            <Button variant="secondary" onClick={() => navigate('/dashboard/employees')}><ClipboardList size={16} /> View Tasks</Button>
          </div>

          {lowStockItems.length > 0 && (
            <div className="overview__alerts">
              <h4><AlertTriangle size={16} /> Low Stock Alerts</h4>
              {lowStockItems.map(item => (
                <div key={item.id} className="overview__alert-item">
                  <span>{item.name}</span>
                  <span className="overview__alert-qty">{item.quantity} {item.unit} left</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}