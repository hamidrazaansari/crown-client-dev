import React, { useState, useEffect } from 'react'
import Logo from '../assets/image/white-logo-crown.png'
import '../assets/css/footer.css'
import ScrollAnimation from 'react-animate-on-scroll'
import { Link } from 'react-router-dom'
import Call from '../assets/image/call.png'
import Mail from '../assets/image/mail.png'
import axios from 'axios'
import { API_URL } from '../utills/BaseUrl'
import FB from '../assets/image/fb.png'
import Insta from '../assets/image/insta.png'
import Linkedin from '../assets/image/linkedin.png'
import { IoIosArrowRoundForward } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'


function Footer() {
    const [subCategory, setSubCategory] = useState('');
    const [category, setCategory] = useState('');
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/categories`);
                setCategory(response.data.body);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/subCategories`);
                setSubCategory(response.data.body);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const token = localStorage.getItem("authToken");


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${API_URL}/newsletters`, { email, source: "HOMEPAGE" },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
            Swal.fire({
                title: "Subscribed!",
                text: "Thank you for subscribing to our newsletter. You'll now be the first to hear about our latest updates, exclusive offers, and exciting news!",
                icon: "success",
                confirmButtonText: "Close"
            });
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.response?.data?.message,
                icon: "error",
                confirmButtonText: "Close"
            });
            setError(error.response?.data?.errors);

        }
    }
    return (
        <>
            <ToastContainer />
            <div className='footer'>
                <div className="newslatter">
                    <h2>Stay Inspired with Crown! </h2>
                    <p>Subscribe to our newsletter for exhibition updates, and the latest in HPL news. </p>
                    <div className="d-flex">
                        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Your Email" />
                        {error.email && (
                            <p className='mail-error'>{error.email}</p>
                        )}
                        <button onClick={handleSubmit}>Join <IoIosArrowRoundForward className="ms-2" /></button>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-12 d-flex flex-column  resp">
                            <div className="logo d-flex justify-content-lg-center justify-content-start align-items-center ">
                                <img src={Logo} alt="logo" />
                            </div>
                            <div className='socal-link'>
                                <a href='tel:+913340660166' className="d-flex align-items-center">
                                    <div className="footer-img footer-phone">
                                        <img src={Call} alt="phone" />
                                    </div>
                                    <p className='mb-0'>+91 33 4066 0166, +91 33 2283 0166 </p>
                                </a>

                                <a href='mailto:kanishka@crownlam.com' className="d-flex align-items-center insta-res">
                                    <div className="footer-img">
                                        <img src={Mail} alt="mail" style={{ height: "12px", width: "18px", margin: "0 10px " }} />
                                    </div>
                                    <p className='mb-0'>kanishka@crownlam.com</p>
                                </a>

                            </div>
                            <div className="d-flex new-socal d-md-flex d-none">
                                <Link to='https://www.facebook.com/crownlamination/' target='_blank'><div className='me-3'><img src={FB} alt="Fb" /></div></Link>
                                <Link to='https://www.instagram.com/crown_laminates_compacts/' target='_blank'><div className='me-3'><img src={Insta} alt="Insta" /></div></Link>
                                <Link to='https://www.linkedin.com/company/42304530' target='_blank'><div className='me-3'><img src={Linkedin} alt="Linkedin" /></div></Link>
                            </div>
                        </div>
                        <div className="col-lg-3  col-6 d-flex flex-column  resp">
                            <h2>Quick Links</h2>
                            <div className="line"></div>
                            <ul>
                                <li> <Link to="/about">ABOUT</Link></li>
                                <li>  <Link to="/blog">BLOG</Link></li>
                                <li> <Link to="/contact">CONTACT US</Link></li>
                                <li> <Link to="/certification">CERTIFICATIONS</Link></li>
                                <li> <Link to="/catalouge">CATALOGUES</Link></li>
                                {/* <li> <Link to="/">PRIVACY POLICY</Link></li> */}
                            </ul>
                        </div>
                        <div className="col-lg-3  col-6 d-flex flex-column resp">
                            <h2>PRODUCTS</h2>
                            <div className="line"></div>
                            <ul>
                                {category && category.map((item) => {
                                    return (
                                        <li >
                                            <Link to={`/${item.slug}`}>
                                                <li className='text-light my-2'>{item.name}</li>
                                            </Link>
                                        </li>
                                    )
                                })
                                }
                            </ul>

                        </div>
                        <div className="col-lg-3  col-12 d-flex flex-column resp">
                            <h2>Application</h2>
                            <div className="line"></div>
                            <ul className="row">
                                {subCategory && subCategory.map((item, index) => {
                                    if (index <= 4) {
                                        return (
                                            <div className="col-6">
                                                <Link to={`/application/${item.slug}`}>
                                                    <li className='text-light'>{item.name}</li>
                                                </Link>
                                            </div>
                                        )
                                    }
                                    else if (index <= 7) {
                                        return (
                                            <div className="col-6 ">
                                                <Link to={`/application/${item.slug}`}>
                                                    <li className='text-light'>{item.name}</li>
                                                </Link>
                                            </div>
                                        )
                                    }
                                })
                                }
                                {/* <div className="col-6">
                                            <li> <Link to="/">LABPLUS</Link></li>
                                            <li> <Link to="/">QBISS</Link></li>
                                            <li> <Link to="/">TABILLO</Link></li>
                                            <li> <Link to="/">texpanel</Link></li>
                                    </div> */}
                            </ul>
                        </div>


                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="d-flex new-socal d-md-none d-block">
                        <Link to='https://www.facebook.com/crownlamination/' target='_blank'><div className='me-3'><img src={FB} alt="Fb" /></div></Link>
                        <Link to='https://www.instagram.com/crown_laminates_compacts/' target='_blank'><div className='me-3'><img src={Insta} alt="Insta" /></div></Link>
                        <Link to='https://www.linkedin.com/company/42304530' target='_blank'><div className='me-3'><img src={Linkedin} alt="Linkedin" /></div></Link>
                    </div>
                    <div className="row d-flex align-items-center justify-content-between">
                        <div className="col-lg-6 col-12 ">
                            <p>Copyright 2025 © Crown Decor Pvt Ltd. All rights reserved.</p>
                        </div>
                        <div className="col-lg-2 col-12 ">
                            <p><Link className='text-light' to={'/privacy'}>Privacy Policy</Link></p>
                        </div>
                        <div className="col-lg-4 " >
                            <p className='esta'>Developed by <a target='_blank' style={{ color: "#fff", fontWeight: "600" }} href="https://www.estaglobal.in/">Estaglobal</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Footer