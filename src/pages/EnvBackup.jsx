import React from 'react'
import NavBar from '../components/NavBar'
import '../assets/css/environmental.css'
import { MdKeyboardArrowDown } from "react-icons/md";
import AboutEnv from '../assets/image/AboutEnv.png'
import Commitment1 from '../assets/image/envcommit1.png'
import Commitment2 from '../assets/image/envcommit2.png'
import Commitment3 from '../assets/image/envcommit3.png'
import Timer from '../assets/image/timer.png'
import Fectory from '../assets/image/fectory.png'
import Trash from '../assets/image/trash.png'
import Footer from '../components/Footer';

export default function Env() {
  return (
    <div>
      <NavBar/>
      <div className="Environmental-banner">
        <div className="env-contents">
          <h1>RESPONSIBLE DECISIONS, SUSTAINABLE SOLUTIONS, HEALTHY PLANET</h1>
          <button>Learn More <MdKeyboardArrowDown/></button>
        </div>
      </div>

      <div className='envoirementabout'>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 d-flex align-items-center justify-content-lg-end justify-content-center">
              <img src={AboutEnv} alt="about env" />
            </div>
            <div className="col-lg-6 ">
              <h2>Enviroment</h2>
              <h3>Conservation is inbuilt in our ethors. Our efforts have always been channelized in a way that we effectively contribute to better communities we inhabit.</h3>
              <p>Our products comply to all standards and certifications which are towards conservation and restoration of forests and plantations.we are committed to reduction of wastages, optimisation of resources in a mannner that we produce the best with the least</p>
              <p>The intent has been larger, the belief has been firm that together we will make a difference to not only the environment but also to our people, processes and strength it further</p>
            </div>
          </div>
        </div>
      </div>

      <div className="commitment">
        <div className="container">
          <h2 className='commit-heading'>Crown Commitiments To A Better Future</h2>
          <div className="row px-4 mt-5">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="commitment-card">
                <img src={Commitment1} alt="Commitment" />
                <h3>Smarter Production</h3>
                <p>Wheather its`s increasing energy efficiency in manufacturing or sourcing natural resources responsibly and economically we strive to make smart descisions that lead to smarter susutainability</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="commitment-card">
                <img src={Commitment2} alt="" />
                <h3>Smarter Use</h3>  
                <p>We develop our products to ensure the health and safety of evryone who comes into contact with them.We work on continuous improvements to keep the environmental impacts as low as possible</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="commitment-card">
                <img src={Commitment3} alt="" />
                <h3>Smarter Disposal</h3>  
                <p>Our environmentally friendly waste management concept is designed to provide you with robust solutions to optimize the disposal of our products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="passports">
        <div className="container">
          <h2>Environmental Passports</h2>
          <p>Our environmental passports have been developed as an integral part of our transparent, global approach to sustainability to help you meet the environmental requirements of your projects.</p>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 d-flex align-items-center justify-content-center">
              <button className='button'>Comfort and health</button>
            </div>
            <div className="col-lg-4 col-md-6 col-12 d-flex align-items-center justify-content-center">
              <button className='button' style={{background:"#6E9661"}}>Natural Raw materials</button>
            </div>
            <div className="col-lg-4 col-md-6 col-12 d-flex align-items-center justify-content-center">
              <button className='button'style={{background:"#D4D177"}}>optimiized life cycle</button>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12 d-flex align-items-center justify-content-center">
              <div className="optmization-box">
                <img src={Timer} alt="Life" />
                <p>Life</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 d-flex align-items-center justify-content-center">
              <div className="optmization-box">
                <img src={Fectory} alt="Fectory" />
                <p>Energy Recovery</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 d-flex align-items-center justify-content-center">
              <div className="optmization-box">
                <img src={Trash} alt="Trash" />
                <p>Waste Recycle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="csr">
        <div className="container">
          <h2>CSR</h2>
          <p>As the saying goes, “A single step for man is a giant leap for mankind.”</p>
          <p>Balance is the crux of our responsibilities. We strive to do our best for the coexistence of
all communities we inhabit. Our initiatives towards health and education since the beginning
have remain unchanged as we believe that this is the least which we can do to better life
and existence.</p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

 










