import { Coffee } from 'lucide-react';
import './Footer.css';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__columns">
          <div className="footer__brand">
            <div className="footer__logo">
              <Coffee size={24} className="footer__logo-icon" />
              <span className="footer__logo-text">Pearl Coffee</span>
            </div>
            <p className="footer__description">
              Crafting exceptional coffee experiences since day one. Every cup is
              a testament to our dedication to quality and artistry.
            </p>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Quick Links</h4>
            <ul className="footer__link-list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__column">
            <h4 className="footer__column-title">Contact Info</h4>
            <ul className="footer__contact-list">
              <li className="footer__contact-item">123 Pearl Street</li>
              <li className="footer__contact-item">Downtown District</li>
              <li className="footer__contact-item">(555) 123-4567</li>
              <li className="footer__contact-item">hello@pearlcoffee.com</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; 2026 Pearl Coffee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
