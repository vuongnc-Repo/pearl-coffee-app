import { useAuthContext } from '../../../context/AuthContext';
import { useStock } from '../../../hooks/useStock';
import { Bell, AlertTriangle } from 'lucide-react';
import { getInitials, getAvatarColor } from '../../../constants/theme';
import './DashboardHeader.css';

export default function DashboardHeader({ title }) {
  const { user } = useAuthContext();
  const { lowStockItems } = useStock();

  return (
    <header className="dash-header">
      <h1 className="dash-header__title">{title}</h1>
      <div className="dash-header__actions">
        {lowStockItems.length > 0 && (
          <div className="dash-header__alert" title={`${lowStockItems.length} low stock items`}>
            <Bell size={20} />
            <span className="dash-header__badge">{lowStockItems.length}</span>
          </div>
        )}
        <div className="dash-header__user">
          <div className="dash-header__avatar" style={{ background: getAvatarColor(user?.name || 'A') }}>
            {getInitials(user?.name || 'Admin')}
          </div>
          <span className="dash-header__name">{user?.name || 'Admin'}</span>
        </div>
      </div>
    </header>
  );
}