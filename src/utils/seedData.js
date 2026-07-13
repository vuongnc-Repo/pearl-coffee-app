import { getItem, setItem } from './storage';
import { defaultStock, defaultEmployees, defaultRecipes, defaultOrders, defaultTasks, defaultShifts } from '../constants/defaultData';

export function initializeSeedData() {
  const settings = getItem('pearl_settings');
  if (settings?.dataSeeded) return;

  setItem('pearl_stock', defaultStock);
  setItem('pearl_employees', defaultEmployees);
  setItem('pearl_recipes', defaultRecipes);
  setItem('pearl_orders', defaultOrders);
  setItem('pearl_tasks', defaultTasks);
  setItem('pearl_shifts', defaultShifts);
  setItem('pearl_settings', {
    shopName: 'Pearl Coffee',
    currency: 'USD',
    taxRate: 0.08,
    dataSeeded: true,
    version: '1.0.0',
  });
}