import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../assets/css/products.css";
import { Accordion } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_URL } from "../utills/BaseUrl";
import axios from "axios";
import Img from "../assets/image/aqua-wall.png";

import OtherPageFooter from "../components/OtherPageFooter";
import Product1 from "../assets/image/product1.png";
import getImageURL from "../utills/getImageURL";
import { FaFilter } from "react-icons/fa6";
import parse from 'html-react-parser'

import { RxCross2 } from "react-icons/rx";
import { Offcanvas } from "react-bootstrap";


function Application() {
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [decorSeries, setDecorSeries] = useState([]);
  const [finishes, setFinishes] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedFinish, setSelectedFinish] = useState([]);
  const [selectedDecor, setSelectedDecor] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [catHeader, setCatHeader] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const location = useLocation();
  const categoryId = location.state;
  const { subCategorySlug } = useParams();

  const [pagination, setPagination] = useState({
    page: 1,
    totalRecords: null,
    totalPages: null,
  });
  const [decorNumber, setDecorNumber] = useState();

  useEffect(() => {
    async function fetchProduct() {
      try {
        let url = `${API_URL}/products?subCategorySlug=${subCategorySlug}&limit=${60}&page=${pagination.page
          }`;

        if (decorNumber) {
          url += `&decorNumber=${decorNumber}`;
        }
        if (selectedDecor.length) {
          for (let decor of selectedDecor) {
            url += `&decorSeries=${decor}`;
          }
        }

        if (selectedSizes.length) {
          for (let size of selectedSizes) {
            url += `&sizes=${size}`;
          }
        }

        const response = await axios.get(url);
        setPagination({
          page: Number(response.data.page),
          totalRecords: Number(response.data.totalRecords),
          totalPages: Number(response.data.totalPages),
        });
        setProducts(response.data.body);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [
    subCategorySlug,
    pagination.page,
    decorNumber,
    selectedSizes,
    selectedDecor,
  ]);

  useEffect(() => {
    setSelectedSizes([]);
    setSelectedDecor([]);
    setSelectedFinish([]);
  }, [subCategorySlug])



  useEffect(() => {
    async function fetchSubCategory() {
      try {
        let url = `${API_URL}/subCategories?limit=0&slug=${subCategorySlug}`;
        const response = await axios.get(url);
        setSubCategory(response?.data?.body[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSubCategory()
  }, [subCategorySlug]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sizesRes, decorRes, finishesRes] =
          await Promise.all([
            axios.get(`${API_URL}/sizes?priority=ASC&limit=0&status=true`),
            axios.get(`${API_URL}/decorSeries?priority=ASC&limit=0&status=true`),
            axios.get(`${API_URL}/finishes`),
          ]);
        setSizes(sizesRes.data.body);
        setDecorSeries(decorRes.data.body);
        setFinishes(finishesRes.data.body);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subCategorySlug]);

  // **Handle Multi-Select Size Filter**
  const handleSizeFilter = (sizeId) => {
    setSelectedSizes((prev) =>
      prev.includes(sizeId)
        ? prev.filter((id) => id !== sizeId)
        : [...prev, sizeId]
    );
  };
  const handleDecorFilter = (sizeId) => {
    setSelectedDecor((prev) =>
      prev.includes(sizeId)
        ? prev.filter((id) => id !== sizeId)
        : [...prev, sizeId]
    );
  };

  const handleFinishFilter = (finishId) => {
    setSelectedFinish((prev) =>
      prev.includes(finishId)
        ? prev.filter((id) => id !== finishId)
        : [...prev, finishId]
    );
  };

  function handlePrevious() {
    if (pagination.page > 1) {
      setPagination((old) => {
        return { ...old, page: old.page - 1 };
      });
    }
  }

  function handleNext() {
    if (pagination.page < pagination.totalPages) {
      setPagination((old) => {
        return { ...old, page: old.page + 1 };
      });
    }
  }

  const bannerImg = getImageURL(subCategory?.listingImage)



  return (
    <div>
      <NavBar />
      <Offcanvas className={'productlisting-Sidebar'} placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Body>
          <div className={`sidebar`}>
            <button className="w-25 float-end border-0 sidebar-cancel-btn" onClick={handleClose}> <RxCross2 /> </button>
            <h3>Search by decor code</h3>
            <input
              type="text"
              placeholder="search"
              className="search"
              value={decorNumber}
              onChange={(e) => setDecorNumber(e.target.value)}
            />

            {/* Size Filter */}
            <h3 className="mt-3">FILTER BY SIZE</h3>
            <div className="row">
              {sizes.map((size) => (
                <div className="col-6" key={size._id}>
                  <button
                    onClick={() => handleSizeFilter(size._id, size.title)}
                    className={
                      selectedSizes.includes(size._id) ? "active-btn" : ""
                    }
                  >
                    {size.title}
                  </button>
                </div>
              ))}
            </div>

            <h3 className="mt-3">FILTER BY Decor Series</h3>
            <div className="row">
              {decorSeries.map((type) => (
                <div className="col-6" key={type._id}>
                  <button
                    onClick={() => handleDecorFilter(type._id)}
                    className={
                      selectedDecor == type._id ? "active-btn" : ""
                    }
                  >
                    {type.title}
                  </button>
                </div>
              ))}
            </div>

            {/* Other Filters */}
            {/* <h3 className="mt-3">FILTER BY FINISHES</h3>
                <div className="row">
                  {finishes.map((finish) => (
                    <div className="col-6" key={finish._id}>
                      <button
                        onClick={() => handleFinishFilter(finish._id)}
                        className={
                          selectedFinish.includes(finish._id)
                            ? "active-btn"
                            : ""
                        }
                      >
                        {finish.fullName}
                      </button>
                    </div>
                  ))}
                </div> */}

            <button className="bg-light text-dark fw-bold" style={{ fontFamily: "inter" }} onClick={handleClose} disabled={!selectedDecor && !selectedSizes}>Apply</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="bgWhite py-4">
        <div className="container">
          <div className="breadcrumb mb-0">
            <p className="mb-0">
              <Link to="/">HOME</Link>
              <span> / </span>{" "}
              <Link to={`/application/${subCategorySlug}`} className="ms-2">
                Application
              </Link>
              <span> / </span>{" "}
              <span  className='ms-2' >{subCategory?.listingTitle}</span> 

            </p>
          </div>
        </div>
      </div>

      <div className="bgWhite">
        <div className="container">
          <div className="product-main-banner">
            <div className="product-banner d-lg-flex">
              <div>
                <img src={bannerImg} alt="" />
                {/* <div className="banner-text-container">
                  <h2>{subCategory?.name || "Default Title"}</h2>
                  <div className="line"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" listingHeader bgWhite pt-3">
        <div className="container mb-0">
          <h1>{subCategory?.listingTitle}</h1>
          <p className="mb-0">{parse(subCategory?.listingDescription || "")}</p>
        </div>
      </div>
      {/* Product Listing Section */}
      <div className="product-listing py-3">
        <div className="container">
          <div className="row">
            {/* Sidebar Filters */}

            <div className="col-lg-4">
              <div className={`sidebar d-lg-block  d-none`}>
                <h3>Search by decor code</h3>
                <input
                  type="text"
                  placeholder="search"
                  className="search"
                  value={decorNumber}
                  onChange={(e) => setDecorNumber(e.target.value)}
                />

                {/* Size Filter */}
                <h3 className="mt-3">FILTER BY SIZE</h3>
                <div className="row">
                  {sizes.map((size) => (
                    <div className="col-6" key={size._id}>
                      <button
                        onClick={() => handleSizeFilter(size._id, size.title)}
                        className={
                          selectedSizes.includes(size._id) ? "active-btn" : ""
                        }
                      >
                        {size.title}
                      </button>
                    </div>
                  ))}
                </div>

                <h3 className="mt-3">FILTER BY Decor Series</h3>
                <div className="row">
                  {decorSeries.map((type) => (
                    <div className="col-6" key={type._id}>
                      <button
                        onClick={() => handleDecorFilter(type._id)}
                        className={
                          selectedDecor.includes(type._id) ? "active-btn" : ""
                        }
                      >
                        {type.title}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Other Filters */}
                {/* <h3 className="mt-3">FILTER BY FINISHES</h3>
                <div className="row">
                  {finishes.map((finish) => (
                    <div className="col-6" key={finish._id}>
                      <button
                        onClick={() => handleFinishFilter(finish._id)}
                        className={
                          selectedFinish.includes(finish._id)
                            ? "active-btn"
                            : ""
                        }
                      >
                        {finish.fullName}
                      </button>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>

            {/* Product Grid */}
            <div className="col-lg-8 ">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  {/* <h2>{subCategory?.name || "Default Title"}</h2>
                    <p>{subCategory?.shortDescription || ""}</p> */}
                </div>
                <button className="sidebar-toggle d-lg-none d-block" onClick={handleShow}>
                  {isSidebarOpen ? <RxCross2 /> : <><FaFilter /> Filters</>}
                </button>
              </div>

              <div className="row">
                {products?.map((product) => {
                  const imageUrl = getImageURL(product?.a4Image);
                  return (
                    <div className="col-lg-4 col-6 pt-0" key={product._id}>
                      <Link to={`/application-details/${product.slug}`}
                              state={{ 
                                subCategory: subCategory?.listingTitle,
                                subCategoryId: subCategory._id, 
                                slug:product?.slug
                              }}
                      >
                        <div className="product-box">
                          <img src={imageUrl} alt={product.name} />
                          {/* <div className="blur"></div> */}
                          <h4>{product.name}</h4>
                          <h4>{product.decorNumber}</h4>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* B-Pagination */}
              <div className="d-flex justify-content-end">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <button
                        className="page-link"
                        href="#"
                        disabled={pagination.page == 1 ? true : false}
                        onClick={handlePrevious}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(pagination.totalPages)].map((item, index) => {
                      index = index + 1;
                      return (
                        <li className="page-item">
                          <button
                            onClick={() => {
                              setPagination((old) => {
                                return { ...old, page: index };
                              });
                            }}
                            className={`page-link ${pagination.page == index ? "active" : ""
                              }`}
                            href="#"
                          >
                            {index}
                          </button>
                        </li>
                      );
                    })}

                    <li className="page-item">
                      <button
                        className="page-link"
                        disabled={
                          pagination.page == pagination.totalPages
                            ? true
                            : false
                        }
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OtherPageFooter />
    </div>
  );
}


export default Application;
