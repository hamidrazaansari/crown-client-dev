import React, { useContext, useState , useEffect } from 'react';
import '../assets/css/navbar.css';
import CartIcon from '../assets/image/shopping-cart.png';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { CounterContext } from '../../src/context/CounterContext';
import SingInModal from '../components/SingInModal';
import { FaTrashCan } from "react-icons/fa6";
import DilevaryImg from '../assets/image/delivery.png';
import getImageURL from '../utills/getImageURL';
import { Link, useNavigate } from 'react-router-dom';
import { BsCart3 } from "react-icons/bs";
import Product1 from '../assets/image/product1.png'
import { Modal, Button } from 'react-bootstrap';
import EmptyCart from '../assets/image/cart-empty.png'
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import { ToastContainer } from 'react-toastify';



function Cart() {
  const { count, data, removeItemById } = useContext(CounterContext);
  const [showSignin, setShowSignin] = useState(false);
  const [show, setShow] = useState(false);
  const [showAll, setShowAll] = useState(false);

      const [category, setCategory] = useState('');
  
          useEffect(() => {
              const fetchData = async () => {
                  try {
                      const response = await axios.get(`${API_URL}/categories`);
                      setCategory(response.data.body[0]);
                  } catch (err) {
                      console.error(err);
                  }
              };
      
              fetchData();
          }, []);

  
  const sizes = data.sizes || [];
  const visibleSizes = showAll ? sizes : sizes.slice(0, 3);
  const remainingCount = sizes.length - 3;

  const navigate = useNavigate();

  const handleSigninModleShow = () => setShowSignin(true);
  const handleSigninModleClose = () => setShowSignin(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckOut = () => {
    const id = '67ac948d62526b6099c37b59';
    if (count === 0) {
      navigate('/products', { state: id });
    } else {
      navigate('/order');
    }
    handleClose(); // Close modal on checkout
  };

  const hasItems = data.length > 0;

  return (
    <div>
      
      <SingInModal show={showSignin} handleSigninModleClose={handleSigninModleClose} />
      <div className='cart'>
        <div onClick={handleShow} className='cart-btn'>
          <BsCart3 />
          {count > 0 && <span className='cart-indecator'>{count}</span>}
        </div>

        <Modal className="cart-modal" show={show} onHide={handleClose}>
          <Modal.Body>
            {hasItems && <h3>Cart</h3>}
            {hasItems && (
              <div className="header d-flex">
                <h5 className='me-3'>Product Image</h5>
                <h5>Details</h5>
              </div>
            )}

            {hasItems ? (
              data.map((item) => {
                const imageUrl = item.a4Image ? getImageURL(item.a4Image) : Product1;

                return (
                  <div className="new-cart" key={item._id}>
                    <div className="d-flex align-items-center justify-content-between added-product">
                      <div className="d-flex">
                        <img src={imageUrl} alt="product" className="product-img" />
                        <div className='ms-2'>
                          <h4>{item.name || ''}</h4>
                          <p className="mb-1">
                                <strong>Size :</strong> <span>A4</span>
                          </p>    
                          <p><strong>Decor Number : </strong> {item.decorNumber || ''}</p>
                          <p><strong>Decor Series : </strong> {item.decorSeries?.title || ''}</p>
 
                        </div>
                      </div>
                      <div className='d-flex flex-column align-items-end justify-content-end'>
                        <button className="cart-dlt-btn" onClick={() => removeItemById(item._id)}>
                          <span className='me-1'><FaTrashCan /></span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className='d-flex align-items-center justify-content-center flex-column emptyCart pt-4'>
                <img src={EmptyCart} alt="Empty Cart" height={"115px"} />
                <p className='text-center my-3'>Your cart is currently empty. Start adding products</p>
                <Link className='cart-btn' onClick={handleClose} to={`/${category?.slug}`}>Add Product</Link>
              </div>
            )}

            {hasItems && <button className="chekout-btn float-end" onClick={handleCheckOut}>Checkout</button>}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default Cart;
