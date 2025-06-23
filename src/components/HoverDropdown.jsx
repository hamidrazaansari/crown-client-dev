import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Link } from 'react-router-dom';

function HoverDropdown({handleNavClose}) {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => setShow(true);
  const handleMouseLeave = () => setShow(false);

  return (
    <>
      <div className='d-lg-none d-block ms-2'>
        <Dropdown.Item ><Link onClick={handleNavClose} to={'/about'}>About Us </Link> </Dropdown.Item>
        <Dropdown.Item ><Link onClick={handleNavClose} to={'/blog'}>Blog </Link></Dropdown.Item>
        <Dropdown.Item ><Link onClick={handleNavClose} to={'/environmental'}>Environment </Link></Dropdown.Item>
        <Dropdown.Item ><Link onClick={handleNavClose} to={'/certification'}>Certifications </Link></Dropdown.Item>
        <Dropdown.Item ><Link onClick={handleNavClose} to={'/catalouge'}>Catalogues </Link></Dropdown.Item>
        <Dropdown.Item ><Link onClick={handleNavClose} to={'/contact'}>Contact Us </Link></Dropdown.Item>
      </div>
      <Dropdown
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        show={show}
        className='navDropdown d-lg-flex d-none'
      >
        <Dropdown.Toggle id="dropdown-basic" className='bg-transparent border-0 text-dark'>
          MENU
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item ><Link to={'/about'}>About Us </Link> </Dropdown.Item>
          <Dropdown.Item ><Link to={'/blog'}>Blog </Link></Dropdown.Item>
          <Dropdown.Item ><Link to={'/environmental'}>Environment </Link></Dropdown.Item>
          <Dropdown.Item ><Link to={'/certification'}>Certifications </Link></Dropdown.Item>
          <Dropdown.Item ><Link to={'/catalouge'}>Catalogues </Link></Dropdown.Item>
          <Dropdown.Item ><Link to={'/contact'}>Contact Us </Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default HoverDropdown;
