import React , {useState , useEffect} from 'react'
import '../assets/css/hero.css'
import Slider from 'react-slick';

import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
function Hero() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/carousels`);
          setData(response.data.body);
        } catch (err) {
          setError('Error fetching data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <>
    <section className='banner-section'>
        <Slider {...settings}>
            {data && data.map((crouseles)=>{
             const imageUrl = crouseles.image ? crouseles.image.replace('http://localhost:5000', 'http://13.233.121.43:5000') : '';

                return(
                    <div className="banner">
                  <img src={imageUrl} alt={crouseles.title} />
                  <div className="texts">
                        <h2>{crouseles.title}</h2>
                        <p>{crouseles.subTitle}</p>
                        <button>Explore Now</button>
                    </div>
                </div>
                )
            })}

        </Slider>
    </section>
    </>
  )
}

export default Hero