import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import AboutSection from '../components/landing/AboutSection';
import MenuShowcase from '../components/landing/MenuShowcase';
import GallerySection from '../components/landing/GallerySection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />
      <MenuShowcase />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
}