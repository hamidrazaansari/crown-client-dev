import React, { useState, useEffect, useContext } from 'react';
import NavBar from './NavBar';
import 'react-select-search/style.css';
import '../assets/css/order.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../utills/BaseUrl';
import axios from 'axios';
import getImageURL from '../utills/getImageURL';
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from 'react-toastify';
import { CounterContext } from '../context/CounterContext';
import Select from "react-select";
import { Country, State, City } from 'country-state-city';


function Order() {
    const [error, setError] = useState({
        name: '',
        mobile: '',
        email: '',
        products: '',
        address: '',
        locality: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
    })
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [locality, setLocality] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState([]);
    const [state, setState] = useState([]);
    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    

    useEffect(() => {
        setCountry(Country.getAllCountries() || []);
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const states = State.getStatesOfCountry(selectedCountry) || [];
            setState(states);
            setSelectedState('');
            setCity([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            const cities = City.getCitiesOfState(selectedCountry, selectedState) || [];
            setCity(cities);
            setSelectedCity('');
        }
    }, [selectedState]);

    const countryOptions = country && country.map((country) => ({
        value: country.isoCode,   // For API usage or lookups
        label: country.name       // What is shown in the dropdown
    }));
    const stateOptions = state && state.map((country) => ({
        value: country.isoCode,   // For API usage or lookups
        label: country.name       // What is shown in the dropdown
    }));
    const cityOptions = city && city.map((country) => ({
        value: country.name,   // For API usage or lookups
        label: country.name       // What is shown in the dropdown
    }));

    const { removeItemById, data, clearCart } = useContext(CounterContext);

    const handlePlaceOrder = async () => {
        if (!data?.length) {
            toast.error("No data available");
            return;
        }

        const products = data.map(({ _id, categoryId, subCategoryId }) => ({
            product: _id,
            qty: "1",
            ...(categoryId && { category: categoryId }),
            ...(subCategoryId && { subCategory: subCategoryId }),
        }));

        try {
            const response = await axios.post(`${API_URL}/orders`, {
                name,
                mobile,
                email,
                products,
                address,
                locality,
                city: selectedCity,
                state : selectedState,
                country : selectedCountry,
                pincode,
            });

            toast.success(response.data.message);
            clearCart();
            navigate('/thank-you');
        } catch (error) {
            const errorData = error.response?.data?.errors || {};
            console.log(errorData);
            setError({
                name: errorData.name || '',
                mobile: errorData.mobile || '',
                email: errorData.email || '',
                products: errorData.products || '',
                address: errorData.address || '',
                locality: errorData.locality || '',
                city: errorData.city || '',
                state: errorData.state || '',
                country: errorData.country || '',
                pincode: errorData.pincode || '',
            });
        }
    };

    const navigate = useNavigate();

    const handleGoto = () => {

        navigate("/decorative-laminate");
    };


    return (
        <div>
            <ToastContainer />
            <NavBar />

            <div className="container placeOrder">
                <div className="row">
                    <div className="col-lg-8 order-md-0 order-1">
                        <div className="order-form">
                            <h2>Delivery Address</h2>
                            <div className="row">
                                <div className="col-12" style={{ position: 'relative' }}>
                                    <div className='d-flex flex-column country'>
                                        <Select
                                            options={countryOptions}
                                            onChange={(option) => setSelectedCountry(option.value)}
                                            value={countryOptions && countryOptions.find((c) => c.value === selectedCountry) || null}
                                            placeholder="Select Country"
                                        />
                                        {error.country && (
                                            <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "75px" }}>
                                                {error.country}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6" style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^[A-Za-z\s]*$/.test(value)) {
                                                setName(value);
                                            }
                                        }}
                                    />
                                    {error.name && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.name}
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-6" style={{ position: 'relative' }}>
                                    <input type="email" id='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                                    {error.email && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12" style={{ position: 'relative' }}>
                                    <textarea name="address" id="address" placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
                                    {error.address && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.address}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row"  >
                                <div className="col-12" style={{ position: 'relative' }}>
                                    <input type="text" placeholder='Apartment, suite, etc. (Optional)' onChange={(e) => setLocality(e.target.value)} />
                                    {error.locality && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.locality}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row" >

                                <div className="col-lg-4 state" style={{ position: 'relative' }}>
                                    <Select
                                        options={stateOptions}
                                        onChange={(option) => setSelectedState(option.value)}
                                        value={stateOptions && stateOptions.find((c) => c.value === selectedState) || null}
                                        disabled={!selectedCountry}
                                        placeholder="Select State"
                                        className='mt-2'
                                    />
                                    {error.state && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.state}
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-4  " style={{ position: 'relative' }}>
                                <Select
                                        options={cityOptions}
                                        onChange={(option) => setSelectedCity(option.value)}
                                        value={cityOptions && cityOptions.find((c) => c.value === selectedCity) || null}
                                        disabled={!selectedState}
                                        placeholder="Select State"
                                        className='mt-2'
                                    />
                                    {error.city && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.city}
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-4  " style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="PIN code"
                                        value={pincode}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setPincode(value);
                                            }
                                        }}
                                    />
                                    {error.pincode && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.pincode}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row"  >
                                <div className="col-12" style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="Mobile"
                                        value={mobile}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setMobile(value);
                                            }
                                        }}
                                    />
                                    {error.mobile && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.mobile}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-12" style={{ position: 'relative' }}>
                                    <button className='order-button' onClick={handlePlaceOrder}>Place Order</button>
                                    <p className='mt-1'>Your order will get delivered within 7-10 working days.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 order-md-1 order-0">
                        <div className="order-box">
                            <h3>Orders</h3>
                            <hr />
                            {data.length > 0 ? (
                                data && data.map((item, index) => {
                                    const imageUrl = item.a4Image ? getImageURL(item.a4Image) : '';
                                    return (
                                        <div key={index} className="d-flex align-items-center" style={{ background: "#fff", padding: "5px", position: "relative" }}>
                                            <button className="cancelBtn" onClick={() => removeItemById(item._id)}><RxCross2 /></button>
                                            <img src={imageUrl} alt="" />
                                            <div className="order-info mx-3">
                                                <h2>{item.name}</h2>
                                                <p className="mb-1">
                                                    <strong>Size :</strong> <span>A4</span>
                                                </p>
                                                <p><strong>Decor Number : </strong> {item.decorNumber || ''}</p>
                                                <p><strong>Decor Series : </strong> {item.decorSeries?.title || ''}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center my-3 empty-cart">
                                    <h4>No Orders Found</h4>
                                    <p>Looks like you haven't added any orders yet.</p>
                                    <button onClick={handleGoto}> Go To Products</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Order;


