import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';
import './ContactSection.css';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    lines: ['123 Pearl Street', 'Downtown District'],
  },
  {
    icon: Clock,
    label: 'Hours',
    lines: ['Mon - Fri: 7AM - 9PM', 'Sat - Sun: 8AM - 10PM'],
  },
  {
    icon: Phone,
    label: 'Phone',
    lines: ['(555) 123-4567'],
  },
];

export default function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <motion.div
          className="contact__info"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="contact__gold-line" />
          <h2 className="contact__title">Visit Us</h2>
          <p className="contact__subtitle">
            We would love to welcome you to our space
          </p>

          <div className="contact__details">
            {contactInfo.map((item) => (
              <div className="contact__item" key={item.label}>
                <div className="contact__item-icon">
                  <item.icon size={22} />
                </div>
                <div className="contact__item-text">
                  <span className="contact__item-label">{item.label}</span>
                  {item.lines.map((line, i) => (
                    <span className="contact__item-line" key={i}>
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="contact__visual"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="contact__map-placeholder" />
        </motion.div>
      </div>
    </section>
  );
}
