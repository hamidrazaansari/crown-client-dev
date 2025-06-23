import React from 'react'
import NavBar from '../components/NavBar'
import '../assets/css/environmental.css'
import AboutEnv from '../assets/image/AboutEnv.png'
import Commitment1 from '../assets/image/sustainable-energy.png'
import Commitment2 from '../assets/image/global-ecology.png'
import Commitment3 from '../assets/image/environmental.png'
import Commitment4 from '../assets/image/recycle-env.png'
import Commitment5 from '../assets/image/eco-factory.png'
import Commitment6 from '../assets/image/afforestation.png'
import Timer from '../assets/image/timer.png'
import Fectory from '../assets/image/fectory.png'
import Trash from '../assets/image/trash.png'
import Footer from '../components/Footer';
import EnvImg from '../assets/image/envImg.png'
import OtherPageFooter from '../components/OtherPageFooter'
import { Link } from 'react-router-dom'

export default function Env() {
    return (
        <div>
            <NavBar />
            <div className="bgWhite">
                <div className="container">
                    <div className="breadcrumb m-0">
                        <p>
                            <Link to="/">HOME</Link>
                            <span> / </span>
                            <Link to="/environmental" className="ms-2">Environment</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="env-banner bgWhite py-3">
                <div className="container" style={{position:'relative'}}>
                    <img src={EnvImg} alt="" />
                          <div className=" EnvHeader">
                            <div className="container mb-0">
                              <h1>Sustainable Luxury</h1>
                            </div>
                          </div>
                </div>
            </div>
            <div className="SUSTAINABILITY bgWhite">
                <div className="container">
                    <h2>Sustainability Policy</h2>
                    <p>At Crown, sustainability is at the heart of our innovation. We believe in harmonizing luxury with environmental responsibility, ensuring that our manufacturing processes and products contribute to a greener future.</p>
                </div>
            </div>


            <div className='envoirementabout bgWhite'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 d-flex align-items-center justify-content-lg-end justify-content-center">
                            <img src={AboutEnv} alt="about env" />
                        </div>
                        <div className="col-lg-6 d-flex flex-column justify-content-center">
                            <h2>Enviroment</h2>
                            <p>By integrating eco-conscious practices with high-performance HPL laminates and compact panels, we are shaping a sustainable future while delivering premium quality and design excellence to our customers worldwide.</p>
                            {/* <p>This resilient and awe-inspiring home continuously captivates us, which is why at Crownlam, we are dedicated to ethical business practices and a responsible commitment to fostering a sustainable environment.</p> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="strategy bgWhite">
                <div className="container">
                    {/* <h2 className='strategy-heading'>CROWN STRATEGY GROUP </h2> */}
                    {/* <p>At Crown Lam, we envision a world where laminates do more than cover surfaces—they elevate them. We strive to be the go-to choice for architects, designers, and clients worldwide who seek luxury and longevity in every detail. Our commitment is to be a trusted supplier in every sense: delivering excellence in quality, aesthetics, and innovation across all our products.</p> */}
                    <div className="row px-4">
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="commitment-card">
                                <img src={Commitment1} alt="Commitment" />
                                <h3>Renewable Energy</h3>
                                <p>41% of our energy comes from wind and solar power, reducing our carbon footprint. </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="commitment-card">
                                <img src={Commitment6} alt="" />
                                <h3>Water Conservation</h3>
                                <p>We follow a Zero Liquid Discharge (ZLD) system, where 100% of wastewater is treated and reused, minimizing water wastage.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="commitment-card">
                                <img src={Commitment4} alt="" />
                                <h3>Waste Management</h3>
                                <p>Through recycling, reusing, and repurposing, we achieve an 80% landfill diversion rate, significantly reducing production waste.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="commitment-card">
                                <img src={Commitment3} alt="" />
                                <h3>Forestry & Green Initiatives</h3>
                                <p>We expand green cover by 10% annually in industrial zones and have contributed 1 lakh saplings to afforestation initiatives.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="commitment-card">
                                <img src={Commitment5} alt="" />
                                <h3>Product Safety & Compliance
                                </h3>
                                <p>Our laminates are non-hazardous, low-emission, and compliant with global safety standards to ensure a healthier environment.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-6">
                            <div className="commitment-card">
                                <img src={Commitment2} alt="" />
                                <h3>Community Impact</h3>
                                <p>Beyond our products, we invest in health, education, and social well-being programs for local communities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <OtherPageFooter/>
        </div>
    )
}












