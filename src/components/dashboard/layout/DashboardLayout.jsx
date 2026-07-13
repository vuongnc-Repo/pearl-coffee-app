import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import './DashboardLayout.css';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/dashboard/stock': 'Stock Management',
  '/dashboard/employees': 'Employees & Workflow',
  '/dashboard/recipes': 'Recipes',
  '/dashboard/orders': 'Orders & Analytics',
};

export default function DashboardLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <DashboardHeader title={title} />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}