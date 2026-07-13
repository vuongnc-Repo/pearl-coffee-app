import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../../constants/testimonials';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <motion.div
          className="testimonials__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="testimonials__gold-line" />
          <h2 className="testimonials__title">What Our Guests Say</h2>
        </motion.div>

        <motion.div
          className="testimonials__grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <span className="testimonial-card__quote-mark">&ldquo;</span>
              <p className="testimonial-card__text">{testimonial.text}</p>
              <div className="testimonial-card__stars">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="var(--color-gold-primary)"
                    color="var(--color-gold-primary)"
                  />
                ))}
              </div>
              <div className="testimonial-card__author">
                <span className="testimonial-card__name">
                  {testimonial.name}
                </span>
                <span className="testimonial-card__role">
                  {testimonial.role}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
