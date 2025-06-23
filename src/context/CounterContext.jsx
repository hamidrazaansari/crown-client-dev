import React, { createContext, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

// Create the context
export const CounterContext = createContext();

// Create a provider component
export const CounterProvider = ({ children }) => {
  // Load data from localStorage on initial render
  const getStoredData = () => {
    const storedData = localStorage.getItem('cartData');
    return storedData ? JSON.parse(storedData) : [];
  };

  const getStoredCount = () => {
    return parseInt(localStorage.getItem('cartCount')) || 0;
  };

  const [count, setCount] = useState(getStoredCount());
  const [data, setData] = useState(getStoredData());

  // Save data and count to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(data));
    localStorage.setItem('cartCount', count.toString());
  }, [data, count]);

  // Function to add data to cart
  const addData = (newData, categoryId , subCategoryId) => {
    // Check if the item already exists in the cart
    const isDuplicate = data.some(item => item._id === newData._id);
    if (isDuplicate) {
        toast.error('This item is already in the cart!');
        return;
    }

    // Add categoryId to newData
    const updatedData = { ...newData, categoryId , subCategoryId };

    setData(prevData => [...prevData, updatedData]);
    setCount(prevCount => prevCount + 1);
};

  // Function to clear only checked data
  const clearCheckedData = () => {
    const checkedCount = data.filter(item => item.checked).length;
    setData(prevData => prevData.filter(item => !item.checked));
    setCount(prevCount => Math.max(prevCount - checkedCount, 0)); // Prevent negative count
  };

  // Function to toggle checked state of an item
  const toggleItemChecked = (id) => {
    setData(prevData =>
      prevData.map(item =>
        item._id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Function to remove an item by ID
  const removeItemById = (id) => {
    setData(prevData => prevData.filter(item => item._id !== id));
    setCount(prevCount => Math.max(prevCount - 1, 0)); // Prevent negative count
  };

  // Function to completely clear the cart
  const clearCart = () => {
    setData([]);
    setCount(0);
    localStorage.removeItem('cartData');
    localStorage.removeItem('cartCount');
  };
  

  return (
    <>
      <CounterContext.Provider value={{ count, data, addData, clearCheckedData, toggleItemChecked, removeItemById, clearCart }}>
        {children}
      </CounterContext.Provider>
    </>
  );
};

export default CounterProvider;
