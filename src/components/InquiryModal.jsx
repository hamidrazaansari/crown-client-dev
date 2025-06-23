import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../assets/css/product-details.css";
import "../assets/css/details.css";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { API_URL } from "../utills/BaseUrl";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { CountrySelect } from "react-country-state-city";


function InquiryModal({ show, handleClose, inquiryType, productData, categoryId, subCategoryId , source }) {

    useEffect(() => {
        console.log(productData);
        setFormData((old) => {
            return { ...old, product: productData?._id, decorSeries: productData?.decorSeries?._id, decorNumber: productData?.decorNumber, ...(categoryId && { category: categoryId }), ...(subCategoryId && { subCategory: subCategoryId }) }
        })
    }, [productData, categoryId, subCategoryId])





    const [formData, setFormData] = useState({
        country: "",
        name: "",
        email: "",
        mobile: "",
        message: "",
        inquiryType: inquiryType,
        source: source

    });

    const [errors, setErrors] = useState({
        country: "",
        name: "",
        email: "",
        mobile: "",
        message: "",
        product: ''
    });


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

        setErrors(newErrors);
        setFormData({ ...formData, [field]: value });
    };

    console.log(formData);
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/inquiries`, formData)

            console.log('res', res);

            Swal.fire({
                title: "Thank you for reaching out! ",
                text: "Your inquiry has been successfully submitted. Our team will review your request and get back to you as soon as possible.",
                icon: "success"
            });
            handleClose()
            setFormData({
                country: "",
                name: "",
                email: "",
                mobile: "",
                inquiryType: inquiryType, // Keep inquiryType
                product: productId, 
                source:source      // Keep productId
            });
        } catch (error) {

            const errrData = error.response?.data?.errors
            setErrors({
                country: errrData.country,
                name: errrData.name,
                email: errrData.email,
                mobile: errrData.mobile
            })
        }



    };


    return (
        <div className="inquiry-modal">
            <Modal show={show} onHide={handleClose}>
                <div className="modal-form">
                    <button className="closeButton" onClick={handleClose}>
                        <RxCross1 />
                    </button>
                    <div className="form">
                        <h4>Fill The Details</h4>

                        {/* Country Selection */}
                        <div className="d-flex flex-column" style={{ position: "relative" }}>
                            <label htmlFor="country">Country</label>
                            <CountrySelect

                                containerClassName="form-group border-none"
                                inputClassName=""
                                onChange={(_country) => handleChange("country" , _country?.name)}
                                onTextChange={(_txt) => console.log(_txt)}
                                placeHolder="Select Country"
                            />
                            {errors.country && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>{errors.country}</small>}
                        </div>

                        {/* Name Input */}
                        <div className="d-flex flex-column" style={{ position: 'relative' }}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                            />
                            {errors.name && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>{errors.name}</small>}
                        </div>

                        {/* Email Input */}
                        <div className="d-flex flex-column" style={{ position: 'relative' }}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                            />
                            {errors.email && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>{errors.email}</small>}
                        </div>

                        {/* mobile Input */}
                        <div className="d-flex flex-column" style={{ position: 'relative' }}>
                            <label htmlFor="mobile">Mobile Number</label>
                            <input
                                type="text"
                                id="mobile"
                                value={formData.mobile}
                                onChange={(e) => handleChange("mobile", e.target.value)}
                            />
                            {errors.mobile && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>{errors.mobile}</small>}

                        </div>

                        <div className="d-flex flex-column" style={{ position: 'relative' }}>
                            <label htmlFor="message">Meassge</label>
                            <textarea
                                type="text"
                                id="message"
                                value={formData.message}
                                onChange={(e) => handleChange("message", e.target.value)}
                                rows={3}
                                className="px-2"
                            />
                            {errors.message && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>{errors.message}</small>}
                        </div>

                        <button className="form-btn" onClick={handleSubmit}>
                            Enquire Now
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default InquiryModal;
