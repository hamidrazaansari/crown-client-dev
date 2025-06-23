import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import '../assets/css/product-details.css'
import ShowAllProducts from '../components/ShowAllProducts'
import InquiryModal from '../components/InquiryModal'
import SampleReqModal from '../components/SampleReqModal'
import FullImageView from '../components/FullImageView'
import File from '../assets/image/file.png'
import { Link, useParams , useLocation } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utills/BaseUrl'
import OtherPageFooter from '../components/OtherPageFooter'
import getImageURL from '../utills/getImageURL';
import SelectSearch from 'react-select-search';
import { saveAs } from 'file-saver'




function ProductDetails() {    
    const location = useLocation();
    const {category , categorySlug  , categoryId ,subCategoryId  } = location.state || {};
  
    const { slug } = useParams();
    

    const [show, setShow] = useState(false);
    const [showSample, setShowSample] = useState(false);
    const [products, setProducts] = useState('')
    const [relatedProducts, setRelatedProducts] = useState('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageType, setImageType] = useState('A4');
    const [selectedSize, setSelectedSize] = useState("");
    const [matchingFinishes, setMatchingFinishes] = useState([])
    const [showAll, setShowAll] = useState(false);



    const visibleFinishes = showAll ? matchingFinishes : matchingFinishes.slice(0, 3);
    const remainingCount = matchingFinishes.length - 3;

    const sizeOptions = products.sizeFinishes?.map((item) => ({
        value: item.size.title,
        name: item.size.title,
    })) || [];

    useEffect(() => {
        if (products.sizeFinishes?.length > 0) {
            const defaultSize = products.sizeFinishes[0].size.title;
            setSelectedSize(defaultSize);
            setMatchingFinishes(products.sizeFinishes[0].finishes);
        }
    }, [products.sizeFinishes]);

    const handleSizeChange = (selectedValue) => {
        setSelectedSize(selectedValue);

        // Find the matching size object
        const selectedSizeObject = products.sizeFinishes.find(
            (item) => item.size.title === selectedValue
        );

        // Update matching finishes
        setMatchingFinishes(selectedSizeObject ? selectedSizeObject.finishes : []);
    };

    const fetchProducts = async (id, setProducts, setError, setLoading) => {
        try {
            setLoading(true); // Ensure loading starts before fetching
            const response = await axios.get(`${API_URL}/products/bySlug/${slug}`);
            setProducts(response.data.body);
        } catch (err) {
            setError("Error fetching data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!slug) return; // Prevent API call if id is undefined/null
        fetchProducts(slug, setProducts, setError, setLoading);
    }, [slug]);
    


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleSampleModleShow = () => setShowSample(true);
    const handleSampleModleClose = () => setShowSample(false);


    const imgURL = getImageURL(products.a4Image)
    const imgURLfullsheet = getImageURL(products.fullSheetImage)
    const highResolutionImage = getImageURL(products.highResolutionImage)


    // Fetch related products 

    useEffect(() => {
        async function fetchRelatedProduct() {
            try {
                const response = await axios.get(`${API_URL}/products?category=${products?.categories[0]._id}&decorSeries=${products?.decorSeries?._id}`);
                setRelatedProducts(response.data.body);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        }
        fetchRelatedProduct()
    }, [products])

    

useEffect(() => {
  const timer = setTimeout(() => {
    handleShow();
  }, 5000); // 5000 milliseconds = 5 seconds

  return () => clearTimeout(timer); // Cleanup the timeout on unmount
}, []);




    const handleDownload = () => {
        let url = highResolutionImage; 
        console.log(url);
        
        // Check if the URL is a Google Drive link
        if (url.includes("drive.google.com")) {
            const fileId = url.match(/[-\w]{25,}/); // Extract file ID
            
            if (fileId) {
                url = `https://drive.google.com/uc?export=download&id=${fileId[0]}`;
            }
        }

        let fileExtension = url.split(".").pop().split("?")[0]; // Get file extension dynamically
        saveAs(url, `${products.name}.${fileExtension}`); // Saves with correct extension
    };

    

    return (
        <div>
            <InquiryModal show={show} handleClose={handleClose} inquiryType={'PRODUCT'} productData={products} categoryId={categoryId} subCategoryId={subCategoryId}  />
            <SampleReqModal show={showSample} handleSampleModleClose={handleSampleModleClose} data={products} categoryId={categoryId} subCategoryId={subCategoryId} />

            <NavBar />
            <div className="bgWhite">
                <div className="container ">
                    <div className="breadcrumb m-0 py-3 pb-0">
                        <p>
                        <Link to="/">HOME</Link>
                        {!category ? '' : <>
                            <span> / </span>
                            <Link to={`/${categorySlug}`}  className='ms-2'>{category}</Link> 
                        </>
                        }
                       
                        <span> / </span> 
                        <span  className='ms-2'>{products?.name}</span> 

                        </p>
                    </div>
                </div>
            </div>
            <div className="product-details bgWhite py-4 pt-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            {/* <div className="img-box">


                            {/* <h3 className='image-title'>STANDARD GRADE</h3> */}
                            <div className="img-box">
                                {imageType === 'A4' ? <img src={imgURL} alt={products.name} /> : <img src={imgURLfullsheet} className='full-sheet'  alt={products.name} />}
                                {/* {imageType === 'A4' ? <div className="a4">A4</div> : <div className="a4">Full Sheet</div>} */}
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="img-ideecator" onClick={() => { setImageType('A4') }}>
                                    <img src={imgURL} alt={products.name} />
                                </div>
                                <div className="img-ideecator" onClick={() => { setImageType('full-sheet') }}>
                                    <img src={imgURLfullsheet} alt={''} />
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div className="details-product">
                                <div className="d-flex align-items-center">
                                    <h1>{products.name}
                                        <div className="line"></div>
                                    </h1>
                                    <button onClick={() => handleDownload(products.name)} className='d-flex flex-column justify-content-center align-items-center highRegImg'><img src={File} height={"21px"} alt="full screen icon" /><span>Download <br /> High Resolution File</span></button>
                                </div>
                                <div className="d-flex justify-content-start align-items-start">
                                    <p><span className='key'>Product Category</span></p>
                                    {!category ?
                                            <p>
                                            {products.categories?.map((cat) => (
                                                <div key={cat._id}>
                                                    {cat.name}
                                                </div>
                                            )
                                            )}
                                   
                                        </p>
                                        :
                                        <p>{category}</p>
                                }
                            
                                </div>
                                <div className="d-flex justify-content-start align-items-start">
                                    <p><span className='key'>Decor Number </span></p>
                                    <p><span className='ms-1 value'>{products.decorNumber}</span></p>

                                </div>

                                <div className="d-flex justify-content-start align-items-start">
                                    <p><span className='key'>Decor Series </span></p>
                                    <p><span className='ms-1 value'>{products.decorSeries?.title}</span></p>

                                </div>

                                <div className="d-flex justify-content-start align-items-start">
                                    <p><span className='key'>Size</span></p>
                                    <SelectSearch
                                        options={sizeOptions}
                                        value={selectedSize}
                                        onChange={handleSizeChange}
                                        search
                                    />
                                </div>

                                <div className="d-flex justify-content-start align-items-start">
                                    <div className="key finishkey" style={{ marginLeft: "13px" }}>Finish</div>
                                    <div className="d-flex  finish">
                                        {visibleFinishes.map((finish) => (
                                            <div key={finish._id} className="finish-item">
                                                <p>{finish.fullName}</p>
                                            </div>
                                        ))}

                                        {matchingFinishes.length > 3 && (
                                            <div className="finish-item">
                                                <p onClick={() => setShowAll(!showAll)}>
                                                    {showAll ? "See Less" : `+${remainingCount} More`}
                                                </p>
                                            </div>

                                        )}
                                    </div>
                                </div>


                                <p className='desc'>{products.sortDescriptopns}</p>

                                <div className=" mt-4">
                                    <button className='enq-btn' onClick={handleShow}>Enquire Now</button>
                                    <button className='sample-btn' onClick={handleSampleModleShow}>Sample Request</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShowAllProducts relatedProducts={relatedProducts}  categoryId={categoryId} subCategoryId={subCategoryId} productId={products._id} />
            <OtherPageFooter />
        </div>
    )
}

export default ProductDetails