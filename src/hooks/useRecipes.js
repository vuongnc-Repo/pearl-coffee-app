import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../utils/storage';

export function useRecipes() {
  const [recipes, setRecipes] = useLocalStorage('pearl_recipes', []);
  const [stock] = useLocalStorage('pearl_stock', []);

  const addRecipe = useCallback((recipe) => {
    const newRecipe = {
      ...recipe,
      id: generateId('rcp'),
      createdAt: new Date().toISOString(),
    };
    setRecipes(prev => [...prev, newRecipe]);
    return newRecipe;
  }, [setRecipes]);

  const updateRecipe = useCallback((id, updates) => {
    setRecipes(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  }, [setRecipes]);

  const deleteRecipe = useCallback((id) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  }, [setRecipes]);

  const calculateCost = useCallback((recipe) => {
    if (!recipe?.ingredients) return 0;
    return recipe.ingredients.reduce((total, ing) => {
      const stockItem = stock.find(s => s.id === ing.stockId);
      if (!stockItem) return total;
      return total + (ing.quantity * stockItem.costPerUnit);
    }, 0);
  }, [stock]);

  const recipesWithCosts = useMemo(() =>
    recipes.map(r => ({
      ...r,
      costPerServing: calculateCost(r),
      margin: r.sellingPrice - calculateCost(r),
      marginPercent: r.sellingPrice > 0 ? ((r.sellingPrice - calculateCost(r)) / r.sellingPrice) : 0,
    })),
  [recipes, calculateCost]);

  const getByCategory = useCallback((category) => {
    if (!category || category === 'all') return recipesWithCosts;
    return recipesWithCosts.filter(r => r.category === category);
  }, [recipesWithCosts]);

  return { recipes: recipesWithCosts, addRecipe, updateRecipe, deleteRecipe, calculateCost, getByCategory };
}