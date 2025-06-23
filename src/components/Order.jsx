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
import { State, City } from 'country-state-city';
import CountryStateCity from './CountryStateCity';


function Order() {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [locality, setLocality] = useState('');
    const [pincode, setPincode] = useState('');
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

        const [country, setCountry] = useState('');
        const [currentState, setCurrentState] = useState('');
        const [currentCity, setCurrentCity] = useState('');
        


    // const [values, setValues] = useState({
    //     country: "",
    //     state: "",
    //     city: "",
    // })


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
                city : currentCity.name,
                state : currentState.name,
                country: country.name,
                pincode,
            });

            toast.success(response.data.message);
            clearCart();
            navigate('/thank-you');
        } catch (error) {
            console.log(error);
            const errorData = error.response?.data?.errors || {};
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

        navigate("/exterior-laminate");
    };

    // const countries = [
    //     { label: "Afghanistan", value: "AF" },
    //     { label: "Aland Islands", value: "AX" },
    //     { label: "Albania", value: "AL" },
    //     { label: "Algeria", value: "DZ" },
    //     { label: "American Samoa", value: "AS" },
    //     { label: "Andorra", value: "AD" },
    //     { label: "Angola", value: "AO" },
    //     { label: "Anguilla", value: "AI" },
    //     { label: "Antarctica", value: "AQ" },
    //     { label: "Antigua and Barbuda", value: "AG" },
    //     { label: "Argentina", value: "AR" },
    //     { label: "Armenia", value: "AM" },
    //     { label: "Australia", value: "AU" },
    //     { label: "Austria", value: "AT" },
    //     { label: "Azerbaijan", value: "AZ" },
    //     { label: "Bahamas", value: "BS" },
    //     { label: "Bahrain", value: "BH" },
    //     { label: "Bangladesh", value: "BD" },
    //     { label: "Barbados", value: "BB" },
    //     { label: "Belarus", value: "BY" },
    //     { label: "Belgium", value: "BE" },
    //     { label: "Belize", value: "BZ" },
    //     { label: "Benin", value: "BJ" },
    //     { label: "Bermuda", value: "BM" },
    //     { label: "Bhutan", value: "BT" },
    //     { label: "Bolivia", value: "BO" },
    //     { label: "Bosnia and Herzegovina", value: "BA" },
    //     { label: "Botswana", value: "BW" },
    //     { label: "Brazil", value: "BR" },
    //     { label: "British Indian Ocean Territory", value: "IO" },
    //     { label: "Brunei Darussalam", value: "BN" },
    //     { label: "Bulgaria", value: "BG" },
    //     { label: "Burkina Faso", value: "BF" },
    //     { label: "Burundi", value: "BI" },
    //     { label: "Cambodia", value: "KH" },
    //     { label: "Cameroon", value: "CM" },
    //     { label: "Canada", value: "CA" },
    //     { label: "Cape Verde", value: "CV" },
    //     { label: "Central African Republic", value: "CF" },
    //     { label: "Chad", value: "TD" },
    //     { label: "Chile", value: "CL" },
    //     { label: "China", value: "CN" },
    //     { label: "Colombia", value: "CO" },
    //     { label: "Comoros", value: "KM" },
    //     { label: "Congo", value: "CG" },
    //     { label: "Congo, The Democratic Republic of the", value: "CD" },
    //     { label: "Costa Rica", value: "CR" },
    //     { label: "Croatia", value: "HR" },
    //     { label: "Cuba", value: "CU" },
    //     { label: "Cyprus", value: "CY" },
    //     { label: "Czech Republic", value: "CZ" },
    //     { label: "Denmark", value: "DK" },
    //     { label: "Djibouti", value: "DJ" },
    //     { label: "Dominica", value: "DM" },
    //     { label: "Dominican Republic", value: "DO" },
    //     { label: "Ecuador", value: "EC" },
    //     { label: "Egypt", value: "EG" },
    //     { label: "El Salvador", value: "SV" },
    //     { label: "Equatorial Guinea", value: "GQ" },
    //     { label: "Eritrea", value: "ER" },
    //     { label: "Estonia", value: "EE" },
    //     { label: "Eswatini", value: "SZ" },
    //     { label: "Ethiopia", value: "ET" },
    //     { label: "Fiji", value: "FJ" },
    //     { label: "Finland", value: "FI" },
    //     { label: "France", value: "FR" },
    //     { label: "Gabon", value: "GA" },
    //     { label: "Gambia", value: "GM" },
    //     { label: "Georgia", value: "GE" },
    //     { label: "Germany", value: "DE" },
    //     { label: "Ghana", value: "GH" },
    //     { label: "Greece", value: "GR" },
    //     { label: "Grenada", value: "GD" },
    //     { label: "Guatemala", value: "GT" },
    //     { label: "Guinea", value: "GN" },
    //     { label: "Guinea-Bissau", value: "GW" },
    //     { label: "Guyana", value: "GY" },
    //     { label: "Haiti", value: "HT" },
    //     { label: "Honduras", value: "HN" },
    //     { label: "Hungary", value: "HU" },
    //     { label: "Iceland", value: "IS" },
    //     { label: "India", value: "IN" },
    //     { label: "Indonesia", value: "ID" },
    //     { label: "Iran", value: "IR" },
    //     { label: "Iraq", value: "IQ" },
    //     { label: "Ireland", value: "IE" },
    //     { label: "Israel", value: "IL" },
    //     { label: "Italy", value: "IT" },
    //     { label: "Jamaica", value: "JM" },
    //     { label: "Japan", value: "JP" },
    //     { label: "Jordan", value: "JO" },
    //     { label: "Kazakhstan", value: "KZ" },
    //     { label: "Kenya", value: "KE" },
    //     { label: "Kuwait", value: "KW" },
    //     { label: "Kyrgyzstan", value: "KG" },
    //     { label: "Laos", value: "LA" },
    //     { label: "Latvia", value: "LV" },
    //     { label: "Lebanon", value: "LB" },
    //     { label: "Lesotho", value: "LS" },
    //     { label: "Liberia", value: "LR" },
    //     { label: "Libya", value: "LY" },
    //     { label: "Liechtenstein", value: "LI" },
    //     { label: "Lithuania", value: "LT" },
    //     { label: "Luxembourg", value: "LU" },
    //     { label: "Madagascar", value: "MG" },
    //     { label: "Malawi", value: "MW" },
    //     { label: "Malaysia", value: "MY" },
    //     { label: "Maldives", value: "MV" },
    //     { label: "Mali", value: "ML" },
    //     { label: "Malta", value: "MT" },
    //     { label: "Mexico", value: "MX" },
    //     { label: "Moldova", value: "MD" },
    //     { label: "Monaco", value: "MC" },
    //     { label: "Mongolia", value: "MN" },
    //     { label: "Morocco", value: "MA" },
    //     { label: "Mozambique", value: "MZ" },
    //     { label: "Myanmar", value: "MM" },
    //     { label: "Namibia", value: "NA" },
    //     { label: "Nepal", value: "NP" },
    //     { label: "Netherlands", value: "NL" },
    //     { label: "New Zealand", value: "NZ" },
    //     { label: "Nigeria", value: "NG" },
    //     { label: "Norway", value: "NO" },
    //     { label: "Oman", value: "OM" },
    //     { label: "Pakistan", value: "PK" },
    //     { label: "Panama", value: "PA" },
    //     { label: "Peru", value: "PE" },
    //     { label: "Philippines", value: "PH" },
    //     { label: "Poland", value: "PL" },
    //     { label: "Portugal", value: "PT" },
    //     { label: "Qatar", value: "QA" },
    //     { label: "Romania", value: "RO" },
    //     { label: "Russia", value: "RU" },
    //     { label: "Saudi Arabia", value: "SA" },
    //     { label: "Singapore", value: "SG" },
    //     { label: "South Africa", value: "ZA" },
    //     { label: "Spain", value: "ES" },
    //     { label: "Sri Lanka", value: "LK" },
    //     { label: "Sweden", value: "SE" },
    //     { label: "Switzerland", value: "CH" },
    //     { label: "Thailand", value: "TH" },
    //     { label: "Turkey", value: "TR" },
    //     { label: "United Arab Emirates", value: "AE" },
    //     { label: "United Kingdom", value: "GB" },
    //     { label: "United States", value: "US" }
    // ];

    // const states = values.country
    //     ? State.getAllStates().filter((state) => state.countryCode === values.country)
    //     : [];

    // const cities = values.state
    //     ? City.getAllCities().filter((city) => city.stateCode === values.state)
    //     : [];



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
                                    <div className='d-flex flex-column country'>
                                        <CountryStateCity setCountry={setCountry} country={country} currentCity={currentCity} setCurrentCity={setCurrentCity} currentState={currentState} setCurrentState={setCurrentState} error={error}  />                                       

                                        {/* <Select
                                            options={countries}
                                            onChange={(option) => {
                                                // setFieldValue("country", option.value);
                                                // setFieldValue("state", null);
                                                // setFieldValue("city", null);
                                                setValues((old) => { return { ...old, country: option.value } })
                                                setCountry(option.label)
                                            }}
                                            value={countries.find((c) => c.value === values.country) || null}
                                            placeholder="Select Country"
                                        />
                                      */}
                                    </div>
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
                                <div className="col-lg-8" style={{ position: 'relative' }}>
                                    <input type="text" placeholder='Apartment, suite, etc. (Optional)' onChange={(e) => setLocality(e.target.value)} />
                                    {error.locality && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.locality}
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
                            <div className="row" >

                                {/* <div className="col-lg-4 state" style={{ position: 'relative' }}>
                                    <Select
                                        options={states.map((s) => ({ label: s.name, value: s.isoCode }))}
                                        onChange={(option) => {
                                            setValues((old) => ({ ...old, state: option.value }));
                                            setState(option.label); // Optional: to store readable name
                                        }}
                                        value={
                                            states
                                                .map((s) => ({ label: s.name, value: s.isoCode }))
                                                .find((s) => s.value === values.state) || null
                                        }
                                        placeholder="Select State"
                                        isDisabled={!values.country}
                                        className="mt-2"
                                    />
                                    {error.state && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.state}
                                        </div>
                                    )}
                                </div>
                                <div className="col-lg-4  " style={{ position: 'relative' }}>

                                    <Select
                                        options={cities.map((c) => ({ label: c.name, value: c.name }))}
                                        onChange={(option) => {
                                            setValues((old) => ({ ...old, city: option.value }));
                                            setCity(option.label);
                                        }}
                                        value={
                                            cities
                                                .map((c) => ({ label: c.name, value: c.name }))
                                                .find((c) => c.value === values.city) || null
                                        }
                                        placeholder="Select City"
                                        isDisabled={!values.state}
                                        className="mt-2"
                                    />
                                    {error.city && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                            {error.city}
                                        </div>
                                    )}
                                </div> */}

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


