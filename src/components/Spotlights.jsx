import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../assets/css/spotlight.css";
import AqvaWall from "../assets/image/SpotLight/Aqva-Wall.jpg";
import Kittop from "../assets/image/SpotLight/Kittop.jpg";
import Qbiss from "../assets/image/SpotLight/Qbiss.jpg";
import Tabillo from "../assets/image/SpotLight/Tabillo.jpeg";
// import Tabillo2 from "../assets/image/SpotLight/banner-crown.jpg";

gsap.registerPlugin(ScrollTrigger);

const Spotlights = () => {
  const [images] = useState([
    { src: Tabillo, title: "TABILLO" },
    { src: Qbiss, title: "QBISS" },
    { src: Kittop, title: "KITTOP" },
    { src: AqvaWall, title: "AQVA WALL" },
  ]);

  useEffect(() => {
    const sections = gsap.utils.toArray(".banner-item");
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".banner-container",
        start: "top-=140 top",
        pin: true,
        scrub: 1,
        anticipatePin: 2,
        end: () => "+=" + (document.querySelector(".banner-container").offsetWidth), 
       },
    });
  }, []);
  

  return (
    <div className="spotlight">
      <div className="spotlightheader">
        <div className="container">
          <h2>SPOTLIGHT</h2>
        </div>
      </div>

      <div className="banner-container">
        <div className="scrolling-banner">
          {images.map((item, index) => (
            <div className="banner-item" key={index}>
              <img src={item.src} alt={item.title} />
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spotlights;
