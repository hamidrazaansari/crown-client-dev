import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../assets/css/products.css";
import { Accordion, AccordionBody } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_URL } from "../utills/BaseUrl";
import axios from "axios";
import OtherPageFooter from "../components/OtherPageFooter";
import getImageURL from "../utills/getImageURL";
import { FaFilter } from "react-icons/fa6";
import parse from 'html-react-parser'
import { RxCross2 } from "react-icons/rx";
import { Offcanvas } from "react-bootstrap";


function ProductListing() {
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
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const location = useLocation();

  const { categorySlug, subCategorySlug } = useParams();

  const [pagination, setPagination] = useState({
    page: 1,
    totalRecords: null,
    totalPages: null,
  });
  const [decorNumber, setDecorNumber] = useState();

  useEffect(() => {
    async function fetchProduct() {
      try {
        let url = `${API_URL}/products?categorySlug=${categorySlug}&limit=${60}&page=${pagination.page
          }`;
        if (decorNumber) {
          url += `&decorNumber=${decorNumber}`;
        }
        if (selectedSizes.length) {
          for (let size of selectedSizes) {
            url += `&sizes=${size}`;
          }
        }
        if (selectedDecor.length) {
          for (let decor of selectedDecor) {
            url += `&decorSeries=${decor}`;
          }
        }

        if (subCategorySlug) {
          url += `&subCategorySlug=${subCategorySlug}`;

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
    categorySlug,
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
    setSelectedSubCategory('')

  }, [categorySlug])

  useEffect(() => {
    async function fetchCategory() {
      try {
        let url = `${API_URL}/categories?slug=${categorySlug}`;
        const response = await axios.get(url);
        setCatHeader(response?.data?.body[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategory();
  }, [categorySlug]);

  useEffect(() => {
    async function fetchSubCategory() {
      try {
        let url = `${API_URL}/subCategories?limit=0&slug=${subCategorySlug}`;
        const response = await axios.get(url);
        // setSubCategory(response?.data?.body);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSubCategory();
  }, [subCategorySlug]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sizesRes, decorRes, finishesRes, subCategoryRes, categoryRes] =
          await Promise.all([
            axios.get(`${API_URL}/sizes?priority=ASC&limit=0&status=true`),
            axios.get(`${API_URL}/decorSeries?priority=ASC&limit=0&status=true`),
            axios.get(`${API_URL}/finishes`),
            axios.get(`${API_URL}/subCategories`),
            // axios.get(
            //   `${API_URL}/categories/${
            //     categoryId ? categoryId : "6724e2e2a0586b2a40e206f8"
            //   }`
            // ),
          ]);
        setSizes(sizesRes.data.body);
        setDecorSeries(decorRes.data.body);
        setFinishes(finishesRes.data.body);
        setSubCategory(subCategoryRes.data.body);
        // setCatHeader(categoryRes.data.body);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

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

  const bannerImg = getImageURL(catHeader?.listingImage)

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
                      selectedDecor.includes(type._id) ? "active-btn" : ""
                    }
                  >
                    {type.title}
                  </button>
                </div>
              ))}
            </div>

            {/* Category Filter */}
            <h3 className="mt-3">FILTER BY CATEGORY</h3>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{!selectedSubCategory ? 'Subcategory' : selectedSubCategory}</Accordion.Header>
                <Accordion.Body>
                  <ul className="list-unstyled ms-2">
                    {subCategory?.map((item) => (
                      <li key={item._id}>
                        <Link
                          to={`/${categorySlug}/${item.slug}`}
                          onClick={() => {
                            setSelectedSubCategory(item.name)
                            setSelectedSubCategoryId(item._id)
                          }

                          }
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <button className="bg-light text-dark fw-bold" style={{ fontFamily: "inter" }} onClick={handleClose} disabled={!selectedDecor && !selectedSizes && !selectedSubCategory}>Apply</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="bgWhite py-4">
        <div className="container">
          <div className="breadcrumb mb-0">
            <p className="mb-0">
              <Link to="/">HOME</Link>
              <span> / </span>{" "}
              <Link to={`/${categorySlug}`} className="ms-2">
                {catHeader?.name}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="bgWhite">
        <div className="container">
          <div className="product-main-banner">
            <div className="product-banner d-lg-flex">
              <div>
                <img src={bannerImg} alt={catHeader?.name} />
                {/* <div className="banner-text-container">
                  <h2>{catHeader?.name || "Default Title"}</h2>
                  <div className="line"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" listingHeader bgWhite pt-3">
        <div className="container mb-0">
          <h1>{catHeader?.listingTitle}</h1>
          <p className="mb-0">{parse(catHeader?.listingDescription || "")}</p>
        </div>
      </div>
      {/* Product Listing Section */}
      <div className="product-listing py-5">
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

                {/* Category Filter */}
                <h3 className="mt-3">FILTER BY CATEGORY</h3>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{!selectedSubCategory ? 'Subcategory' : selectedSubCategory}</Accordion.Header>
                    <Accordion.Body>
                      <ul className="list-unstyled ms-2">
                        {subCategory?.map((item) => (
                          <li key={item._id}>
                            <Link
                              to={`/${categorySlug}/${item.slug}`}
                              onClick={() => {
                                setSelectedSubCategory(item.name)
                                setSelectedSubCategoryId(item._id)
                              }

                              }
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>

            {/* Product Grid */}
            <div className="col-lg-8 products-container mt-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h2>{!selectedSubCategory ? '' : selectedSubCategory || ''}</h2>
                  {/* <p>{catHeader?.shortDescription || ""}</p> */}
                </div>
                <button className="sidebar-toggle d-lg-none d-block" onClick={handleShow}>
                  {isSidebarOpen ? <RxCross2 /> : <><FaFilter /> Filters</>}
                </button>
              </div>

              <div className="row">
                {products?.map((product) => {
                  const imageUrl = getImageURL(product?.a4Image);
                  return (
                    <div className="col-lg-4 col-6" key={product._id}>
                      <Link to={`/product-details/${product.slug}`}
                        state={{
                          category: catHeader.name,
                          categorySlug: categorySlug,
                          categoryId: catHeader._id,
                          subCategoryId: selectedSubCategoryId,
                          slug: product.slug
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

export default ProductListing;
