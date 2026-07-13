import './Badge.css';

export default function Badge({ children, variant = 'default', size = 'sm' }) {
  return <span className={`badge badge--${variant} badge--${size}`}>{children}</span>;
}

export function StatusBadge({ status }) {
  const map = {
    active: 'success', inactive: 'default',
    todo: 'warning', inprogress: 'info', done: 'success',
    completed: 'success', cancelled: 'danger',
    low: 'default', medium: 'warning', high: 'danger',
  };
  const labels = {
    todo: 'To Do', inprogress: 'In Progress', done: 'Done',
    active: 'Active', inactive: 'Inactive',
    completed: 'Completed', cancelled: 'Cancelled',
    low: 'Low', medium: 'Medium', high: 'High',
  };
  return <Badge variant={map[status] || 'default'}>{labels[status] || status}</Badge>;
}