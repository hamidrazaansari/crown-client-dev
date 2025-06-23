import React, { useEffect, useRef, useState } from "react";
import "../assets/css/footer.css";
import { Link } from "react-router-dom";
import FooterImg from '../assets/image/Request-a-quote.jpg'
import { GoArrowUpRight } from "react-icons/go";
import InquiryModal from "./InquiryModal";
import Footer from "./Footer";

function OtherPageFooter() {

  const [show, setShow] = useState(false)


  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div>
      <InquiryModal show={show} handleClose={handleClose} inquiryType={'GENERAL'} />

      <div>
        <div className="explore">
          <h2 style={{textTransform:"capitalize"}}>ARE YOU READY TO REDEFINE SURFACES WITH OUR INNOVATIVE, NEXT GEN LAMINATES?</h2>
          {/* <p>we are always working hard and trying to make the best for you</p> */}
          <button onClick={handleShow}>Request a Quote <GoArrowUpRight /></button>
        </div>
        <div className="footer-background">
          <img src={FooterImg} alt="footer image"  />
        </div>
        <div className="newFooter">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default OtherPageFooter