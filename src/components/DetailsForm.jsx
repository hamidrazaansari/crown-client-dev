import React from 'react';
import '../assets/css/details.css';
import HandShake from '../assets/image/handShake.png';
import SelectSearch from 'react-select-search';  // Import the correct component
import 'react-select-search/style.css';  // Add default styles if needed
import ScrollAnimation from 'react-animate-on-scroll';

function DetailsForm() {
    const options = [
        { name: 'India', value: 'India', type: 'country' },
        { name: 'United States', value: 'United States', type: 'country' },
        { name: 'Canada', value: 'Canada', type: 'country' },
        { name: 'United Kingdom', value: 'United Kingdom', type: 'country' },
        { name: 'Australia', value: 'Australia', type: 'country' },
        { name: 'Germany', value: 'Germany', type: 'country' },
        { name: 'France', value: 'France', type: 'country' },
        { name: 'Spain', value: 'Spain', type: 'country' },
        { name: 'Sweden', value: 'Sweden', type: 'country' },
        { name: 'Japan', value: 'Japan', type: 'country' },
        { name: 'China', value: 'China', type: 'country' },
        { name: 'Russia', value: 'Russia', type: 'country' }
    ];

    return (
        <div className='details'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="info">
                        <ScrollAnimation animateIn="fadeInUp">
                            <h2>Let's Get in <span>Touch!</span></h2>
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="fadeInUp">
                            <p>Have a question or need assistance? Reach out to us via email.</p>
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="fadeInUp">
                            <img src={HandShake} alt="hand shake image" />
                            </ScrollAnimation>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form">
                        <ScrollAnimation animateIn="fadeInUp">
                            <h4>Fill The Details</h4>
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="fadeInUp">
                            <div className='d-flex flex-column'>
                                <label htmlFor="country">Country</label>
                                <SelectSearch
                                    search
                                    options={options}
                                    name="language"
                                />
                            </div>
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="fadeInUp"></ScrollAnimation>
                            <div className='d-flex flex-column'>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" />
                            </div>
                            <div className='d-flex flex-column'>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" />
                            </div>
                            <div className='d-flex flex-column'>
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" id="phone" />
                            </div>

                            <button className='form-btn'>Enquiry Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsForm;
