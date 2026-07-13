import { useState } from 'react';
import { useStock } from '../hooks/useStock';
import { useToast } from '../components/common/Toast';
import { formatCurrency, formatDate } from '../utils/formatters';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input, { Select } from '../components/common/Input';
import Badge from '../components/common/Badge';
import { Plus, Edit3, Trash2, Package, AlertTriangle, RefreshCw } from 'lucide-react';
import './StockPage.css';

const CATEGORIES = ['all', 'beans', 'dairy', 'sweeteners', 'syrups', 'supplies', 'other'];
const UNITS = ['grams', 'ml', 'pieces', 'packs'];

const EMPTY_FORM = {
  name: '', category: 'beans', quantity: '', unit: 'grams',
  minThreshold: '', costPerUnit: '', supplier: '',
};

export default function StockPage() {
  const { items, addItem, updateItem, deleteItem, restockItem, lowStockItems, getByCategory } = useStock();
  const toast = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [restockTarget, setRestockTarget] = useState(null);
  const [restockQty, setRestockQty] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);

  const filteredItems = getByCategory(activeCategory);

  function getStockStatus(item) {
    if (item.quantity === 0) return 'critical';
    if (item.quantity <= item.minThreshold) return 'low';
    return 'ok';
  }

  function handleFormChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditItem(null);
    setShowAddModal(true);
  }

  function openEdit(item) {
    setForm({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      minThreshold: item.minThreshold,
      costPerUnit: item.costPerUnit,
      supplier: item.supplier || '',
    });
    setEditItem(item);
    setShowAddModal(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.quantity || !form.minThreshold || !form.costPerUnit) {
      toast('Please fill in all required fields', 'error');
      return;
    }
    const data = {
      ...form,
      quantity: Number(form.quantity),
      minThreshold: Number(form.minThreshold),
      costPerUnit: Number(form.costPerUnit),
    };

    if (editItem) {
      updateItem(editItem.id, data);
      toast('Ingredient updated successfully', 'success');
    } else {
      addItem(data);
      toast('Ingredient added successfully', 'success');
    }
    setShowAddModal(false);
    setEditItem(null);
  }

  function handleDelete(item) {
    deleteItem(item.id);
    toast(`${item.name} deleted`, 'success');
  }

  function openRestock(item) {
    setRestockTarget(item);
    setRestockQty('');
  }

  function handleRestock(e) {
    e.preventDefault();
    const qty = Number(restockQty);
    if (!qty || qty <= 0) {
      toast('Enter a valid quantity', 'error');
      return;
    }
    restockItem(restockTarget.id, qty);
    toast(`${restockTarget.name} restocked with ${qty} ${restockTarget.unit}`, 'success');
    setRestockTarget(null);
  }

  return (
    <div className="stock-page">
      <div className="stock-page__header">
        <div>
          <h2 className="stock-page__title">Inventory Management</h2>
          <p className="stock-page__subtitle">{items.length} ingredients tracked</p>
        </div>
        <Button onClick={openAdd}><Plus size={16} /> Add Ingredient</Button>
      </div>

      {lowStockItems.length > 0 && (
        <div className="stock-page__alert-banner">
          <AlertTriangle size={18} />
          <span><strong>{lowStockItems.length}</strong> item{lowStockItems.length > 1 ? 's' : ''} running low: {lowStockItems.map(i => i.name).join(', ')}</span>
        </div>
      )}

      <div className="stock-page__tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`stock-page__tab ${activeCategory === cat ? 'stock-page__tab--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="stock-page__table-wrapper">
        {filteredItems.length === 0 ? (
          <div className="stock-page__empty">
            <Package size={48} />
            <p>No ingredients found</p>
          </div>
        ) : (
          <table className="stock-page__table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Last Restocked</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => {
                const status = getStockStatus(item);
                return (
                  <tr key={item.id} className={status !== 'ok' ? 'stock-page__row--alert' : ''}>
                    <td className="stock-page__name">
                      {item.name}
                      {item.supplier && <span className="stock-page__supplier">{item.supplier}</span>}
                    </td>
                    <td>
                      <Badge variant="gold">{item.category}</Badge>
                    </td>
                    <td>
                      <span className={`stock-page__qty stock-page__qty--${status}`}>
                        {item.quantity} {item.unit}
                      </span>
                    </td>
                    <td>
                      <Badge variant={status === 'ok' ? 'success' : status === 'low' ? 'warning' : 'danger'}>
                        {status === 'ok' ? 'OK' : status === 'low' ? 'Low' : 'Critical'}
                      </Badge>
                    </td>
                    <td className="stock-page__date">
                      {item.lastRestocked ? formatDate(item.lastRestocked) : '---'}
                    </td>
                    <td>
                      <div className="stock-page__actions">
                        <button className="stock-page__action-btn stock-page__action-btn--restock" onClick={() => openRestock(item)} title="Restock">
                          <RefreshCw size={15} />
                        </button>
                        <button className="stock-page__action-btn stock-page__action-btn--edit" onClick={() => openEdit(item)} title="Edit">
                          <Edit3 size={15} />
                        </button>
                        <button className="stock-page__action-btn stock-page__action-btn--delete" onClick={() => handleDelete(item)} title="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={editItem ? 'Edit Ingredient' : 'Add Ingredient'}>
        <form className="stock-page__form" onSubmit={handleSubmit}>
          <Input label="Name *" value={form.name} onChange={e => handleFormChange('name', e.target.value)} placeholder="e.g. Arabica Beans" />
          <div className="stock-page__form-row">
            <Select label="Category *" value={form.category} onChange={e => handleFormChange('category', e.target.value)}>
              {CATEGORIES.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </Select>
            <Select label="Unit *" value={form.unit} onChange={e => handleFormChange('unit', e.target.value)}>
              {UNITS.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </Select>
          </div>
          <div className="stock-page__form-row">
            <Input label="Quantity *" type="number" min="0" value={form.quantity} onChange={e => handleFormChange('quantity', e.target.value)} />
            <Input label="Min Threshold *" type="number" min="0" value={form.minThreshold} onChange={e => handleFormChange('minThreshold', e.target.value)} />
          </div>
          <Input label="Cost Per Unit ($) *" type="number" min="0" step="0.01" value={form.costPerUnit} onChange={e => handleFormChange('costPerUnit', e.target.value)} />
          <Input label="Supplier" value={form.supplier} onChange={e => handleFormChange('supplier', e.target.value)} placeholder="Optional" />
          <div className="stock-page__form-actions">
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit">{editItem ? 'Update' : 'Add Ingredient'}</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!restockTarget} onClose={() => setRestockTarget(null)} title={`Restock ${restockTarget?.name || ''}`} size="sm">
        <form className="stock-page__form" onSubmit={handleRestock}>
          <p className="stock-page__restock-info">
            Current: <strong>{restockTarget?.quantity} {restockTarget?.unit}</strong>
          </p>
          <Input
            label={`Add Quantity (${restockTarget?.unit || ''})`}
            type="number"
            min="1"
            value={restockQty}
            onChange={e => setRestockQty(e.target.value)}
            placeholder="Enter quantity to add"
          />
          <div className="stock-page__form-actions">
            <Button variant="ghost" onClick={() => setRestockTarget(null)}>Cancel</Button>
            <Button type="submit">Restock</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
