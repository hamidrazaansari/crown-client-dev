import React from 'react'
import NavBar from '../components/NavBar'
import OtherPageFooter from '../components/OtherPageFooter'
import '../assets/css/blog.css'
import BlogDetailsBanner from '../assets/image/blog-details-banner.png'
import User from '../assets/image/admin.png'
import Calendar from '../assets/image/calender.png'
import BlogImage from '../assets/image/blogimage.png'
import RecentBlog from '../assets/image/recent-blog.png'
import Quality from '../assets/image/quality.jpg'
import Sustainabilty from '../assets/image/sustainabilty.jpg'
import TheRise from '../assets/image/therise.jpg'
import Beyond from '../assets/image/beyond.jpg'
import { Link } from 'react-router-dom'

function SustainableDetails() {
    return (
        <div className='blogpage'>
            <NavBar />
            <div className="blog-details">
                <div className="container px-5">
                    <div className="breadcrumb">
                        <p><Link to="/">HOME</Link><span> / </span> <Link to="/blog" className='ms-2'>BLog</Link><span> / </span> <Link to="/sustainabl-details" className='ms-2'>Sustainable Luxury</Link> </p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog-details-banner">
                                <img src={BlogDetailsBanner} alt="Blog details Banner" />
                            </div>
                            <div className="blog-details-content">
                                <div className="d-flex information align-items-center">
                                    <p className="d-flex align-items-center justify-content-center"><img src={User} alt="user image" /> Admin</p>
                                    <div className="dot"></div>
                                    <p className="d-flex align-items-center justify-content-center"><img src={Calendar} alt="user image" />March 10, 2025</p>
                                </div>
                                <h1>Sustainable Luxury: Eco-Friendly Laminates for Modern Homes</h1>
                                <p>Sustainability does not have to come at the cost of aesthetics or utility.Today’s homeowners and designers demand materials that are environmentally sustainable and safe, without compromising on the style quotient of their interiors. Crown high pressure laminates (HPL) provide an ideal solution, with their combination of premium looks, durability and eco-friendly properties. </p>
                                <p>Crown’s visually stunning portfolio of decors are inspired by the five natural elements - earth, water, air, fire and aether. They reproduce the classic, timeless elegance of natural materials like stone and wood, elevating your interior spaces into sophisticated style statements. At the same time, conscious buyers can rest assured that the highest standards of environmental sustainability have been maintained during the entire production cycle of Crown laminates.</p>
                                <img src={BlogImage} alt="blog image" className='mb-3'/>
                                <h2>Sustainable Process = Sustainable End Products
                                </h2>
                                <p>Crown laminates are  manufactured under advanced, eco-friendly production processes, using over 40% wind/solar energy, therefore cutting down on use of fossil fuels. The entire quantity of waste water discharged during the production process is recycled and reused. Minimum 80% of our solid waste is recycled, reused or repurposed, thus reducing environmental impact to a bare minimum. As a responsible corporate citizen, Crown undertakes extensive afforestation around its manufacturing units.</p>
                                <h3>Responsible Sourcing and Manufacturing</h3>
                                <p>Crown is strongly committed to responsible sourcing of raw materials and meticulously implements a manufacturing process with minimum emission or waste generation.  </p>
                                <ul>
                                    <li>Crown’s FSC (Forest Stewardship Council) certification is a globally recognized validation of its responsible sourcing practices. All our wood based raw materials are sourced from sustainably managed forests, where there is no illegal logging and the conservation of natural habitats and bio diversity are prioritized.
                                    </li>
                                    <li>Crown products are compliant with VOC (volatile organic compound) emission standards of the European Union, assuring you that our laminates will not cause any harmful emissions.   </li>
                                    <li>Crown products carry ISO 14001:2015, Greenguard, Green Label, Green Leaf, EPD, and IGBC certifications, underlining our commitment to maintaining the highest standards of environmental management and sustainable manufacturing. </li>
                                </ul>
                                <h2>Conclusion: A Greener Future in Interior Design
                                </h2>
                                <p>Sustainable living integrates interior design choices with protecting the environment. Conscious  homeowners look to enjoy luxury through responsible, eco-friendly options. Crown laminates provide that ideal link between comfort, style and sustainability.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="recent-blog">
                                <h2>Recent Posts</h2>
                                <div className="rcent-blog-box d-flex">
                                    <img src={TheRise} alt="blog image" />
                                    <div>
                                        <p>May 1, 2025</p>
                                        <Link to={'/the-rise-of-thin-laminates'}>
                                        <h3>The Rise of Thin Laminates: Light Weight Luxury</h3>
                                        </Link>
                                    </div>
                                </div>
                                <div className="rcent-blog-box d-flex">
                                    <img src={Quality} alt="blog image" />
                                    <div>
                                        <p>April 20, 2025</p>
                                        <Link to={'/quality-certification-in-luxury-laminates'}>
                                        <h3>Quality Certification in Luxury Laminates: Standards of Excellence & Compliance</h3>
                                        </Link>
                                    </div>
                                </div>
                                <div className="rcent-blog-box d-flex">
                                    <img src={Beyond} alt="blog image" />
                                    <div>
                                        <p>March 15, 2025</p>
                                        <Link to={'/beyond-wood-and-stone'}>
                                        <h3>Beyond Wood & Stone: Why Luxury Homes are Choosing High-End Laminates</h3>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

            <OtherPageFooter />
        </div>
    )
}

export default SustainableDetails