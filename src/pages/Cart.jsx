// import React, { useContext, useState } from 'react';
// import '../assets/css/navbar.css';
// import { CounterContext } from '../../src/context/CounterContext';
// import { Link, useNavigate } from 'react-router-dom';
// import Product1 from '../assets/image/product1.png'
// import NavBar from '../components/NavBar'
// import OtherPageFooter from '../components/OtherPageFooter'
// import EmptyCart from '../assets/image/cart-empty.png'
// import '../assets/css/cart.css'



// function Cart() {
//   const { count, data, clearCheckedData, toggleItemChecked, removeItemById } = useContext(CounterContext);
//   const [showSignin, setShowSignin] = useState(false);
//   const navigate = useNavigate();

//   const handleSigninModleShow = () => setShowSignin(true);
//   const handleSigninModleClose = () => setShowSignin(false);

//   console.log(data);
  

//   const handleCheckOut = () => {
//     if (count === 0) {
//       return
//     }
//     else {
//       navigate('/order', { state: data })
//     }
//   }

//   return (
//     <div>
//        <NavBar/>
//       {data && data.length > 0 ? <></> :

//         <>
//           <div className="cart-page bgWhite">
//             <div className="container ">
//               <div className="row">
//                 <div className="col-12">
//                   {/* <h2>Cart</h2> */}
//                   <div className="cart-box">
//                     <img src={EmptyCart} alt="Empty Cart " />
//                     <p>Your cart is currently empty. Start adding  the products</p>
//                     <button className='product-btn'>Add Product</button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       }

// <OtherPageFooter/>
//     </div>
//   )
// }

// export default Cart;
