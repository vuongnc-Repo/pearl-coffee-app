import { useState } from 'react';
import { useRecipes } from '../hooks/useRecipes';
import { useStock } from '../hooks/useStock';
import { useToast } from '../components/common/Toast';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { categoryGradients } from '../constants/theme';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input, { Select } from '../components/common/Input';
import Badge from '../components/common/Badge';
import Card from '../components/common/Card';
import { Plus, Trash2, Clock, DollarSign, TrendingUp, ChevronDown, ChevronUp, X } from 'lucide-react';
import './RecipesPage.css';

const CATEGORIES = ['all', 'hot', 'iced', 'blended', 'specialty'];

const EMPTY_RECIPE = {
  name: '', category: 'hot', description: '', sellingPrice: '',
  prepTime: '', ingredients: [], steps: [''],
};

export default function RecipesPage() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe, getByCategory } = useRecipes();
  const { items: stockItems } = useStock();
  const toast = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedRecipe, setExpandedRecipe] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(EMPTY_RECIPE);
  const [editRecipe, setEditRecipe] = useState(null);

  const filteredRecipes = getByCategory(activeCategory);

  function handleFormChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function openAdd() {
    setForm(EMPTY_RECIPE);
    setEditRecipe(null);
    setShowAddModal(true);
  }

  function openEdit(recipe) {
    setForm({
      name: recipe.name,
      category: recipe.category,
      description: recipe.description || '',
      sellingPrice: recipe.sellingPrice,
      prepTime: recipe.prepTime || '',
      ingredients: recipe.ingredients || [],
      steps: recipe.steps && recipe.steps.length > 0 ? recipe.steps : [''],
    });
    setEditRecipe(recipe);
    setShowAddModal(true);
  }

  function addIngredientRow() {
    setForm(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { stockId: '', quantity: '', unit: '' }],
    }));
  }

  function removeIngredientRow(idx) {
    setForm(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== idx),
    }));
  }

  function updateIngredient(idx, field, value) {
    setForm(prev => {
      const updated = [...prev.ingredients];
      updated[idx] = { ...updated[idx], [field]: value };
      if (field === 'stockId') {
        const stock = stockItems.find(s => s.id === value);
        if (stock) updated[idx].unit = stock.unit;
      }
      return { ...prev, ingredients: updated };
    });
  }

  function addStep() {
    setForm(prev => ({ ...prev, steps: [...prev.steps, ''] }));
  }

  function removeStep(idx) {
    setForm(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== idx),
    }));
  }

  function updateStep(idx, value) {
    setForm(prev => {
      const steps = [...prev.steps];
      steps[idx] = value;
      return { ...prev, steps };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.sellingPrice) {
      toast('Name and selling price are required', 'error');
      return;
    }
    const data = {
      ...form,
      sellingPrice: Number(form.sellingPrice),
      prepTime: form.prepTime ? Number(form.prepTime) : null,
      ingredients: form.ingredients
        .filter(ing => ing.stockId && ing.quantity)
        .map(ing => ({ ...ing, quantity: Number(ing.quantity) })),
      steps: form.steps.filter(s => s.trim()),
    };

    if (editRecipe) {
      updateRecipe(editRecipe.id, data);
      toast('Recipe updated', 'success');
    } else {
      addRecipe(data);
      toast('Recipe added', 'success');
    }
    setShowAddModal(false);
  }

  function handleDelete(recipe) {
    deleteRecipe(recipe.id);
    toast(`${recipe.name} deleted`, 'success');
    if (expandedRecipe === recipe.id) setExpandedRecipe(null);
  }

  function toggleExpand(recipeId) {
    setExpandedRecipe(prev => prev === recipeId ? null : recipeId);
  }

  function getStockName(stockId) {
    const item = stockItems.find(s => s.id === stockId);
    return item ? item.name : 'Unknown';
  }

  return (
    <div className="recipes-page">
      <div className="recipes-page__header">
        <div>
          <h2 className="recipes-page__title">Recipe Book</h2>
          <p className="recipes-page__subtitle">{recipes.length} recipes</p>
        </div>
        <Button onClick={openAdd}><Plus size={16} /> Add Recipe</Button>
      </div>

      <div className="recipes-page__tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`recipes-page__tab ${activeCategory === cat ? 'recipes-page__tab--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filteredRecipes.length === 0 ? (
        <div className="recipes-page__empty">
          <p>No recipes found</p>
        </div>
      ) : (
        <div className="recipes-page__grid">
          {filteredRecipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <div
                className="recipe-card__image"
                style={{ background: categoryGradients[recipe.category] || categoryGradients.hot }}
                onClick={() => toggleExpand(recipe.id)}
              >
                <div className="recipe-card__image-overlay">
                  <Badge variant="gold">{recipe.category}</Badge>
                </div>
              </div>
              <div className="recipe-card__body">
                <div className="recipe-card__top" onClick={() => toggleExpand(recipe.id)}>
                  <h3 className="recipe-card__name">{recipe.name}</h3>
                  {expandedRecipe === recipe.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {recipe.description && (
                  <p className="recipe-card__desc">{recipe.description}</p>
                )}
                <div className="recipe-card__stats">
                  <div className="recipe-card__stat">
                    <DollarSign size={14} />
                    <span className="recipe-card__stat-label">Price</span>
                    <span className="recipe-card__stat-value">{formatCurrency(recipe.sellingPrice)}</span>
                  </div>
                  <div className="recipe-card__stat">
                    <TrendingUp size={14} />
                    <span className="recipe-card__stat-label">Cost</span>
                    <span className="recipe-card__stat-value">{formatCurrency(recipe.costPerServing)}</span>
                  </div>
                  <div className="recipe-card__stat recipe-card__stat--margin">
                    <span className="recipe-card__stat-label">Margin</span>
                    <span className="recipe-card__stat-value">{formatPercentage(recipe.marginPercent)}</span>
                  </div>
                </div>

                {expandedRecipe === recipe.id && (
                  <div className="recipe-card__detail">
                    {recipe.prepTime && (
                      <div className="recipe-card__prep">
                        <Clock size={14} /> {recipe.prepTime} min prep time
                      </div>
                    )}

                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                      <div className="recipe-card__section">
                        <h4>Ingredients</h4>
                        <ul className="recipe-card__ingredients">
                          {recipe.ingredients.map((ing, idx) => (
                            <li key={idx}>
                              <span>{getStockName(ing.stockId)}</span>
                              <span className="recipe-card__ing-qty">{ing.quantity} {ing.unit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {recipe.steps && recipe.steps.length > 0 && (
                      <div className="recipe-card__section">
                        <h4>Steps</h4>
                        <ol className="recipe-card__steps">
                          {recipe.steps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    )}

                    <div className="recipe-card__section">
                      <h4>Cost Breakdown</h4>
                      <div className="recipe-card__cost-breakdown">
                        <div className="recipe-card__cost-row">
                          <span>Ingredient Cost</span>
                          <span>{formatCurrency(recipe.costPerServing)}</span>
                        </div>
                        <div className="recipe-card__cost-row">
                          <span>Selling Price</span>
                          <span>{formatCurrency(recipe.sellingPrice)}</span>
                        </div>
                        <div className="recipe-card__cost-row recipe-card__cost-row--total">
                          <span>Profit Margin</span>
                          <span className="recipe-card__profit">{formatCurrency(recipe.margin)} ({formatPercentage(recipe.marginPercent)})</span>
                        </div>
                      </div>
                    </div>

                    <div className="recipe-card__detail-actions">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(recipe)}>Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(recipe)}>Delete</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title={editRecipe ? 'Edit Recipe' : 'Add Recipe'} size="lg">
        <form className="recipes-page__form" onSubmit={handleSubmit}>
          <Input label="Recipe Name *" value={form.name} onChange={e => handleFormChange('name', e.target.value)} placeholder="e.g. Caramel Latte" />
          <div className="recipes-page__form-row">
            <Select label="Category *" value={form.category} onChange={e => handleFormChange('category', e.target.value)}>
              {CATEGORIES.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </Select>
            <Input label="Selling Price ($) *" type="number" min="0" step="0.01" value={form.sellingPrice} onChange={e => handleFormChange('sellingPrice', e.target.value)} />
          </div>
          <div className="recipes-page__form-row">
            <Input label="Description" value={form.description} onChange={e => handleFormChange('description', e.target.value)} placeholder="Optional" />
            <Input label="Prep Time (min)" type="number" min="0" value={form.prepTime} onChange={e => handleFormChange('prepTime', e.target.value)} />
          </div>

          <div className="recipes-page__form-section">
            <div className="recipes-page__form-section-header">
              <h4>Ingredients</h4>
              <Button variant="ghost" size="sm" type="button" onClick={addIngredientRow}><Plus size={14} /> Add</Button>
            </div>
            {form.ingredients.map((ing, idx) => (
              <div key={idx} className="recipes-page__ingredient-row">
                <Select value={ing.stockId} onChange={e => updateIngredient(idx, 'stockId', e.target.value)}>
                  <option value="">Select ingredient...</option>
                  {stockItems.map(item => (
                    <option key={item.id} value={item.id}>{item.name} ({item.unit})</option>
                  ))}
                </Select>
                <Input type="number" min="0" step="0.1" value={ing.quantity} onChange={e => updateIngredient(idx, 'quantity', e.target.value)} placeholder="Qty" />
                <span className="recipes-page__ingredient-unit">{ing.unit || '---'}</span>
                <button type="button" className="recipes-page__remove-btn" onClick={() => removeIngredientRow(idx)}>
                  <X size={14} />
                </button>
              </div>
            ))}
            {form.ingredients.length === 0 && (
              <p className="recipes-page__form-hint">No ingredients added yet</p>
            )}
          </div>

          <div className="recipes-page__form-section">
            <div className="recipes-page__form-section-header">
              <h4>Steps</h4>
              <Button variant="ghost" size="sm" type="button" onClick={addStep}><Plus size={14} /> Add</Button>
            </div>
            {form.steps.map((step, idx) => (
              <div key={idx} className="recipes-page__step-row">
                <span className="recipes-page__step-num">{idx + 1}.</span>
                <Input value={step} onChange={e => updateStep(idx, e.target.value)} placeholder={`Step ${idx + 1}`} />
                {form.steps.length > 1 && (
                  <button type="button" className="recipes-page__remove-btn" onClick={() => removeStep(idx)}>
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="recipes-page__form-actions">
            <Button variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit">{editRecipe ? 'Update Recipe' : 'Add Recipe'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
