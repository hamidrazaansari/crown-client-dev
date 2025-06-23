import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import '../assets/css/vertical.css'

gsap.registerPlugin(ScrollTrigger);

function VerticalScroll() {
  const scrollContainerRef = useRef(null); // Ref for the scroll container

  useGSAP(
    () => {
      let panels = gsap.utils.toArray(".panel");
      let tlMain = gsap.timeline({
        defaults: {
          duration: 1,
          ease: "none",
        },
        scrollTrigger: {
          trigger: scrollContainerRef.current, // Pin the scroll container
          pin: true, // Pin the scroll section in place
          scrub: true, // Smooth animation based on scroll progress
          start: "top top", // Start when the section reaches the top of the viewport
          end: () => "+=" + window.innerHeight, // Scroll for one full viewport height
          markers: false, // Disable scroll markers for debugging
        },
      });

      // Define the clipPath animation
      tlMain.fromTo(
        ".panel.is-2",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", // Initially, clip is hidden (top to bottom)
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Clip expands to cover the whole area (top to bottom) during scroll
        },
        0
      );
    },
    {
      scope: scrollContainerRef,
    }
  );

  return (
    <div className="scroll-container" ref={scrollContainerRef}>
      <div className="panel">
        <div className="content">
          <div className="textBlock">
            <p>CROWN</p>
          </div>
        </div>
      </div>
      <div className="panel is-2">
        <div className="content">
          <div className="textBlock">
            <p>CROWN</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerticalScroll;
