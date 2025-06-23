import React, { useState } from 'react';
import SpotlightSlide1 from '../assets/image/spotlight-slide1.png';
import SpotlightSlide2 from '../assets/image/spotlight-slide2.png';
import '../assets/css/spotlight.css';
import Slider from 'react-slick';
import ScrollAnimation from 'react-animate-on-scroll';

function ProductSpotlight() {
  const [activeCategory, setActiveCategory] = useState('Qbiss'); // Default active category

  // Define your slides with category information
  const slides = [
    {
      category: 'AQUA WALL',
      imgSrc: SpotlightSlide1,
      alt: 'AQUA WALL Slide'
    },
    {
      category: 'Kittop',
      imgSrc: SpotlightSlide1,
      alt: 'Kittop Slide'
    },
    {
      category: 'tabillo',
      imgSrc: SpotlightSlide2,
      alt: 'tabillo Slide'
    },
    {
      category: 'Qbiss',
      imgSrc: SpotlightSlide1,
      alt: 'Qbiss Slide'
    }
  ];

  // Filter slides based on the active category
  const filteredSlides = slides.filter(slide => slide.category === activeCategory);

  const Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className='spotlight'>
      <div className="container">
      <ScrollAnimation animateIn="fadeInUp">
        <h2>PRODUCT IN THE SPOTLIGHT</h2>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp">
        <p className='para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
        </ScrollAnimation>
        <div className="category">
        <ScrollAnimation animateIn="fadeInUp">
        <button 
            className={activeCategory === 'Qbiss' ? 'active' : ''}
            onClick={() => setActiveCategory('Qbiss')}
          >
            Qbiss
          </button>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp">
          <button 
            className={activeCategory === 'AQUA WALL' ? 'active' : ''}
            onClick={() => setActiveCategory('AQUA WALL')}
          >
            AQUA WALL
          </button>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp">
          <button 
            className={activeCategory === 'Kittop' ? 'active' : ''}
            onClick={() => setActiveCategory('Kittop')}
          >
            Kittop
          </button>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp">
          <button 
            className={activeCategory === 'tabillo' ? 'active' : ''}
            onClick={() => setActiveCategory('tabillo')}
          >
            tabillo
          </button>
          </ScrollAnimation>

        </div>
        <ScrollAnimation animateIn="fadeInUp">
        <Slider {...Settings}>
          {filteredSlides.map((slide, index) => (
            <div className="mainSp" key={index}>
              <img src={slide.imgSrc} alt={slide.alt} />
            </div>
          ))}
        </Slider>
        </ScrollAnimation>
      </div>
    </div>
  );
}

export default ProductSpotlight;
