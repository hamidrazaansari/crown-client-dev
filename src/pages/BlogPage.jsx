import React from 'react'
import NavBar from '../components/NavBar'
import OtherPageFooter from '../components/OtherPageFooter'
import BlogBanner from '../assets/image/blog-banner.png'
import Blog1 from '../assets/image/blog1.png'
import Blog2 from '../assets/image/sustainable.jpg'
import Blog3 from '../assets/image/luxury.jpg'
import Blog4 from '../assets/image/blog3.png'
import '../assets/css/blog.css'
import { MdOutlineArrowOutward } from "react-icons/md";

import { Link } from 'react-router-dom'

function BlogPage() {
    return (
        <div className='blogpage'>
            <NavBar />
            <div className="blog-details">
                <div className="container px-5">
                    <div className="breadcrumb">
                        <p><Link to="/">HOME</Link><span> / </span> <Link to="/blog" className='ms-2'>Blog</Link> </p>
                    </div>
                </div>
                <div className="container">
                    <div className="blog-banner">
                        <img src={BlogBanner} alt="BLog Banner" />
                        <div className='banner-text-container'>
                            <h2>Blog</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 col-12">
                        <Link to={'/beyond-wood-and-stone'}>
                            <div className="blog-box mx-3">
                                <img src={Blog3} alt="blog1" />
                                <div className="d-flex justify-content-between">
                                    <h2>Beyond Wood & Stone: Why Luxury Homes are Choosing High-End Laminates</h2>
                                   <button><MdOutlineArrowOutward /> </button>
                                </div>
                                <p>In the world of luxury home design, natural materials like wood and stone have long been the gold standard. However, wise homeowners and designers are increasingly turning to high-end laminates as a lighter, eco friendly, yet elegant and durable alternative... </p>
                            </div>
                        </Link>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                            <Link to={'/sustainabl-details'}>
                            <div className="blog-box mx-3">
                                <img src={Blog2} alt="blog1" />
                                <div className="d-flex justify-content-between">
                                    <h2>Sustainable Luxury: Eco-Friendly Laminates for Modern Homes</h2>
                                    <button><MdOutlineArrowOutward /> </button>
                                </div>
                                <p>Sustainability does not have to come at the cost of aesthetics or utility.Today’s homeowners and designers demand materials that are environmentally sustainable and safe, without compromising on the style quotient of their interiors. Crown high pressure laminates (HPL) provide an ideal solution, with their combination of premium looks, durability and eco-friendly properties... </p>
                            </div>
                            </Link>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                        <Link to={'/the-rise-of-thin-laminates'}>
                            <div className="blog-box mx-3">
                                <img src={Blog1} alt="blog1" />
                                <div className="d-flex justify-content-between">
                                    <h2>The Rise of Thin Laminates: Light Weight Luxury</h2>
                                    <button><MdOutlineArrowOutward /> </button>
                                </div>
                                <p>In the ever-evolving world of interior design, the demand for visually appealing yet functional material is at an all-time high. Homeowners, designers, and architects are seeking solutions that look great without compromising on practicality...</p>
                            </div>
                        </Link>
                        </div>
                        <div className="col-lg-4 col-sm-6 col-12">
                        <Link to={'/quality-certification-in-luxury-laminates'}>
                            <div className="blog-box mx-3">
                                <img src={Blog4} alt="blog1" />
                                <div className="d-flex justify-content-between">
                                    <h2>Quality Certification in Luxury Laminates: Standards of Excellence & Compliance</h2>
                                    <button><MdOutlineArrowOutward /> </button>
                                </div>
                                <p>For premium decorative surfaces, quality is the ultimate criteria. An ideal laminate should be one that combines visual appeal with functional utility, consumer safety and environmental sustainability...</p>
                            </div>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>

            <OtherPageFooter />
        </div>
    )
}

export default BlogPage