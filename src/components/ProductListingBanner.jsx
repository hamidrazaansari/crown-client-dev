import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import Img from '../assets/image/productbanner.png'
import '../assets/css/products.css'

gsap.registerPlugin(ScrollTrigger);

function ProductListingBanner({ catgoryId }) {

    const [catHeader, setCatHeader] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHeader = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/categories/${catgoryId}`);
                setCatHeader(response.data.body); // Update state with API response
            } catch (err) {
                setError("Error fetching category header data"); // Set error message
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (catgoryId) {
            fetchHeader();
        } else {
            console.error("categoryId is not provided");
        }
    }, [catgoryId]);

    return (
        <div >
        </div>
    )
}

export default ProductListingBanner