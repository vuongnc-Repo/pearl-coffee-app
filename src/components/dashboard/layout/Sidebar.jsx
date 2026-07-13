import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import { Coffee, LayoutDashboard, Package, Users, BookOpen, ShoppingCart, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Sidebar.css';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview', end: true },
  { to: '/dashboard/stock', icon: Package, label: 'Stock' },
  { to: '/dashboard/employees', icon: Users, label: 'Employees' },
  { to: '/dashboard/recipes', icon: BookOpen, label: 'Recipes' },
  { to: '/dashboard/orders', icon: ShoppingCart, label: 'Orders' },
];

export default function Sidebar() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__logo" onClick={() => { navigate('/'); setMobileOpen(false); }}>
          <Coffee size={28} strokeWidth={1.5} />
          <span>Pearl Coffee</span>
        </div>
        <nav className="sidebar__nav">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar__footer">
          <button className="sidebar__link sidebar__logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
    </>
  );
}