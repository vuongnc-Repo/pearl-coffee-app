import { useState } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { useToast } from '../components/common/Toast';
import { getInitials, getAvatarColor } from '../constants/theme';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input, { Select } from '../components/common/Input';
import Card from '../components/common/Card';
import { StatusBadge } from '../components/common/Badge';
import Badge from '../components/common/Badge';
import { Plus, Edit3, Trash2, Users, ChevronLeft, ChevronRight, Phone, ArrowRight, ArrowLeft } from 'lucide-react';
import './EmployeesPage.css';

const EMPTY_EMPLOYEE = { name: '', role: '', phone: '', email: '' };
const EMPTY_TASK = { title: '', description: '', assigneeId: '', priority: 'medium', dueDate: '' };
const TASK_COLUMNS = [
  { key: 'todo', label: 'To Do' },
  { key: 'inprogress', label: 'In Progress' },
  { key: 'done', label: 'Done' },
];

export default function EmployeesPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee, tasks, addTask, updateTask, deleteTask, moveTask } = useEmployees();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('team');
  const [showEmpModal, setShowEmpModal] = useState(false);
  const [editEmp, setEditEmp] = useState(null);
  const [empForm, setEmpForm] = useState(EMPTY_EMPLOYEE);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState(EMPTY_TASK);

  function handleEmpChange(field, value) {
    setEmpForm(prev => ({ ...prev, [field]: value }));
  }

  function handleTaskChange(field, value) {
    setTaskForm(prev => ({ ...prev, [field]: value }));
  }

  function openAddEmployee() {
    setEmpForm(EMPTY_EMPLOYEE);
    setEditEmp(null);
    setShowEmpModal(true);
  }

  function openEditEmployee(emp) {
    setEmpForm({ name: emp.name, role: emp.role, phone: emp.phone || '', email: emp.email || '' });
    setEditEmp(emp);
    setShowEmpModal(true);
  }

  function handleEmpSubmit(e) {
    e.preventDefault();
    if (!empForm.name.trim() || !empForm.role.trim()) {
      toast('Name and role are required', 'error');
      return;
    }
    if (editEmp) {
      updateEmployee(editEmp.id, empForm);
      toast('Employee updated', 'success');
    } else {
      addEmployee(empForm);
      toast('Employee added', 'success');
    }
    setShowEmpModal(false);
  }

  function handleDeleteEmployee(emp) {
    deleteEmployee(emp.id);
    toast(`${emp.name} removed`, 'success');
  }

  function openAddTask() {
    setTaskForm(EMPTY_TASK);
    setShowTaskModal(true);
  }

  function handleTaskSubmit(e) {
    e.preventDefault();
    if (!taskForm.title.trim()) {
      toast('Task title is required', 'error');
      return;
    }
    addTask(taskForm);
    toast('Task created', 'success');
    setShowTaskModal(false);
  }

  function handleMoveTask(taskId, direction) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const order = ['todo', 'inprogress', 'done'];
    const idx = order.indexOf(task.status);
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= order.length) return;
    moveTask(taskId, order[newIdx]);
  }

  function handleDeleteTask(taskId) {
    deleteTask(taskId);
    toast('Task deleted', 'success');
  }

  function getAssigneeName(id) {
    const emp = employees.find(e => e.id === id);
    return emp ? emp.name : 'Unassigned';
  }

  return (
    <div className="employees-page">
      <div className="employees-page__header">
        <div>
          <h2 className="employees-page__title">Team & Tasks</h2>
          <p className="employees-page__subtitle">{employees.length} team members</p>
        </div>
        <div className="employees-page__header-actions">
          {activeTab === 'team' ? (
            <Button onClick={openAddEmployee}><Plus size={16} /> Add Employee</Button>
          ) : (
            <Button onClick={openAddTask}><Plus size={16} /> Add Task</Button>
          )}
        </div>
      </div>

      <div className="employees-page__tabs">
        <button
          className={`employees-page__tab ${activeTab === 'team' ? 'employees-page__tab--active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          <Users size={16} /> Team
        </button>
        <button
          className={`employees-page__tab ${activeTab === 'tasks' ? 'employees-page__tab--active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <ChevronRight size={16} /> Task Board
        </button>
      </div>

      {activeTab === 'team' && (
        <div className="employees-page__grid">
          {employees.length === 0 ? (
            <div className="employees-page__empty">
              <Users size={48} />
              <p>No team members yet</p>
            </div>
          ) : (
            employees.map(emp => (
              <Card key={emp.id} className="employee-card">
                <div className="employee-card__top">
                  <div className="employee-card__avatar" style={{ background: getAvatarColor(emp.name) }}>
                    {getInitials(emp.name)}
                  </div>
                  <div className="employee-card__actions">
                    <button className="employee-card__btn" onClick={() => openEditEmployee(emp)} title="Edit">
                      <Edit3 size={14} />
                    </button>
                    <button className="employee-card__btn employee-card__btn--delete" onClick={() => handleDeleteEmployee(emp)} title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3 className="employee-card__name">{emp.name}</h3>
                <p className="employee-card__role">{emp.role}</p>
                {emp.phone && (
                  <p className="employee-card__phone"><Phone size={12} /> {emp.phone}</p>
                )}
                <div className="employee-card__footer">
                  <StatusBadge status={emp.status || 'active'} />
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="kanban">
          {TASK_COLUMNS.map(col => {
            const colTasks = tasks.filter(t => t.status === col.key);
            return (
              <div key={col.key} className="kanban__column">
                <div className="kanban__column-header">
                  <h3>{col.label}</h3>
                  <span className="kanban__count">{colTasks.length}</span>
                </div>
                <div className="kanban__cards">
                  {colTasks.length === 0 ? (
                    <p className="kanban__empty-col">No tasks</p>
                  ) : (
                    colTasks.map(task => (
                      <div key={task.id} className="kanban__card">
                        <div className="kanban__card-header">
                          <span className="kanban__card-title">{task.title}</span>
                          <button className="kanban__card-delete" onClick={() => handleDeleteTask(task.id)} title="Delete task">
                            <Trash2 size={12} />
                          </button>
                        </div>
                        {task.description && (
                          <p className="kanban__card-desc">{task.description}</p>
                        )}
                        <div className="kanban__card-meta">
                          <span className="kanban__card-assignee">{getAssigneeName(task.assigneeId)}</span>
                          {task.dueDate && <span className="kanban__card-due">{task.dueDate}</span>}
                        </div>
                        <div className="kanban__card-footer">
                          <StatusBadge status={task.priority} />
                          <div className="kanban__card-arrows">
                            {col.key !== 'todo' && (
                              <button className="kanban__arrow-btn" onClick={() => handleMoveTask(task.id, -1)} title="Move left">
                                <ArrowLeft size={14} />
                              </button>
                            )}
                            {col.key !== 'done' && (
                              <button className="kanban__arrow-btn" onClick={() => handleMoveTask(task.id, 1)} title="Move right">
                                <ArrowRight size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal isOpen={showEmpModal} onClose={() => setShowEmpModal(false)} title={editEmp ? 'Edit Employee' : 'Add Employee'}>
        <form className="employees-page__form" onSubmit={handleEmpSubmit}>
          <Input label="Full Name *" value={empForm.name} onChange={e => handleEmpChange('name', e.target.value)} placeholder="e.g. Alex Rivera" />
          <Input label="Role *" value={empForm.role} onChange={e => handleEmpChange('role', e.target.value)} placeholder="e.g. Head Barista" />
          <Input label="Phone" value={empForm.phone} onChange={e => handleEmpChange('phone', e.target.value)} placeholder="Optional" />
          <Input label="Email" type="email" value={empForm.email} onChange={e => handleEmpChange('email', e.target.value)} placeholder="Optional" />
          <div className="employees-page__form-actions">
            <Button variant="ghost" onClick={() => setShowEmpModal(false)}>Cancel</Button>
            <Button type="submit">{editEmp ? 'Update' : 'Add Employee'}</Button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={showTaskModal} onClose={() => setShowTaskModal(false)} title="Add Task">
        <form className="employees-page__form" onSubmit={handleTaskSubmit}>
          <Input label="Title *" value={taskForm.title} onChange={e => handleTaskChange('title', e.target.value)} placeholder="Task title" />
          <Input label="Description" type="textarea" value={taskForm.description} onChange={e => handleTaskChange('description', e.target.value)} placeholder="Optional description" />
          <Select label="Assignee" value={taskForm.assigneeId} onChange={e => handleTaskChange('assigneeId', e.target.value)}>
            <option value="">Unassigned</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </Select>
          <div className="employees-page__form-row">
            <Select label="Priority" value={taskForm.priority} onChange={e => handleTaskChange('priority', e.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
            <Input label="Due Date" type="date" value={taskForm.dueDate} onChange={e => handleTaskChange('dueDate', e.target.value)} />
          </div>
          <div className="employees-page__form-actions">
            <Button variant="ghost" onClick={() => setShowTaskModal(false)}>Cancel</Button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
