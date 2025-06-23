import Modal from 'react-bootstrap/Modal';
import 'react-select-search/style.css';
import '../assets/css/samplemodal.css'
import { BsCart3 } from "react-icons/bs";
import { CounterContext } from '../context/CounterContext';
import { useContext } from 'react';
import { RxCross1 } from 'react-icons/rx';
import getImageURL from '../utills/getImageURL';
import Product1 from '../assets/image/product1.png'
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';



function SampleReqModal({ show, handleSampleModleClose, data, categoryId, subCategoryId }) {
    const [showAll, setShowAll] = useState(false);

    const sizes = data.sizes || [];
    const visibleSizes = showAll ? sizes : sizes.slice(0, 3);
    const remainingCount = sizes.length - 3;

    const { addData } = useContext(CounterContext);
    const handeAddToCart = () => {
        addData(data, categoryId, subCategoryId);
        handleSampleModleClose();
    }

    const imageUrl = data.a4Image ? getImageURL(data.a4Image) : '';


    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleSampleModleClose}>
                <button className='closeButton sample-modal-close' onClick={handleSampleModleClose}><RxCross1 /> </button>
                <div className='Sample-modal'>
                    <div className="sample-box">
                        <div className="d-flex">
                            <div className="img-box">
                                <img src={imageUrl} alt={data.name} />
                            </div>
                            <div className="content">
                                <h3>ORDER A SAMPLE</h3>
                                <h2>{data.name}</h2>
                                <p className="mb-1">
                                    <strong>Size :</strong> <span>A4</span>
                                </p>
                                <p className="mb-1">
                                    <strong>Decor Number :</strong> <span>{data?.decorNumber}</span>
                                </p>
                                <p className="mb-1">
                                    <strong>Decor Series :</strong> <span>{data?.decorSeries?.title}</span>
                                </p>
                                <button onClick={handeAddToCart}><span><BsCart3 /></span> Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>

    );
}

export default SampleReqModal;
