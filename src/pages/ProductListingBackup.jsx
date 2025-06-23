import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import '../assets/css/products.css';
import { Accordion } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { API_URL } from '../utills/BaseUrl';
import axios from 'axios';
import Img from '../assets/image/productbanner.png';
import OtherPageFooter from '../components/OtherPageFooter';
import Product1 from '../assets/image/product1.png';
import getImageURL from '../utills/getImageURL';

function ProductListing() {
    const [products, setProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [decorSeries, setDecorSeries] = useState([]);
    const [finishes, setFinishes] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState([]);
    const [selectedFinish, setSelectedFinish] = useState('');
    const [selectedDecor, setSelectedDecor] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [catHeader, setCatHeader] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const location = useLocation();
    const categoryId = location.state;

    useEffect(() => {
        async function fetchProduct() {
            try {
              const response = await axios.get(`${API_URL}/products?category=${categoryId}`)
              setProducts(response.data.body);

              
            } catch (error) {

                console.log(error);
                
            }
        }
        fetchProduct()
    },[categoryId])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [sizesRes, decorRes, finishesRes, subCategoryRes, categoryRes] = await Promise.all([
                    axios.get(`${API_URL}/sizes`),
                    axios.get(`${API_URL}/decorSeries`),
                    axios.get(`${API_URL}/finishes`),
                    axios.get(`${API_URL}/subCategories`),
                    axios.get(`${API_URL}/categories/${categoryId ? categoryId : "6724e2e2a0586b2a40e206f8"}`)
                ]);
                setSizes(sizesRes.data.body);
                setDecorSeries(decorRes.data.body);
                setFinishes(finishesRes.data.body);
                setSubCategory(subCategoryRes.data.body);
                setCatHeader(categoryRes.data.body);
            } catch (err) {
                setError('Error fetching data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryId]);

    // Search functionality
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/products?category=${categoryId}`, {
                    params: searchQuery ? { searchQuery } : {}
                });
                setProducts(response.data.body);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        fetchData();
    }, [searchQuery]);

    // **Handle Multi-Select Size Filter**
    const handleSizeFilter = (sizeId) => {
        setSelectedSize(prev =>
            prev.includes(sizeId) ? prev.filter(id => id !== sizeId) : [...prev, sizeId]
        );
    };

    const handleFinishFilter = (finishId) => {
        setSelectedFinish(prev =>
            prev.includes(finishId) ? prev.filter(id => id !== finishId) : [...prev, finishId]

        );
    };

    const handleSubCategoryFilter = (subCategoryId) => {
        setSelectedSubCategory(prev => prev === subCategoryId ? '' : subCategoryId);
    };

    const handleDecorSeriesFilter = (decorId) => {
        setSelectedDecor(prev => prev === decorId ? '' : decorId);
    };


    const filteredProducts = products.filter((product) => {
        
        const sizeMatch =
            selectedSize.length === 0 ||
            product.sizes?.some((size) => selectedSize.includes(size._id));

        const finishMatch =
            selectedFinish === '' ||
            product.sizeFinishes?.some((finish) => finish._id === selectedFinish);

        const subCategoryMatch =
            selectedSubCategory === '' ||
            product.subCategories?.some((sub) => sub._id === selectedSubCategory);

        const decorSeriesMatch =
            selectedDecor === '' ||
            product.decorSeries?._id === selectedDecor;

        return sizeMatch && finishMatch && subCategoryMatch && decorSeriesMatch;
    });


    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;

    

    return (
        <div>
            <NavBar />
            <div className="bgWhite py-4">
                <div className="container">
                    <div className="breadcrumb mb-0">
                        <p className='mb-0'><Link to="/">HOME</Link><span> / </span> <Link to="/" className='ms-2'>Exterior Compacts</Link></p>
                    </div>
                </div>
            </div>

            <div className="bgWhite">
                <div className="container">
                    <div className='product-main-banner'>
                        <div className="product-banner d-flex">
                            <div>
                                <img src={Img} alt="" />
                                <div className='banner-text-container'>
                                    <h2>{catHeader.textOverImage || "Default Title"}</h2>
                                    <div className="line"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Listing Section */}
            <div className="product-listing py-5">
                <div className="container">
                    <div className="row">
                        {/* Sidebar Filters */}
                        <div className="col-lg-3">
                            <div className="sidebar">
                                <h3>Search by decor code</h3>
                                <input
                                    type="text"
                                    placeholder='search'
                                    className='search'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />

                                {/* Size Filter */}
                                <h3 className='mt-3'>FILTER BY SIZE</h3>
                                <div className="row">
                                    {sizes.map((size) => (
                                        <div className="col-6" key={size._id}>
                                            <button
                                                onClick={() => handleSizeFilter(size._id, size.title)}
                                                className={selectedSize.includes(size._id) ? 'active-btn' : ''}
                                            >
                                                {size.title}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Other Filters */}
                                <h3 className='mt-3'>FILTER BY FINISHES</h3>
                                <div className="row">
                                    {finishes.map((finish) => (
                                        <div className="col-6" key={finish._id}>
                                            <button onClick={() => handleFinishFilter(finish._id)}
                                                className={selectedFinish.includes(finish._id) ? 'active-btn' : ''}
                                            >
                                                {finish.shortName}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <h3 className='mt-3'>FILTER BY Decor Series</h3>
                                <div className="row">
                                    {decorSeries.map((type) => (
                                        <div className="col-6" key={type._id}>
                                            <button onClick={() => handleDecorSeriesFilter(type._id)} className={selectedDecor.includes(type._id) ? 'active-btn' : ''}>
                                                {type.title}
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Category Filter */}
                                <h3 className='mt-3'>FILTER BY CATEGORY</h3>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Subcategory</Accordion.Header>
                                        <Accordion.Body>
                                            <ul className='list-unstyled ms-2'>
                                                {subCategory.map((item) => (
                                                    <li key={item._id}>
                                                        <p onClick={() => handleSubCategoryFilter(item._id)}>
                                                            {item.name}
                                                        </p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="col-lg-9 products-container">
                            <h2>{catHeader.name || "Default Title"}</h2>
                            <p>{catHeader.shortDescription || ''}</p>

                            <div className="row mt-3">
                                {filteredProducts?.map((product) => {
                                    const imageUrl = getImageURL(product?.a4Image)
                                    return (
                                        <div className="col-lg-4" key={product._id}>
                                            <Link to={`/product-details/${product._id}`}>
                                                <div className="product-box">
                                                    <img src={imageUrl} alt={product.name} />
                                                    <div className="blur"></div>
                                                    <div className="line"></div>
                                                    <h4>{product.name}</h4>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <OtherPageFooter />
        </div>
    );
}

export default ProductListing;
