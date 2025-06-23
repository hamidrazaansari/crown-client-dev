import React, { useEffect, useRef, useState } from "react";
import Blog1 from "../assets/image/blog1.png";
import Blog2 from "../assets/image/sustainable.jpg";
import Blog3 from "../assets/image/luxury.jpg";
import "../assets/css/blog.css";
import { Link } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";

import logo from "../assets/image/logo.png";

function Blog() {
  const blogRef = useRef(null);
  const posRef = useRef(null);
  const [isPosVisible, setIsPosVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPosVisible(entry.isIntersecting); // True when `.pos` enters view
      },
      { threshold: 0.5 } // Trigger when 50% of `.pos` is visible
    );

    if (posRef.current) {
      observer.observe(posRef.current);
    }

    return () => {
      if (posRef.current) {
        observer.unobserve(posRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={blogRef}
        className="blog"
        style={{
          position: isPosVisible ? "sticky" : "unset",
          top: isPosVisible ? "-400px" : "auto",
        }}
      >
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h3>WORLD OF CROWN LAMINATES</h3>
            <Link className="blog-btn" to={"/blog"}>
              View All <MdOutlineArrowOutward className="ms-1" />
            </Link>
          </div>
          <p className="heading-text">
            Explore our latest insights and expert articles on high-pressure laminates (HPL).
          </p>
          <div className="d-flex flex-wrap row">
            <div className="col-md-4 col-6">
            <Link to={"/the-rise-of-thin-laminates"}>
              <div className="blog-box mx-3">
                <img src={Blog1} alt="blog1" />
                <div className="d-flex justify-content-between">
                  <h2>The Rise of Thin Laminates: Light Weight Luxury</h2>
                  
                    <button>
                      <MdOutlineArrowOutward />
                    </button>
                  
                </div>
                <p>In the ever-evolving world of interior design...</p>
              </div>
              </Link>
            </div>
            <div className="col-md-4 col-6">
            <Link to={"/sustainabl-details"}>
              <div className="blog-box mx-3">
                <img src={Blog2} alt="blog1" />
                <div className="d-flex justify-content-between">
                  <h2>Sustainable Luxury: Eco-Friendly Laminates for Modern Homes</h2>
                  
                    <button>
                      <MdOutlineArrowOutward />
                    </button>
                </div>
                <p>Sustainability does not have to come at the cost of aesthetics...</p>
              </div>
              </Link>

            </div>
            <div className="col-md-4 col-6 d-md-block d-none">
            <Link to={"/beyond-wood-and-stone"}>

              <div className="blog-box mx-3">
                <img src={Blog3} alt="blog1" />
                <div className="d-flex justify-content-between">
                  <h2>Beyond Wood & Stone: Why Luxury Homes are Choosing High-End Laminates</h2>
                    <button>
                      <MdOutlineArrowOutward />
                    </button>
                </div>
                <p>In the world of luxury home design...</p>
              </div>
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* POS Section - When this enters view, .blog position is unset */}
      <div ref={posRef} className="pos mt-5">
        <div className="crown d-flex align-items-center justify-content-center">
          <img src={logo} alt="logo" className="img-fluid w-50" />
        </div>
      </div>
    </>
  );
}

export default Blog;
