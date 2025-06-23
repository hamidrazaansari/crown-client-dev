import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const OurHeritage = () => {
  const bannerRef = useRef(null);
  const bannerContainerRef = useRef(null);
  const procedureRef = useRef(null);
  const [bannerItemWidth, setBannerItemWidth] = useState(0);

  useEffect(() => {
    if (!bannerRef.current || !bannerContainerRef.current || !procedureRef.current) return;

    const banner = bannerRef.current;
    const container = bannerContainerRef.current;
    const procedure = procedureRef.current;

    // **Get Single Banner Item Width after DOM fully loads**
    setTimeout(() => {
      const bannerItem = banner.querySelector(".banner-item");
      if (bannerItem) {
        setBannerItemWidth(bannerItem.offsetWidth);
      }
    }, 100);

  }, []);

  useEffect(() => {
    if (!bannerRef.current || !bannerContainerRef.current || !procedureRef.current || bannerItemWidth === 0) return;

    const banner = bannerRef.current;
    const container = bannerContainerRef.current;
    const procedure = procedureRef.current;

    const bannerWidth = banner.scrollWidth;
    const containerWidth = container.offsetWidth;
    const scrollDistance = bannerWidth - containerWidth;

    // Horizontal Scrolling Animation
    gsap.to(banner, {
      x: -scrollDistance,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance }`,
        scrub: 1, // Smooth scroll effect
        pin: true,
        anticipatePin: 1, // Prevent flickering
      },
    });

    // **Set `.procedure` width equal to one `.banner-item` width**
    gsap.to(procedure, {
      width: bannerItemWidth, // Set width dynamically
      duration: 0.5,
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [bannerItemWidth]); // **Wait until bannerItemWidth is available**

  return (
    <div className="heritage-section">
      <div className="banner-container container" ref={bannerContainerRef}>
        <div className="scrolling-banner" ref={bannerRef}>
          {[...Array(4)].map((_, index) => (
            <div className="banner-item" key={index}>
              <div className="heritage-info-container">
                <div className="year-highlight">
                  <span className="circle"></span>1995
                </div>
                <h1>Our Heritage</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
                <button className="heritage-btn">
                  1955<span className="circles"></span>Our Heritage
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="procedure" ref={procedureRef}></div>
        <div className="procedure-bg"></div>
      </div>
    </div>
  );
};

export default OurHeritage;
