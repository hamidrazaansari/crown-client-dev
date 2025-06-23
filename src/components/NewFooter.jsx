import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import "../assets/css/footer.css";
import { Link } from "react-router-dom";
import logo from '../assets/image/logo.png'
import Footer from "./Footer";


function NewFooter() {
  return (
    <div>
      {/* Section that triggers the effect */}
      <Footer/>
      {/* Footer Section */}
      {/* <div className="newFooter" style={{ backgroundColor: "#000" }}>
        <div className="container" >
          <div className="d-flex align-items-center justify-content-center mt-5">
            <Link to={'/about'}>
              <h2>About</h2>
            </Link>
            <Link to={'/contact'}>
              <h2>Contacts</h2>
            </Link>
            <Link>
              <h2>Privacy Policy</h2>
            </Link>
            <Link to={'/blog'}>
              <h2>Blog</h2>
            </Link>
          </div>
          <p>
            <a href="mailto:crownlaminates@gmail.com" style={{ color: "#fff" }}>
              crownlaminates@gmail.com
            </a>
          </p>
          <p>
            <a href="tel:+918564758228" style={{ color: "#fff" }}>
              +(91) 8564758228
            </a>
          </p>
        </div>
        <div className="line" style={{ backgroundColor: "#fff" }}></div>
        <div className="container">
          <div className="d-flex align-items-center justify-content-center">
            <Link  to='https://www.facebook.com/royalcrownlaminates' target='_blank'>
              <h2>Facebook</h2>
            </Link>
            <Link to={'https://www.instagram.com/royalcrownlaminates'} target="_blank">
              <h2>Instagram</h2>
            </Link>
            <Link>
              <h2>Linkedin</h2>
            </Link>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default NewFooter;
