import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import OtherPageFooter from '../components/OtherPageFooter';
import company1 from '../assets/image/certificate/CE.png';
import company2 from '../assets/image/certificate/EN 438.jpg';
import company3 from '../assets/image/certificate/FSC.png';
import company4 from '../assets/image/certificate/green label.jpg';
import company5 from '../assets/image/certificate/greenguard.jpg';
import company6 from '../assets/image/certificate/indian green building council.jpg';
import company7 from '../assets/image/certificate/INDIAN STANDARD.jpg';
import company8 from '../assets/image/certificate/nema.png';

import '../assets/css/certificate.css';
import { Link } from 'react-router-dom';
import getImageURL from '../utills/getImageURL';
import { API_URL } from '../utills/BaseUrl';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import { RxCross1 } from "react-icons/rx";
import { CountrySelect } from 'react-country-state-city';


function Certificate() {
    const [certificates, setCertificates] = useState([]);
    const [show, setShow] = useState(false);
    const [imageToDownload, setImageToDownload] = useState(null);
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({
        country: "", name: "", email: "", mobile: "", message: "", inquiryType: "CERTIFICATE"
    });
    const [errors, setErrors] = useState({});

    // Fetch countries
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((response) => {
                const options = response.data.map((country) => ({
                    value: country.name.common,
                    name: country.name.common,
                }));
                setCountries(options.sort((a, b) => a.name.localeCompare(b.name)));
            })
            .catch(console.error);
    }, []);

    // Fetch certificates
    useEffect(() => {
        axios.get(`${API_URL}/certificates?limit=0&priority=ASC`)
            .then(res => setCertificates(res.data?.body || []))
            .catch(console.error);
    }, []);

    const handleClose = () => {
        setShow(false);
        // Automatically open image after modal is closed
        if (imageToDownload) {
            setTimeout(() => {
                window.open(imageToDownload, '_blank');
                setImageToDownload(null);
            }, 300); // slight delay to ensure modal fully closes
        }
    };

    const handleChange = (field, value) => {
        const updatedErrors = { ...errors };
        if (field === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
            updatedErrors.name = "Name cannot contain numbers or special characters.";
        } else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            updatedErrors.email = "Enter a valid email address.";
        } else if (field === "mobile" && !/^\d*$/.test(value)) {
            updatedErrors.mobile = "Mobile number can only contain numbers.";
        } else if (field === "country" && !value) {
            updatedErrors.country = "Please select a country.";
        } else {
            updatedErrors[field] = "";
        }
        setErrors(updatedErrors);
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/inquiries`, formData);

            if (res.status === 200) {
                sessionStorage.setItem('certificateToken', 'true'); // Store flag/token
                setImageToDownload(true);
                setShow(false);
                window.open(imageToDownload, '_blank');
                setFormData({
                    country: "",
                    name: "",
                    email: "",
                    mobile: "",
                    message: "",
                    inquiryType: "CERTIFICATE"
                });
            }
        } catch (error) {
            const errData = error.response?.data?.errors || {};
            setErrors(errData);
            console.error(error);
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('certificateToken');
        if (token) {
            setImageToDownload(true);
        }
    }, []);

    return (
        <div>
            {/* Modal Form */}
            <Modal show={show} onHide={handleClose}>
                <div className="modal-form">
                    <button className="closeButton" onClick={handleClose}><RxCross1 /></button>
                    <div className="form">
                        <h4>To View The Certificates Fill The Details</h4>
                        {[
                            { label: "Country", field: "country", type: "select" },
                            { label: "Name", field: "name", type: "text" },
                            { label: "Email", field: "email", type: "email" },
                            { label: "Mobile Number", field: "mobile", type: "text" },
                            { label: "Message", field: "message", type: "textarea" }
                        ].map(({ label, field, type }, i) => (
                            <div key={i} className="d-flex flex-column" style={{ position: 'relative' }}>
                                <label htmlFor={field}>{label}</label>
                                {type === "select" ? (
                                    <CountrySelect

                                        containerClassName="form-group border-none"
                                        inputClassName=""
                                        onChange={(_country) => handleChange("country", _country?.name)}
                                        onTextChange={(_txt) => console.log(_txt)}
                                        placeHolder="Select Country"
                                    />
                                ) : type === "textarea" ? (
                                    <textarea
                                        id={field}
                                        value={formData[field]}
                                        onChange={(e) => handleChange(field, e.target.value)}
                                        rows={3}
                                        className="px-2"
                                    />
                                ) : (
                                    <input
                                        type={type}
                                        id={field}
                                        value={formData[field]}
                                        onChange={(e) => handleChange(field, e.target.value)}
                                    />
                                )}
                                {errors[field] && (
                                    <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>{errors[field]}</small>
                                )}
                            </div>
                        ))}
                        <button className="form-btn" onClick={handleSubmit}>View Now</button>
                    </div>
                </div>
            </Modal>

            <NavBar />

            {/* Breadcrumb */}
            <div className="bgWhite">
                <div className="container">
                    <div className="breadcrumb m-0">
                        <p>
                            <Link to="/">HOME</Link>
                            <span> / </span>
                            <Link to="/certification" className="ms-2">Certifications</Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Certificates Section */}
            <div className="certificate-box bgWhite py-3 pb-4">
                <div className="container px-5">
                    <h1>Global Certification</h1>
                    {certificates.map((cert, index) => {
                        const imgUrl = getImageURL(cert.file);
                        return (
                            <div className='d-flex align-items-center' key={index}>
                                <div className="certification-box">
                                    <p>{cert.name}</p>
                                </div>
                                <button
                                    className='certificate-btn d-md-flex d-none align-items-center justify-content-center'
                                    onClick={(e) => {
                                        const tokenExists = sessionStorage.getItem('certificateToken');
                                        if (!tokenExists) {
                                            e.preventDefault();
                                            setImageToDownload(imgUrl);
                                            setShow(true);
                                        }
                                        else {
                                            window.open(imgUrl, '_blank');
                                        }
                                    }}
                                >
                                    View
                                </button>
                                <button
                                    className='certificate-btn d-md-none d-block'
                                    onClick={() => {
                                        setImageToDownload(imgUrl);
                                        setShow(true);
                                    }}
                                >
                                    View
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Companies Logos Section */}
            <div className="companies bgWhite py-0">
                <div className="container">
                    <div className="company-box">
                        <div className="row">
                            {[company5, company6, company3, company1, company4, company2, company8, company7].map((logo, idx) => (
                                <div key={idx} className="col-lg-3 col-6 d-flex align-items-center justify-content-center">
                                    <div className="company-logo">
                                        <img src={logo} alt={`Certificate logo ${idx}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <OtherPageFooter />
        </div>
    );
}

export default Certificate;
