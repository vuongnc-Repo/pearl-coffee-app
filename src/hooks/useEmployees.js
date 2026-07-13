import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../utils/storage';

export function useEmployees() {
  const [employees, setEmployees] = useLocalStorage('pearl_employees', []);
  const [tasks, setTasks] = useLocalStorage('pearl_tasks', []);
  const [shifts, setShifts] = useLocalStorage('pearl_shifts', []);

  const addEmployee = useCallback((employee) => {
    const newEmp = { ...employee, id: generateId('emp'), status: 'active' };
    setEmployees(prev => [...prev, newEmp]);
    return newEmp;
  }, [setEmployees]);

  const updateEmployee = useCallback((id, updates) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  }, [setEmployees]);

  const deleteEmployee = useCallback((id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  }, [setEmployees]);

  const addTask = useCallback((task) => {
    const newTask = {
      ...task,
      id: generateId('tsk'),
      status: 'todo',
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, [setTasks]);

  const updateTask = useCallback((id, updates) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      const updated = { ...t, ...updates };
      if (updates.status === 'done' && !t.completedAt) {
        updated.completedAt = new Date().toISOString();
      }
      return updated;
    }));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  const moveTask = useCallback((id, newStatus) => {
    updateTask(id, { status: newStatus });
  }, [updateTask]);

  const addShift = useCallback((shift) => {
    const newShift = { ...shift, id: generateId('shf') };
    setShifts(prev => [...prev, newShift]);
    return newShift;
  }, [setShifts]);

  const deleteShift = useCallback((id) => {
    setShifts(prev => prev.filter(s => s.id !== id));
  }, [setShifts]);

  return {
    employees, addEmployee, updateEmployee, deleteEmployee,
    tasks, addTask, updateTask, deleteTask, moveTask,
    shifts, addShift, deleteShift,
  };
}