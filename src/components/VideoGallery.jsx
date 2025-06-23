import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/css/video-gallery.css";
import GalleryVideo1 from '../assets/image/video1.mp4';


gsap.registerPlugin(ScrollTrigger);

const VideoGallery = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    gsap.timeline({
      scrollTrigger: {
        trigger: videoElement, // Target the video
        start: "top center", // Start animation when video is at the center of the viewport
        end: "bottom center", // End after scrolling an additional 500px
        scrub: 3, // Smooth scrolling animation
        markers: false, // Set true for debugging
      },
    })
      .to(videoElement, {
        scale: 1.5, // Zoom out effect
        duration: 2, // Adjust duration of zoom
        ease: "power1.inOut",
      })
      .to(videoElement, {
        y: window.innerHeight, // Move the video vertically down
        duration: 2,
        ease: "power1.inOut",
      });
  }, []);

  return (
    <div className="gallery">
      <h2>Gallery</h2>
      <div className="video-container">
        <video
          ref={videoRef}
          src={GalleryVideo1}
          controls
          loop
          muted
          className="gallery-video"
        ></video>
      </div>
    </div>
  );
};

export default VideoGallery;
