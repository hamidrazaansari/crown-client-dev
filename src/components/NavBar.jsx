import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../assets/css/navbar.css'
import Logo from '../assets/image/logo.png'
import { Link } from 'react-router-dom';
import Cart from './Cart';
import SearchBar from './SearchBar';
import NavModal from './NavModal';
import { Nav } from 'react-bootstrap';
import IndianFlag from '../assets/image/indian-flag.png'
import JapanFlag from '../assets/image/japan-flag.png'
import UsFlag from '../assets/image/us-flag.png'
import Offcanvas from 'react-bootstrap/Offcanvas';
import HoverDropdown from './HoverDropdown';
import { FaBars } from "react-icons/fa";



function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleNavClose = () => setShowNav(false);
  const handleShowNav = () => setShowNav(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);


  return (
    <>
      {/* sidebar for country language select  */}
      {/* <Offcanvas show={show} placement={'end'} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Select Your Language</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className='countries'>
            <li>
              <img src={IndianFlag} alt="Indian Flag" />
              Hindi
            </li>
            <li>
              <img src={JapanFlag} alt="Japan Flag" />
              Japani
            </li>
            <li>
              <img src={UsFlag} alt="US Flag" />

              English US
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas> */}

      {showModal && <NavModal onClose={closeModal} />}

      <Navbar expand="lg" className="navbar sticky-top d-flex justify-content-between align-items-center">
        <>
          <Navbar.Brand >
            <Link to={'/'}>
              <img src={Logo} alt="Crown logo" />
            </Link>
          </Navbar.Brand>

          <div className="d-flex justify-content-between align-items-center navbar-resp" style={{ position: "relative" }}>
            <SearchBar />

            <div className='d-lg-flex align-items-center d-none'>

              <Nav.Item href="/">
                {/* <Link onMouseEnter={openModal}>Products</Link> */}
                <NavModal />
              </Nav.Item>

              <Nav.Item href="/">
                <HoverDropdown />
              </Nav.Item>

              <Cart />

              {/* <Nav.Item href="/">
                <Link onClick={handleShow}>
                  < img src={IndianFlag} alt="Indian  Flag" className='flagImg' />
                </Link>
              </Nav.Item> */}
            </div>
            {/* Add Toggle Button for Mobile View */}
            <div className='d-lg-none d-block' >
              <Cart />
            </div>

            <button onClick={handleShowNav} className='bar d-lg-none d-block' > <FaBars /> </button>

            <Offcanvas show={showNav} placement={'end'} onHide={handleNavClose} className='nav-col  d-lg-none d-block'>
              <Offcanvas.Body>
                <div className="d-flex justify-content-center align-items-center flex-column  w-100 ">
                  <div className="d-flex justify-center-between">
                    {/* <Nav.Item>
                      <Link onClick={handleShow}>
                        <img src={IndianFlag} alt="Indian Flag" className='flagImg' />
                      </Link>
                    </Nav.Item> */}
                  </div>
                  <div className='d-flex align-items-md-center align-items-start flex-column'>
                    <Nav.Item>
                      <HoverDropdown handleNavClose={handleNavClose} />
                    </Nav.Item>
                    <Nav.Item>
                      <NavModal handleNavClose={handleNavClose} />
                    </Nav.Item>
                  </div>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        </>
      </Navbar>
    </>

  );
}

export default NavBar;