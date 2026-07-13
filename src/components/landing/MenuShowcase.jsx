import { motion } from 'framer-motion';
import { menuItems } from '../../constants/menuData';
import MenuCard from './MenuCard';
import './MenuShowcase.css';

export default function MenuShowcase() {
  return (
    <section className="menu-showcase" id="menu">
      <div className="menu-showcase__container">
        <motion.div
          className="menu-showcase__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="menu-showcase__gold-line" />
          <h2 className="menu-showcase__title">Our Menu</h2>
          <p className="menu-showcase__subtitle">
            Handcrafted beverages made with passion and precision
          </p>
        </motion.div>

        <motion.div
          className="menu-showcase__grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {menuItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
