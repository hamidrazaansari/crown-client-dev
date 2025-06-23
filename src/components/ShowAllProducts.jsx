import React, { useEffect, useRef } from 'react'

import '../assets/css/blog.css'
import '../assets/css/products.css'
import Slider from 'react-slick'
import Product1 from '../assets/image/product1.png'
import Product2 from '../assets/image/product2.png'
import Product3 from '../assets/image/product3.png'
import Product4 from '../assets/image/product4.png'
import Product5 from '../assets/image/product5.png'
import { Link } from 'react-router-dom'
import ScrollAnimation from 'react-animate-on-scroll';
import { GoArrowUpRight } from "react-icons/go";
import getImageURL from '../utills/getImageURL';

import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

// Custom Prev Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-prev-btn" onClick={onClick}>
      <FaArrowLeftLong />
    </button>
  );
};

// Custom Next Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="custom-next-arrow" onClick={onClick}>
      <FaArrowRightLong />
    </button>
  );
};


function ShowAllProducts({ relatedProducts, categoryId, subCategoryId, productId }) {

  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    draggable: true,
    swipe: true,
    touchMove: true,
    cssEase: "ease-in-out",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200, // Large screens
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992, // Tablets
        settings: {
          slidesToShow: 2,
          dots: false
        }
      },
      {
        breakpoint: 768, // Mobile (small screens)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };


  return (
    <div className='allProduct bgWhite'>
      <div className="container">
        <ScrollAnimation animateIn="fadeInUp">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className='mb-4'>Related Products</h2>
          </div>


        </ScrollAnimation>
        <Slider  {...settings}>
          {relatedProducts && relatedProducts.length > 0 ? (
            relatedProducts.map((product) => {
              const imgUrl = getImageURL(product.a4Image);
              if (productId === product._id) return null;
              return (
                <div key={product?._id}>
                  <Link
                    to={`/product-details/${product.slug}`}
                    state={{ categoryId, subCategoryId, slug: product.slug }}
                  >
                    <div className="product-box">
                      <img src={imgUrl} alt={product.name} />
                      <h4>{product.name}</h4>
                      <h4 className='text-start'>{product.decorNumber}</h4>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <p>Loading products...</p>
          )}
        </Slider>

      </div>
    </div>
  )
}

export default ShowAllProducts