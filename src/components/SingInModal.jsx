import Modal from 'react-bootstrap/Modal';
import 'react-select-search/style.css';  
import '../assets/css/samplemodal.css'
import google from '../assets/image/google.png'
import { Link } from 'react-router-dom';


function SingInModal({ show, handleSigninModleClose }) {

  return (
      <Modal show={show} onHide={handleSigninModleClose}>
        <div className='Signin-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className="sign-in">
                <h2>Sign In</h2>
                <div className="google-box">
                    <img src={google} alt="" />
                    <p>Sign in with Google</p>
                </div>
                <div className='or'>
                    <span></span>
                    <p>OR Continue With Email</p>
                    <span></span>
                </div>
                <div className="input">
                    <label htmlFor="email">Email address <span>*</span></label>
                    <input type="text" id='email' className='input-field' />
                </div>
                <div className="input">
                    <label htmlFor="email">password <span>*</span> </label>
                    <input type="text" id='email' className='input-field' />
                </div>
                <div className="others">
                <label>Forgot Your Password?</label>
                <p>By creating an account you agree with our <Link to="/"> Terms of service, Privacy Policy,</Link>
                and our default <Link to={''}> Notification Settings. </Link></p>
                <button>Sign In</button>
                <h5>Don`t have an account? <span>Sign Up</span></h5>
                </div>

            </div>
        </Modal.Body>


        </div>
    </Modal>
  );
}

export default SingInModal;
