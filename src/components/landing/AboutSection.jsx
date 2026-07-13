import { motion } from 'framer-motion';
import './AboutSection.css';

export default function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="about__container">
        <motion.div
          className="about__text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="about__gold-line" />
          <h2 className="about__title">Our Story</h2>
          <p className="about__paragraph">
            At Pearl Coffee, we believe that exceptional coffee is an art form.
            Since our founding, we have been dedicated to sourcing the finest
            beans from sustainable farms around the world, roasting them to
            perfection, and crafting each cup with meticulous care.
          </p>
          <p className="about__paragraph">
            Our baristas are passionate artisans who understand that the perfect
            cup is a balance of science and soul. From the rich aroma that greets
            you at the door to the last satisfying sip, every detail of the Pearl
            Coffee experience is designed to delight and inspire.
          </p>
        </motion.div>

        <motion.div
          className="about__visual"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="about__gradient-placeholder" />
        </motion.div>
      </div>
    </section>
  );
}
