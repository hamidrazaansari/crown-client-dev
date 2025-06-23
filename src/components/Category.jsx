import React, { useState, useEffect } from "react";
import "../assets/css/category.css";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utills/BaseUrl";

const Category = () => {
  const [activeBox, setActiveBox] = useState(0); // Always keep the first category active
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`);
        setData(response.data.body || []);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpen = (id) => {
    navigate("/products", { state: id });
  };

  const getActiveClass = (id) => {
    const classMap = {
      1: "decorative-active",
      2: "interior-active",
      3: "exterior-active",
    };
    return classMap[id] || "";
  };

  return (
    <div className="category">
      <div className="container">
        <h2>Category</h2>
        <div className="d-flex align-items-center justify-content-center">
          {data.map((category, index) => {
            const isActive = activeBox === index;
            return (
              <div
                key={category._id}
                className={`category-box ${isActive ? `category-box-active ${getActiveClass(index + 1)}` : ""}`}
                onMouseEnter={() => setActiveBox(index)}
              >
                <div className={`texts ${isActive ? "show-text" : ""}`}>
                  <Link className="category-btn" to={`/${category.slug}`}>
                    Explore Now <HiOutlineArrowNarrowRight />
                  </Link>
                  <div className="d-flex cat-heading">
                    {/* <h4>{`0${index + 1}`}</h4> */}
                    <h3>{category.name}</h3>
                  </div>
                  {isActive && category.shortDescription && <p>{category.shortDescription}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
