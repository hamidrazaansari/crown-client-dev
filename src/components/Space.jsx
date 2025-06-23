import React from 'react'
import '../assets/css/about.css'
import SpaceImg from  '../assets/image/space.png'
import ScrollAnimation from 'react-animate-on-scroll';

function Space() {
  return (
    <div className='about'>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 d-flex align-items-center justify-content-lg-end justify-content-start">
                    <div className="about-content">
                    <ScrollAnimation animateIn="fadeInUp">
                        <h3>UPGRADE YOUR SPACE</h3>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeInUp">
                        <h2 className='space-heading'>LIVE THE better LIFE</h2>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeInUp">
                        <div className="line"></div>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeInUp">
                        <p>Revitalize your room with the modern appeal and practicality of laminate sheets. Perfect for walls, floors, and furniture, laminate sheets offer a sleek and durable finish that can elevate any space. Revitalize your room with the modern appeal and practicality of laminate sheets. Perfect for walls, floors, and furniture, laminate sheets offer a sleek and durable finish that can elevate any space.Revitalize your room with the modern appeal and practicality of laminate sheets. Perfect for walls, floors, and furniture, laminate sheets offer a sleek and durable finish that can elevate any space.</p>
                        </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeInUp">
                        <button>Read More</button>
                        </ScrollAnimation>
                    </div>
                </div>
                <div className="col-lg-6 d-flex">
                    <ScrollAnimation animateIn="fadeInUp">
                    <div className="Space-box">
                        <img src={SpaceImg} alt="Space image" />
                    </div>
                    </ScrollAnimation>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Space