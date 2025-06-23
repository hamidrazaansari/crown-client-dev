import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/category.css';
import Category1 from '../assets/image/category1.png';
import { BsArrowDownRight } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import { API_URL } from '../utills/BaseUrl';

function Category2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setData(response.data.body);
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    const navigate = useNavigate();

  const handleOpen = (id)=>{
    navigate('/products' , {state: id})
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='Category'>
      <div className="container">
        <ScrollAnimation animateIn="fadeInUp">
          <h2 className='category-heading'>Category</h2>
        </ScrollAnimation>
        <div className="row mt-5">
          {data && data.map((category ,  ind) => {
            // Split the textOverImage into first and second word inside map
            const [firstWord, secondWord] = category.textOverImage.split(' ');
            const imageUrl = category.image ? category.image.replace('http://localhost:5000', 'http://13.233.121.43:5000') : '';

            
            return (
              <div className="col-lg-4 col-sm-6 col-12 d-flex justify-content-end flex-column" key={category._id}>
                <ScrollAnimation animateIn="fadeInUp">
                  <div className="category-box box-1">
                  <img src={imageUrl} alt={category.name} />
                  <p>{category.textOverImage}</p>
                      <button className='explore-btn' onClick={()=> handleOpen(category._id)}>Explore <BsArrowDownRight /> </button>
                  </div>
                </ScrollAnimation>
                <div className="category-text d-flex">
                  <ScrollAnimation animateIn="fadeInUp">
                    <div className='number'>0{ind + 1}</div>
                  </ScrollAnimation>
                  <ScrollAnimation animateIn="fadeInUp">
                    <div>
                      <h3>{firstWord}</h3>
                      <p>{secondWord}</p>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Category2;
