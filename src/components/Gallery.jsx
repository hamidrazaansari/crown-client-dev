import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import '../assets/css/gallery.css';
import GalleryVideo1 from '../assets/image/video1.mp4';
import GalleryVideo2 from '../assets/image/video2.mp4';
import GalleryVideo3 from '../assets/image/video3.mp4';
import PlayIcon from '../assets/image/play-icon.png';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import ScrollAnimation from 'react-animate-on-scroll';
// Custom Prev Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-prev-btn" onClick={onClick}>
      <FaArrowLeftLong />
    </button>
  );
};

// Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-next-arrow" onClick={onClick}>
      <FaArrowRightLong />
    </button>
  );
};

function Gallery() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  // State to manage play icon visibility for each video
  const [showPlayIcon1, setShowPlayIcon1] = useState(true);
  const [showPlayIcon2, setShowPlayIcon2] = useState(true);
  const [showPlayIcon3, setShowPlayIcon3] = useState(true);

  // Function to handle play/pause for each video
  const handlePlayPause = (videoRef, setShowPlayIcon) => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setShowPlayIcon(false);
    } else {
      videoRef.current.pause();
      setShowPlayIcon(true);
    }
  };

  // Function to handle autoplay for specific videos based on active slide
  const handleSlideChange = (currentSlide) => {
    // Pause all videos
    if (videoRef1.current) videoRef1.current.pause();
    if (videoRef2.current) videoRef2.current.pause();
    if (videoRef3.current) videoRef3.current.pause();

    // Autoplay specific videos based on current slide
    if (currentSlide === 1 && videoRef2.current) {
      videoRef2.current.play();
      setShowPlayIcon2(false); // Hide play icon when autoplay starts
    } else if (currentSlide === 2 && videoRef3.current) {
      videoRef3.current.play();
      setShowPlayIcon3(false); // Hide play icon when autoplay starts
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    afterChange: handleSlideChange, // Track the active slide
  };

  return (
    <div className="Gallery">
      <div className="container">
      <ScrollAnimation animateIn="fadeInUp">
        <h2 className="gallery-heading">INSPIRATION GALLERY</h2>
      </ScrollAnimation>
        <div className="row mt-5">
          <div className="col-12">
          <ScrollAnimation animateIn="fadeInUp">
            <Slider {...settings}>
              {/* First Video */}
              <div className="video-box d-flex align-items-center justify-content-center">
                <div className="video-wrapper">
                  <video
                    className="custom-video"
                    ref={videoRef1}
                    controls
                    onPlay={() => setShowPlayIcon1(false)}
                    onPause={() => setShowPlayIcon1(true)}
                  >
                    <source src={GalleryVideo1} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {showPlayIcon1 && (
                    <img
                      src={PlayIcon}
                      alt="play icon"
                      className="playIcon"
                      onClick={() => handlePlayPause(videoRef1, setShowPlayIcon1)} // Handle play icon click
                    />
                  )}
                </div>
              </div>

              {/* Second Video */}
              <div className="video-box d-flex align-items-center justify-content-center">
                <div className="video-wrapper">
                  <video
                    className="custom-video"
                    ref={videoRef2}
                    controls
                    onPlay={() => setShowPlayIcon2(false)}
                    onPause={() => setShowPlayIcon2(true)}
                  >
                    <source src={GalleryVideo2} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {showPlayIcon2 && (
                    <img
                      src={PlayIcon}
                      alt="play icon"
                      className="playIcon"
                      onClick={() => handlePlayPause(videoRef2, setShowPlayIcon2)} // Handle play icon click
                    />
                  )}
                </div>
              </div>

              {/* Third Video */}
              <div className="video-box d-flex align-items-center justify-content-center">
                <div className="video-wrapper">
                  <video
                    className="custom-video"
                    ref={videoRef3}
                    controls
                    onPlay={() => setShowPlayIcon3(false)}
                    onPause={() => setShowPlayIcon3(true)}
                  >
                    <source src={GalleryVideo3} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {showPlayIcon3 && (
                    <img
                      src={PlayIcon}
                      alt="play icon"
                      className="playIcon"
                      onClick={() => handlePlayPause(videoRef3, setShowPlayIcon3)} // Handle play icon click
                    />
                  )}
                </div>
              </div>
            </Slider>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
