import { motion } from 'framer-motion';
import './GallerySection.css';

const galleryGradients = [
  'linear-gradient(135deg, #1a0e00 0%, #3e2723 50%, #5d4037 100%)',
  'linear-gradient(135deg, #2c1810 0%, #6d4c41 50%, #c9a96e 100%)',
  'linear-gradient(135deg, #0d0d0d 0%, #4e342e 50%, #795548 100%)',
  'linear-gradient(135deg, #3e2723 0%, #8d6e63 50%, #d7ccc8 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #5d4037 50%, #a1887f 100%)',
  'linear-gradient(135deg, #2d1b00 0%, #4e342e 50%, #bcaaa4 100%)',
];

const spanClasses = [
  'gallery__item--tall',
  '',
  '',
  '',
  'gallery__item--tall',
  '',
];

export default function GallerySection() {
  return (
    <section className="gallery" id="gallery">
      <div className="gallery__container">
        <motion.div
          className="gallery__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="gallery__gold-line" />
          <h2 className="gallery__title">Our Space</h2>
        </motion.div>

        <motion.div
          className="gallery__grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {galleryGradients.map((gradient, index) => (
            <div
              key={index}
              className={`gallery__item ${spanClasses[index]}`}
              style={{ background: gradient }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
