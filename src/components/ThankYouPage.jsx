import React , {useEffect , useState} from 'react';
import check from '../assets/image/check.png'
import NavBar from './NavBar';
import OtherPageFooter from './OtherPageFooter';
import '../assets/css/cart.css'
import { useNavigate } from 'react-router-dom';


const ThankYouPage = () => {
    const [count, setCount] = useState(10); // Starting count (e.g., 20 seconds)
    const navigate = useNavigate();
  
    const handleGOtoHome =() =>{
      navigate('/');
  
    }

    useEffect(() => {
        // Start the countdown
        const timer = setInterval(() => {
          setCount((prev) => {
            if (prev > 0) {
              return prev - 1;
            } else {
              clearInterval(timer); 
              navigate('/');
              return 0; 
            }
          });
        }, 10000); // Run every 1 second
    
        // Cleanup the timer on component unmount
        return () => clearInterval(timer);
      }, [navigate]);
    return (
        <>
        <NavBar/>
                <div className='bgWhite thank-resp' style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', padding: '50px', paddingBottom:"80px" }}>
            <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', display: 'inline-block' }}>
            <div style={{ marginTop: '20px' }}>
                    <img 
                    src={check}
                        alt="Thank You" 
                        style={{ width: '100%', maxWidth: '100px' }}
                    />
                </div>
                <h1 style={{ color: '#333' , marginTop:'40px' , fontFamily:'dion' , textTransform:'uppercase', letterSpacing:"2px" }}>Thank You for Your Trust!</h1>
                <p style={{ color: '#666', fontSize: '18px' , fontFamily:'inter' }}>
                    Your journey to premium exterior compact and decorative laminates starts here. <br />
                    We appreciate your support and look forward to bringing elegance & durability to your spaces.
                </p>
                <button className='goto' onClick={handleGOtoHome}>Go To Home</button>
                <h4 className='mt-2 text-danger'>00:{String(count).padStart(2, '0')}</h4>


            </div>
        </div>
        <OtherPageFooter/>
        </>

    );
};

export default ThankYouPage;