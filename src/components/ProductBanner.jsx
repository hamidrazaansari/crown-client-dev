import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../assets/css/category.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import BannerImg from '../assets/image/productbanner.png';
import axios from "axios";
import { API_URL } from "../utills/BaseUrl"; // Ensure the path is correct

gsap.registerPlugin(ScrollTrigger);

const ProductBanner = ({ categoryId }) => {
    const [catHeader, setCatHeader] = useState({});
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling
    const bannerContainerRef = useRef(null);

    console.log(categoryId);
    
    // GSAP Animation
    useEffect(() => {
        const container = bannerContainerRef.current;
        if (!container) {
            console.error("Banner container ref is not attached");
            return;
        }

        gsap.to(container, {
            x: "-100%",
            duration: 8,
            ease: "linear",
            scrollTrigger: {
                trigger: container,
                start: "top center",
                end: "bottom center",
                scrub: true,
                markers: true, // Set to false in production
            },
        });
    }, []);

    // Fetch Category Header Data
    useEffect(() => {
        const fetchHeader = async () => {
            setLoading(true); 
            try {
                const response = await axios.get(`${API_URL}/categories/${categoryId}`);
                setCatHeader(response.data.body); // Update state with API response
            } catch (err) {
                setError("Error fetching category header data"); // Set error message
                console.error(err);
            } finally {
                setLoading(false); // End loading
            }
        };

        if (categoryId) {
            fetchHeader();
        } else {
            console.error("categoryId is not provided");
        }
    }, [categoryId]);

    return (
        <div className="product-banner">
            <div className="product-banners-container" ref={bannerContainerRef}>
                {/* <img src={BannerImg} alt="product banner" /> */}
            </div>

            <div className="content">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <>
                        {/* <h2>{catHeader.textOverImage || "Default Title"}</h2>
                        <div className="line"></div>
                        <p>{catHeader.listingDescription || "Default description here."}</p> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductBanner;
