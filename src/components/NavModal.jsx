import React, { useState, useEffect } from "react";
import "../assets/css/modal.css";
import Dropdown from 'react-bootstrap/Dropdown';
import { API_URL } from "../utills/BaseUrl";
import axios from "axios";
import getImageURL from "../utills/getImageURL";
import { useNavigate, Link } from "react-router-dom";


const NavModal = ({handleNavClose}) => {
    const [show, setShow] = useState(false);
    const [activeSection, setActiveSection] = useState("products");
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('');


    const navigate = useNavigate();

    const handleMouseEnter = () => setShow(true);
    const handleMouseLeave = () => setShow(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/categories`);
                setData(response.data.body);
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
                setCategory(response.data.body);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="product-menu d-lg-block d-none ">
                <Dropdown onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} show={show}>
                    <Dropdown.Toggle id="dropdown-basic" className='bg-transparent border-0 text-dark'>
                        PRODUCTS
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <div className="container">
                            <div className="row">
                                {/* Section Toggle Buttons */}
                                <div className="col-lg-3 d-flex align-items-start mt-4 justify-content-start flex-column">
                                    <button
                                        className={`menu-cat-button mb-2 ${activeSection === "products" ? "arrow-button" : "arrow-button-outline"}`}
                                        onClick={() => setActiveSection("products")}
                                    >
                                        <span className="me-3">Products</span>
                                    </button>

                                    <button
                                        className={`menu-cat-button ${activeSection === "application" ? "arrow-button" : "arrow-button-outline"}`}
                                        onClick={() => setActiveSection("application")}
                                    >
                                        <span className="me-3">Application</span>
                                    </button>
                                </div>

                                {/* Render Products Section */}
                                {activeSection === "products" && (
                                    <div className="col-lg-9">
                                        <div className="row">
                                            {data && data.map((category) => {
                                                const imageUrl = category.image ? getImageURL(category.image) : '';
                                                return (
                                                    <Link key={category._id} className="col-lg-4" to={`/${category.slug}`}>
                                                        <div className="menu-img">
                                                            <img src={imageUrl} className="img-fluid mb-2" alt={category.name} />
                                                            <h2 className="fs-5 ms-4">{category.name}</h2>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Render Applications Section */}
                                {activeSection === "application" && (
                                    <div className="col-9">
                                        <div className="row">
                                            {category && category.map((item, index) => {
                                                const imgUrl = getImageURL(item.image)
                                                if (item.isAddedToNavigation == true)
                                                    return (
                                                        <div key={index} className="col-3">
                                                            <Link className="application-box" to={`/application/${item.slug}`}>
                                                                <img src={imgUrl} alt={item.name} />
                                                                <h3 className="app-heading">{item.listingTitle}</h3>
                                                            </Link>
                                                        </div>
                                                    )
                                            }
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="d-lg-none d-block ">
                        <Dropdown.Item >
                            <div className="row">
                                {/* Section Toggle Buttons */}
                                <div className="col-lg-3 d-flex align-items-start mt-4 justify-content-start">
                                    <button
                                        className={`menu-cat-button mb-2 ms-0 ${activeSection === "products" ? "arrow-button" : "arrow-button-outline"}`}
                                        onClick={() => setActiveSection("products")}
                                    >
                                        <span>Products</span>
                                    </button>

                                    <button
                                        className={`menu-cat-button ${activeSection === "application" ? "arrow-button" : "arrow-button-outline"}`}
                                        onClick={() => setActiveSection("application")}
                                    >
                                        <span>Application</span>
                                    </button>
                                </div>

                                {/* Render Products Section */}
                                {activeSection === "products" && (
                                    <div className="col-lg-9">
                                        <div className="row">
                                            {data && data.map((category) => {
                                                const imageUrl = category.image ? getImageURL(category.image) : '';
                                                return (
                                                    <Link key={category._id} className="col-lg-4" onClick={handleNavClose} to={`/${category.slug}`}>
                                                        <div className="menu-img">
                                                            <img src={imageUrl} className="img-fluid mb-2" alt={category.name} />
                                                            <h2 className="fs-5 ms-4">{category.name}</h2>
                                                        </div>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Render Applications Section */}
                                {activeSection === "application" && (
                                    <div className="col-lg-9">
                                        <div className="row">
                                            {category && category.map((item, index) => {
                                                const imgUrl = getImageURL(item.image)
                                                if (item.isAddedToNavigation == true)
                                                    return (
                                                        <div key={index} className="col-lg-3">
                                                            <Link className="application-box" onClick={handleNavClose} to={`/application/${item.slug}`}>
                                                                <img src={imgUrl} alt={item.name} />
                                                                <h3 className="app-heading">{item.listingTitle}</h3>
                                                            </Link>
                                                        </div>
                                                    )
                                            }
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Dropdown.Item>
        </div>
        </>
    );
};

export default NavModal;
