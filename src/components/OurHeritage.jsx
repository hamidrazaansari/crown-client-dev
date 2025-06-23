import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OurHeritage = () => {
  const sliderRef = useRef(null);
  const totalSlides = 3; // Update based on actual slides
  const [progress, setProgress] = useState(Array(totalSlides).fill(0));
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false, // Hide default dots
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    beforeChange: (_, newIndex) => {
      setCurrentSlide(newIndex);
      resetProgress(newIndex);
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const updatedProgress = [...prevProgress];

        if (updatedProgress[currentSlide] >= 100) {
          clearInterval(interval); // Stop interval once progress completes
          if (sliderRef.current && currentSlide < totalSlides - 1) {
            sliderRef.current.slickNext();
          }
          return updatedProgress;
        }

        updatedProgress[currentSlide] += 1; // Increment progress
        return updatedProgress;
      });
    }, 50); // Adjust timing for smooth progress

    return () => clearInterval(interval);
  }, [currentSlide]);

  const resetProgress = (newIndex) => {
    setProgress((prev) => {
      const resetProgress = prev.map((_, index) => (index === newIndex ? 0 : 100));
      return resetProgress;
    });
  };

  return (
    <div className="heritage-section">
      <div className="container">
        <Slider ref={sliderRef} {...settings}>
          <div className="banner-item">
            <div className="heritage-info-container">
              <div className="year-highlight">
              </div>
              <h1>45+ Years of Excellence in HPL Manufacturing</h1>
              <p>With over 45 years of expertise, Crown has been at the forefront of HPL laminate and compact panel manufacturing, delivering innovation, durability, and design versatility.</p>
            </div>
          </div>

          <div className="banner-item">
            <div className="heritage-info-container">
              <div className="year-highlight">
              </div>
              <h1>10+ Production Lines with State-of-the-Art Manufacturing</h1>
              <p>Crown operates 10+ advanced production lines, ensuring high-capacity manufacturing of premium HPL laminates and compact panels. Our cutting-edge technology and precision engineering guarantee exceptional quality, durability, and design excellence for global markets.
              </p>
            </div>
          </div>

          <div className="banner-item">
            <div className="heritage-info-container">
              <div className="year-highlight">
                {/* <span className="circle"></span> */}
              </div>
              <h1>30+ Million Sq. Mt. Annual Production</h1>
              <p>
              Crown delivers 30+ million square meters of top-grade HPL laminates and compact panels annually. Our high-capacity manufacturing ensures us a preferred choice for global needs.
              </p>
            </div>
          </div>
        </Slider>

        {/* Progress Bars for Each Slide */}
        <div className="progress-bar-container">
          {progress.map((prog, index) => (
            <div key={index} className="progress-bar-wrapper">
              <div
                className="progress-bar"
                style={{
                  width: `${prog}%`,
                  backgroundColor: index === currentSlide ? "#FF6600" : "#ccc",
                  transition: "width 0.1s ease-in-out",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurHeritage;
