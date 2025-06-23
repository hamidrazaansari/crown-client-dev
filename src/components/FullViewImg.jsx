import React, { useState } from 'react';
// import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Product1 from '../assets/image/product1.png'
import Product2 from '../assets/image/product2.png'
import Product3 from '../assets/image/product3.png'

const FullViewImg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const images = [
    Product1,
    Product2,
    Product3,
  ];

  return (
    <div>
      <img
        src={images[0]}
        alt="Thumbnail"
        onClick={() => setIsOpen(true)}
        style={{ cursor: 'pointer', width: 200 }}
      />
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
};

export default FullViewImg;
