import { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SareeCollection from './components/SareeCollection';
import FabricCollection from './components/FabricCollection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

function App() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    });

    // Mobile menu toggle
    mobileMenuToggle?.addEventListener('click', () => {
      navLinks?.classList.toggle('active');
      const icon = mobileMenuToggle.querySelector('i');
      if (navLinks?.classList.contains('active')) {
        icon?.classList.replace('fa-bars', 'fa-times');
      } else {
        icon?.classList.replace('fa-times', 'fa-bars');
      }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
        mobileMenuToggle?.querySelector('i')?.classList.replace('fa-times', 'fa-bars');
      });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        const target = href ? document.querySelector(href) : null;
        if (target) {
          const offsetTop = (target as HTMLElement).offsetTop - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // Intersection Observer for section animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });

    // Initialize Swipers
    new Swiper('.saree-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 24 },
        1024: { slidesPerView: 4, spaceBetween: 32 },
      }
    });

    new Swiper('.fabric-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 24 },
        1024: { slidesPerView: 4, spaceBetween: 32 },
      }
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this as HTMLFormElement);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const message = formData.get('message');
      const whatsappMessage = `Hello! I'm ${name}.\n\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`;
      const whatsappUrl = `https://wa.me/919798141494?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      (this as HTMLFormElement).reset();
      alert('Thank you for your message! You will be redirected to WhatsApp.');
    });

    // ✅ Optimized Parallax effect
    const hero = document.querySelector('.hero') as HTMLElement;
    let ticking = false;

    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(handleParallax);
        ticking = true;
      }
    });

    // Add loading animation
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });

    // ✅ Lazy load (skip hero images)
    const lazyImages = document.querySelectorAll('img[data-src]:not(.hero-bg-img)');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(img => imageObserver.observe(img));

    // Scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-gold));
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    });

  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <SareeCollection />
      <FabricCollection />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

export default App;
