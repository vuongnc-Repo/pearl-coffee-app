import { Coffee } from 'lucide-react';
import './MenuCard.css';

export default function MenuCard({ item }) {
  return (
    <div className="menu-card">
      <div
        className="menu-card__gradient"
        style={{ background: item.gradient }}
      >
        <Coffee size={64} className="menu-card__icon" />
      </div>
      <div className="menu-card__info">
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__description">{item.description}</p>
        <span className="menu-card__price">
          ${item.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
