import React, { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { heroImages } from "../data/RoomsImages";
import "../styles/main.css";

export default function Hero() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero">
      {/* Image Carousel Background */}
      <div className="hero-carousel">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="hero-slide"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              backgroundImage: `url(${image.url})`,
              backgroundPosition: image.url.includes('room-nana-51.jpg') ? 'center top' : 'center'
            }}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="hero-overlay">
        {/* Navigation arrows */}
        <button 
          className="hero-nav-button hero-prev-button"
          onClick={prevSlide}
          aria-label="Previous image"
        >
          ‹
        </button>
        <button 
          className="hero-nav-button hero-next-button"
          onClick={nextSlide}
          aria-label="Next image"
        >
          ›
        </button>

        {/* Content */}
        <div className="hero-content">
          <div className="hero-text-content">
            <h1 className="hero-title">
              {t.hero.slides[currentSlide]?.title || heroImages[currentSlide].title}
            </h1>
            <p className="hero-subtitle">
              {t.hero.slides[currentSlide]?.subtitle || heroImages[currentSlide].subtitle}
            </p>
            <p className="hero-description">
              {t.hero.description}
            </p>
          </div>
          

        </div>

        {/* Carousel indicators */}
        <div className="hero-indicators">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`hero-indicator ${index === currentSlide ? 'hero-active-indicator' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
