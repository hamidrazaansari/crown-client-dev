import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import OtherPageFooter from '../components/OtherPageFooter';
import CatalougeBanner from '../assets/image/Catalogue-banner.jpg';
import { Modal } from 'react-bootstrap';
import "../assets/css/product-details.css";
import "../assets/css/details.css";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import File from '../assets/image/file.png';
import '../assets/css/certificate.css';
import '../assets/css/catalouge.css';
import { Link } from 'react-router-dom';
import { API_URL } from '../utills/BaseUrl';
import axios from 'axios';
import getImageURL from '../utills/getImageURL';
import { RxCross1 } from 'react-icons/rx';
import { CountrySelect } from 'react-country-state-city';

function Catalogue() {
    const [selectedFilter, setSelectedFilter] = useState("");
    const [catelouge, setCatelouge] = useState([]);
    const [catalogueCategories, setCatalogueCategories] = useState([]);
    const [show, setShow] = useState(false);
    const [isDownload, setIsDownload] = useState(false);

    const [countries, setCountries] = useState([]);
    const [imageToDownload, setImageToDownload] = useState('');

    const [formData, setFormData] = useState({
        country: "",
        name: "",
        email: "",
        mobile: "",
        message: "",
        inquiryType: "CATALOGUE" , 
        source:"CATALOGUE"
    });

    const [errors, setErrors] = useState({});

    const handleClose = () => setShow(false);

    const handleChange = (field, value) => {
        const newErrors = { ...errors };

        if (field === "name" && !/^[a-zA-Z\s]*$/.test(value)) {
            newErrors.name = "Name cannot contain numbers or special characters.";
            setErrors(newErrors);
            return;
        }

        if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            newErrors.email = "Enter a valid email address.";
        } else if (field === "mobile" && !/^\d*$/.test(value)) {
            newErrors.mobile = "Mobile number can only contain numbers.";
            return;
        } else if (field === "country" && !value) {
            newErrors.country = "Please select a country.";
        } else {
            newErrors[field] = "";
        }

        setErrors(newErrors);
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_URL}/inquiries`, formData);

            if (res.status === 200) {
                sessionStorage.setItem('catalogueToken', 'true'); // Store flag/token
                setIsDownload(true);
                setShow(false);
                window.open(imageToDownload, '_blank');
                setFormData({
                    country: "",
                    name: "",
                    email: "",
                    mobile: "",
                    message: "",
                    inquiryType: "CATALOGUE",
                     source:"CATALOGUE"
                });
            }
        } catch (error) {
            const errData = error.response?.data?.errors || {};
            setErrors(errData);
            console.error(error);
        }
    };

    useEffect(() => {
        const token = sessionStorage.getItem('catalogueToken');
        if (token) {
            setIsDownload(true);
        }
    }, []);


    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((response) => {
                const countryOptions = response.data.map((country) => ({
                    value: country.name.common,
                    name: country.name.common,
                }));
                setCountries(countryOptions.sort((a, b) => a.name.localeCompare(b.name)));
            })
            .catch((error) => console.error("Error fetching countries:", error));
    }, []);

    useEffect(() => {
        async function fetchCatalogueCategories() {
            try {
                const response = await axios.get(`${API_URL}/catalogueCategories?limit=0&priority=ASC`);
                setCatalogueCategories(response.data.body || []);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCatalogueCategories();
    }, []);

    useEffect(() => {
        async function fetchCatalogue() {
            try {
                let url = `${API_URL}/catalogues?limit=0&priority=ASC`;
                if (selectedFilter) url += `&category=${selectedFilter}`;
                const response = await axios.get(url);
                setCatelouge(response.data.body || []);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCatalogue();
    }, [selectedFilter]);

    return (
        <div>
            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <div className="modal-form">
                <button className="closeButton" onClick={handleClose}><RxCross1 /></button>
                    
                    <div className="form">
                        <h4>To Download The Catalogues Fill The Details</h4>

                        <div className="d-flex flex-column" style={{ position: "relative" }}>
                            <label>Country</label>
                                    <CountrySelect

                                        containerClassName="form-group border-none"
                                        inputClassName=""
                                        onChange={(_country) => handleChange("country", _country?.name)}
                                        onTextChange={(_txt) => console.log(_txt)}
                                        placeHolder="Select Country"
                                    />
                            {errors.country && <small className="error-text">{errors.country}</small>}
                        </div>

                        <div className="d-flex flex-column" style={{ position: "relative" }}>
                            <label>Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                            {errors.name && <small className="error-text">{errors.name}</small>}
                        </div>

                        <div className="d-flex flex-column" style={{ position: "relative" }}>
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                            {errors.email && <small className="error-text">{errors.email}</small>}
                        </div>

                        <div className="d-flex flex-column" style={{ position: "relative" }}>
                            <label>Mobile</label>
                            <input
                                type="text"
                                value={formData.mobile}
                                onChange={(e) => handleChange("mobile", e.target.value)}
                            />
                            {errors.mobile && <small className="error-text">{errors.mobile}</small>}
                        </div>

                        <div className="d-flex flex-column" style={{ position: "relative" }}>
                            <label>Message</label>
                            <textarea
                                rows={3}
                                value={formData.message}
                                onChange={(e) => handleChange("message", e.target.value)}
                            />
                        </div>

                        <button className="form-btn" onClick={handleSubmit}>Download Now</button>
                    </div>
                </div>
            </Modal>

            <NavBar />

            {/* Breadcrumb and Banner */}
            <div className="bgWhite">
                <div className="container">
                    <div className="breadcrumb m-0">
                        <p>
                            <Link to="/">HOME</Link>
                            <span> / </span>
                            <Link to="/catalouge" className="ms-2">Catalogues</Link>
                        </p>
                    </div>
                </div>
            </div>

            <div className="bgWhite">
                <div className="container catalogue-banner">
                    <img src={CatalougeBanner} alt="CatalougeBanner" />
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="bgWhite">
                <div className="catalouge-btn container d-flex flex-wrap">
                    <button
                        className={selectedFilter === "" ? "active-filter" : ""}
                        onClick={() => setSelectedFilter("")}
                    >
                        All
                    </button>
                    {catalogueCategories.map((cat) => (
                        <button
                            key={cat._id}
                            className={selectedFilter === cat._id ? "active-filter" : ""}
                            onClick={() => setSelectedFilter(cat._id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Catalogue List */}
            <div className="certificate-box bgWhite py-3 pb-5">
                <div className="container px-5">
                    <h1>CROWN CATALOGUE</h1>
                    {catelouge.length > 0 ? catelouge.map((cert, index) => {
                        const imageUrl = getImageURL(cert?.file);
                        return (
                            <div className="d-flex align-items-center" key={index}>
                                <div className="certification-box">
                                    <p>{cert.name}</p>
                                </div>
                                <a
                                    href={isDownload ? imageUrl : '#'}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="certificate-btn d-md-flex d-none align-items-center justify-content-center"
                                    onClick={(e) => {
                                        const tokenExists = sessionStorage.getItem('catalogueToken');
                                        if (!tokenExists) {
                                            e.preventDefault();
                                            setImageToDownload(imageUrl);
                                            setShow(true);
                                        }
                                    }}
                                >
                                    Download <img src={File} alt="file" />
                                </a>
                                <a href={imageUrl} download className='certificate-btn d-md-none d-flex align-items-center justify-content-center'>Download <img src={File} alt="eye" /></a>
                            </div>
                        );
                    }) : <p>No catalogues found.</p>}
                </div>
            </div>

            <OtherPageFooter />
        </div>
    );
}

export default Catalogue;
