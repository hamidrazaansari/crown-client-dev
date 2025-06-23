import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import OtherPageFooter from '../components/OtherPageFooter'
import '../assets/css/contact.css'
import ContactCreative from '../assets/image/contact-us-creative.png'
import Call from '../assets/image/call.png'
import Mail from '../assets/image/mail.png'
import Location from '../assets/image/location.png'
import FB from '../assets/image/fb.png'
import Insta from '../assets/image/insta.png'
import Linkedin from '../assets/image/linkedin.png'
import { Link } from 'react-router-dom'
import SelectSearch from 'react-select-search'
import axios from 'axios'
import { API_URL } from '../utills/BaseUrl'
import Swal from 'sweetalert2'


function ContactUs() {
    const [countries, setCountries] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        country: "",
        message: "",
        inquiryType: '',
        visitorType: ''
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        mobile: "",
        country: "",
        message: "",
        inquiryType: '',
        visitorType: ''
    });

    const inquiryOptions = [
        { name: 'Product', value: 'PRODUCT', type: 'country' },
        { name: 'Price', value: 'PRICE', type: 'country' },
        { name: 'Samples', value: 'SAMPLING', type: 'country' },
        { name: 'Export', value: 'EXPORT', type: 'country' },
        { name: 'General', value: 'GENERAL', type: 'country' },
        { name: 'Supplier', value: 'SUPPLIER', type: 'country' },
        { name: 'Career', value: 'CAREER', type: 'country' },
        { name: 'Feedback/Concerns', value: 'FEEDBACK/CONCERNS', type: 'country' },

    ];


    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((response) => {
                const countryOptions = response.data.map((country) => ({
                    value: country.name.common, // Country code
                    name: country.name.common, // Country name
                }));
                setCountries(countryOptions.sort((a, b) => a.name.localeCompare(b.name)));
            })
            .catch((error) => console.error("Error fetching countries:", error));
    }, []);

    const visitorOptions = [
        { name: 'Architect', value: 'Architect', type: 'country' },
        { name: 'Builder', value: 'Builder', type: 'country' },
        { name: 'Contractor', value: 'Contractor', type: 'country' },
        { name: 'Home Owner', value: 'Home Owner', type: 'country' },
        { name: 'Interior Designer', value: 'Interior Designer', type: 'country' },
        { name: 'OEM', value: 'OEM', type: 'Oems' },
        { name: 'Trade Partner', value: 'TRADE PARTNER', type: 'country' },

    ];

    const handleChange = (field, value) => {
        let newErrors = { ...errors };

        if (field === "name") {
            if (!/^[a-zA-Z\s]*$/.test(value)) {
                newErrors.name = "Name cannot contain numbers or special characters.";
                return; // Prevent updating the name field
            } else {
                newErrors.name = "";
            }
        }

        if (field === "email") {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                newErrors.email = "Enter a valid email address.";
            } else {
                newErrors.email = "";
            }
        }

        if (field === "mobile") {
            if (!/^\d*$/.test(value)) {
                newErrors.mobile = "mobile number can only contain numbers.";
                return; // Prevent updating the mobile field
            } else {
                newErrors.mobile = "";
            }
        }

        if (field === "country") {
            newErrors.country = value ? "" : "Please select a country.";
        }
        if (field === "visitorType") {
            newErrors.visitorType = value ? "" : "Please select a visitorType.";
        }
        if (field === "inquiryType") {
            newErrors.inquiryType = value ? "" : "Please select a inquiryType.";
        }

        setErrors(newErrors);
        setFormData({ ...formData, [field]: value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/inquiries`, formData)
            Swal.fire({
                title: "Thank you for reaching out! ",
                text: "Your inquiry has been successfully submitted. Our team will review your request and get back to you as soon as possible.",
                icon: "success"
            });
            setFormData({
                name: "",
                email: "",
                mobile: "",
                country: "",
                message: "",
                inquiryType: '',
                visitorType: ''
            });

            console.log(res);

        } catch (error) {

            const errrData = error.response?.data?.errors
            setErrors({
                name: errrData?.name,
                email: errrData?.email,
                mobile: errrData?.mobile,
                country: errrData?.country,
                message: errrData?.message,
                inquiryType: errrData?.inquiryType,
                visitorType: errrData?.visitorType
            })
        }



    };
    return (
        <div>
            <NavBar />
            <div className="bgWhite">
                <div className="container">
                    <div className="breadcrumb m-0">
                        <p>
                            <Link to="/">HOME</Link>
                            <span> / </span>
                            <Link to="/contact" className="ms-2">CONTACT US</Link>
                        </p>
                    </div>
                </div>
            </div>
            <div className="contact-us bgWhite">
                <div className="container">
                    <h1>Contact us</h1>
                    {/* <p>Any question or remarks? Just write us a message!</p> */}
                    <div className="contact-box">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="image-box">
                                    <img src={ContactCreative} alt="Creative" />
                                </div>
                                <div className="contact-info">
                                    <h2> Contact Information</h2>
                                   <a href='tel:+913340660166'><p><img src={Call} alt="phone" />+91 33 4066 0166, +91 33 2283 0166</p></a> 
                                    <a href='mailto:kanishka@crownlam.com'><p><img src={Mail} alt="mail" style={{ height: "15px", width: '18px' }} />kanishka@crownlam.com</p></a>

                                    <strong ><img src={Location} alt="phone" />Global Contact Point</strong>
                                    <p className='add-para'>The Regency, Unit 3, 2nd Floor,
                                        6 Hungerford Street, Kolkata-700017, India
                                    </p>


                                    <strong><img src={Location} alt="phone" />Corporate Office</strong>
                                    <p className='add-para'>One42, North Tower
                                        Suite 401-403, 4th Floor
                                        Ambali Bhopal Road,
                                        B/H Ashok Vatika
                                        Ahmedabad 380058
                                        Gujarat, India</p>
                                    <strong><img src={Location} alt="phone" />Factory Address</strong>
                                    <p className='add-para'>Survey no. 419/1, Radhe Industrial Estate, Tajpur Road, Changodar-382 213, Ahmedabad, Gujarat 382213</p>
                                </div>
                                <div className="socalLinks">
                                    <Link to='https://www.facebook.com/crownlamination/' target='_blank'><img src={FB} alt="Facebook" /></Link>
                                    <Link to='https://www.instagram.com/crown_laminates_compacts/' target='_blank'><img src={Insta} alt="Instagram" /></Link>
                                    <Link to={'https://www.linkedin.com/company/42304530'} target='_blank'><img src={Linkedin} alt="Linkedin" /></Link>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="contactForm mt-5">
                                    <div className="row">
                                        <div className="col-6 d-flex flex-column input-field" style={{ position: 'relative' }}>
                                            <label htmlFor="name">Name*</label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => handleChange("name", e.target.value)}
                                            />
                                            {errors.name && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "62px" }}>{errors.name}</small>}

                                        </div>
                                        <div className="col-6 d-flex flex-column" style={{ position: 'relative' }}>
                                            <label htmlFor="email">Email*</label>
                                            <input type="email" id='email'
                                                value={formData.email}
                                                onChange={(e) => handleChange("email", e.target.value)}
                                            />
                                            {errors.email && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "62px" }}>{errors.email}</small>}

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 d-flex flex-column " style={{ position: 'relative', marginTop: "14px" }}>
                                            <label htmlFor="mobile">Mobile*</label>
                                            <input
                                                type="text"
                                                id="mobile"
                                                value={formData.mobile}
                                                onChange={(e) => handleChange("mobile", e.target.value)}
                                            />
                                            {errors.mobile && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "62px" }}>{errors.mobile}</small>}

                                        </div>
                                        <div className="col-lg-6 country-drop" style={{position:"relative"}}>
                                            <label htmlFor="country">Country</label>
                                            <SelectSearch
                                                options={countries}
                                                value={formData.country}
                                                onChange={(value) => handleChange("country", value)}
                                                placeholder="Select a country"
                                                search
                                            />
                                            {errors.country && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>{errors.country}</small>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 country-drop" style={{ position: 'relative' }}>
                                            <div className='d-flex flex-column country'>
                                                <label htmlFor="country">Interested in*</label>
                                                <SelectSearch
                                                    options={inquiryOptions}
                                                    value={formData.inquiryType}
                                                    onChange={(value) => handleChange("inquiryType", value)}
                                                    placeholder='Select Interested'

                                                />
                                                {errors.inquiryType && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>{errors.inquiryType}</small>}

                                            </div>
                                        </div>
                                        <div className="col-6 d-flex flex-column country-drop" style={{ position: 'relative' }}>
                                            <label htmlFor="mobile">Visitor Type</label>
                                            <SelectSearch
                                                options={visitorOptions}
                                                value={formData.visitorType}
                                                onChange={(value) => handleChange("visitorType", value)}
                                                placeholder="Select Visitor Type"

                                            />
                                            {errors.visitorType && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>{errors.visitorType}</small>}

                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-12 d-flex flex-column" style={{ position: 'relative' }}>
                                            <label htmlFor="message">Message</label>
                                            <input
                                                type="text"
                                                id="message"
                                                value={formData.message}
                                                onChange={(e) => handleChange("message", e.target.value)}
                                            />
                                            {errors.message && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>{errors.message}</small>}

                                        </div>
                                    </div>

                                    <button className='submit' onClick={handleSubmit}>Submit</button>
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

export default ContactUs


