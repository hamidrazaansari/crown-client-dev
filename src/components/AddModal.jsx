import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import imageWithForm from '../assets/image/imageWithForm.png'
import ModalBanner from '../assets/image/modalImage.png'
import newslatterBg from '../assets/image/newslatterBg.png'
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { API_URL } from "../utills/BaseUrl";
import { toast, ToastContainer } from "react-toastify";
import Swal from 'sweetalert2'
import { CountrySelect } from "react-country-state-city";
import getImageURL from '../utills/getImageURL';



function BannerModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='crown-modal'
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <img src={props.imageUrl} className='img-fluid' alt="crown modal banner " />
            </Modal.Body>
        </Modal>
    );
}
function NewsLatterModal(props) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

        const token = localStorage.getItem("authToken");


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${API_URL}/newsletters`, { email, source: "POPUP" },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
            toast.success(response.data?.message)
            props.setModalShow(false)

        } catch (error) {
            toast.error(error.response?.data?.message)
            setError(error.response?.data?.errors);

        }
    }
    
    return (
        <>
            <ToastContainer />
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='crown-modal'
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <img src={props.imageUrl} className='w-100 h-100 m-0 newslatterBg img-fluid' alt="crown modal banner" />
                    <div className="newsLatterContent">
                        <h3>Subscribe to our</h3>
                        <h2>Newsletter</h2>
                        <p>To be updated with all the latest trends and products</p>
                        <div className="d-flex">
                            <input type="text" className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }} /> 
                            <button className='newsLatterBtn' onClick={handleSubmit}>Join</button>
                        </div>
                            <small className='text-danger' style={{position:"relative" , left:"-66px"}}>{error.email ? error.email : ''}</small>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    );
}
function ModalWithBannerAndForm(props) {

    const [formData, setFormData] = useState({
        country: "",
        name: "",
        email: "",
        mobile: "",
        message: "",
        source: "POPUP",
        inquiryType: "GENERAL"

    });

    const [errors, setErrors] = useState({
        country: "",
        name: "",
        email: "",
        mobile: "",
        message: "",
        product: '',
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
            props.setModalShow(false)
            setFormData({
                country: "",
                name: "",
                email: "",
                mobile: "",
                product: '',
                source: " ",
                inquiryType: 'GENERAL'
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
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='crown-modal'
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-6 p-0">
                        <img src={props.imageUrl} className='h-100 w-100 img-fluid ' alt="crown modal banner " />
                    </div>
                    <div className="col-6 p-0">
                        <div className='form'>
                            {/* Country Selection */}
                            <div className="d-flex flex-column" style={{ position: "relative" }}>
                                <label htmlFor="country">Country</label>
                                <CountrySelect
                                    containerClassName="form-group border-none"
                                    inputClassName=""
                                    onChange={(_country) => handleChange("country", _country?.name)}
                                    onTextChange={(_txt) => console.log(_txt)}
                                    placeHolder="Select Country"
                                />
                                {errors.country && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "77px" }}>{errors.country}</small>}
                            </div>

                            {/* Name Input */}
                            <div className="d-flex flex-column mt-2" style={{ position: 'relative' }}>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                                {errors.name && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "70px" }}>{errors.name}</small>}
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
                                {errors.email && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "70px" }}>{errors.email}</small>}
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
                                {errors.mobile && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "70px" }}>{errors.mobile}</small>}

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
                                {errors.message && <small style={{ color: 'red', fontSize: "11px", position: "absolute", top: "70px" }}>{errors.message}</small>}
                            </div>

                            <button className="form-btn" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}


export default function AddModal({ modalShow, setModalShow }) {
    const [popup, setPopup] = useState('')

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://crown-api.esta-dev.com/api/v1/popups?status=true`)
            setPopup(response.data?.body[0]);

        }
        fetchData()
    }, [])

    console.log(popup);

    const imageUrl = getImageURL(popup.image)
    
    return (
        <>
            {popup?.popupType === "NEWSLETTER" && (
                <NewsLatterModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    imageUrl={imageUrl}
                    setModalShow={setModalShow}

                />
            )}

            {["IMAGE"].includes(popup?.popupType) && (
                <BannerModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    imageUrl={imageUrl}
                />
            )}

            {popup?.popupType === "IMAGE_AND_CONTENT" && (
                <ModalWithBannerAndForm
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    setModalShow={setModalShow}
                    imageUrl={imageUrl}
                />
            )}

        </>
    );
}
