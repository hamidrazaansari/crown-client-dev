import React from 'react'
import NavBar from '../components/NavBar'
import AboutUs from '../assets/image/about-us.png'
import Range from '../assets/image/range.png'
import Misson from '../assets/image/misson.png'
import Ditribution from '../assets/image/moving-truck.png'
import Quality from '../assets/image/quality.png'
import Ruler from '../assets/image/ruler.png'
import World from '../assets/image/worldwide.png'
import Plants from '../assets/image/planet-earth.png'
import Globle from '../assets/image/global.png'
import Footer from '../components/Footer'
import DetailsForm from '../components/DetailsForm'
import { Link } from 'react-router-dom'

function About() {
    return (
        <div>
            <NavBar />
            <div className="container mt-5">
                <div className="breadcrumb">
                    <p><Link to="/">HOME</Link><span> / </span> <Link to="/" className='ms-2'>About Us</Link> </p>
                </div>
            </div>
            <div className="About-us">
                <div className="container">
                    <div className="row my-3">
                        <div className="col-lg-6 d-flex align-items-center justify-content-center">
                            <div className="image-box">
                                <img src={AboutUs} alt="about us" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="content-box">
                                <h2>About Company</h2>
                                <div className="line"></div>
                                <p>Crown Decor, a Royale Touche Laminate group company, is a niche Luxury Laminate brand from India and was launched in 1978 with the idea that a laminate has unlimited potential in surface décor. They made people look at laminates as a resilient and flexible product. They gave laminates a complete makeover with unparalled endless designs and textures. The product has a rich luxurious feel that adds aesthetic value to interiors that makes architect, end users and interior designer's life easy with over 45 years of experience in the manufacturing industry. </p>
                                <p>The group has seven production lines of high pressure laminates producing over 18 million sq mtr annually in 4 different sizes and in thickness ranging from 0.6 mm to 25 mm which are made of 100% phenolic resin. </p>
                                <p>The laminates are manufactured at a qualifyed facility equipped with imported machinery from Spain, Italy and Germany.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row my-3 mt-5">
                        <div className="col-lg-6">
                            <div className="content-box ms-3 ps-5">
                                <h2>Mission and Vision</h2>
                                <p>Crown Decor, a Royale Touche Laminate group company, is a niche Luxury Laminate brand from India and was launched in 1978 with the idea that a laminate has unlimited potential in surface décor. They made people look at laminates as a resilient and flexible product. They gave laminates a complete makeover with unparalled endless designs and textures. The product has a rich luxurious feel that adds aesthetic value to interiors that makes architect, end users and interior designer's life easy with over 45 years of experience in the manufacturing industry. </p>
                                <p>The group has seven production lines of high pressure laminates producing over 18 million sq mtr annually in 4 different sizes and in thickness ranging from 0.6 mm to 25 mm which are made of 100% phenolic resin. </p>
                                <p>The laminates are manufactured at a qualifyed facility equipped with imported machinery from Spain, Italy and Germany.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="image-box">
                                <img src={Misson} alt="misson" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="why">
                    <div className="container">
                        <h2>why crown laminates</h2>
                        <div className="row">
                            <div className="col-lg-4 d-flex align-items-center justify-content-end">
                                <div className="points-box">
                                    <span>01</span>
                                    <div className="image-box">
                                        <img src={Range} alt="range" />
                                    </div>
                                    <h3>Range</h3>
                                    <div className="line"></div>
                                    <p>2000 SKUs</p>
                                    <p>1000 Textures</p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex align-items-center justify-content-center">
                                <div className="points-box">
                                    <span>02</span>
                                    <div className="image-box">
                                        <img src={Ditribution} alt="" />
                                    </div>
                                    <h3>Distribution</h3>
                                    <div className="line"></div>
                                    <p>1500+ dealerships pan
                                        india and abroad</p>
                                    <p>1500+Product showrooms</p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex align-items-center justify-content-start">
                                <div className="points-box">
                                    <span>03</span>
                                    <div className="image-box">
                                        <img src={Quality} alt="" />
                                    </div>
                                    <h3>Quality</h3>
                                    <div className="line"></div>
                                    <p>1500+ dealerships pan
                                        india and abroad</p>
                                    <p>1500+Product showrooms</p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex align-items-center justify-content-end">
                                <div className="points-box">
                                    <span>04</span>
                                    <div className="image-box">
                                        <img src={Ruler} alt="" />
                                    </div>
                                    <h3>Sizes</h3>
                                    <div className="line"></div>
                                    <p>Wide range of dimensions
                                        avilable</p>
                                    <p>1000 Textures</p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex align-items-center justify-content-center">
                                <div className="points-box">
                                    <span>05</span>
                                    <div className="image-box">
                                        <img src={World} alt="" />
                                    </div>
                                    <h3>Presence</h3>
                                    <div className="line"></div>
                                    <p>Available in 60+ countries</p>
                                    <p>Global Warehousing</p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-flex align-items-center justify-content-start">
                                <div className="points-box">
                                    <span>06</span>
                                    <div className="image-box">
                                        <img src={Plants} alt="" />
                                    </div>
                                    <h3>Sustainable</h3>
                                    <div className="line"></div>
                                    <p>Wind and solar power usage
                                        to reduce our carbon footprint</p>
                                    <p>Member of FSC, Greenguard, etc.</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
                <div className="globle">
                    <div className="container">
                        <h2>Global presence</h2>
                        <div className="img-container">
                            <img src={Globle} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <DetailsForm />
            <Footer />
        </div>
    )
}

export default About