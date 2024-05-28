import React, { useState, useEffect, useCallback } from 'react';

import './style.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  //API endpoint for products
  const API_URL = `https://dummyjson.com/products?limit=10&skip=${(currentPage - 1) * 10}&select=title,price`;

  
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data && data.products && Array.isArray(data.products)) {
        setProducts(data.products); // Update products state with fetched data
      } else {
        console.error('Invalid data format:', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },[API_URL]);

  // Function to handle bookmarking a product
  const handleBookmark = (product) => {
    // Retrieve saved bookmarks from local storage
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    const isBookmarked = savedBookmarks.some((bookmark) => bookmark.id === product.id);

    if (isBookmarked) {
      // Remove the product from bookmarks
      const updatedBookmarks = savedBookmarks.filter((bookmark) => bookmark.id !== product.id);
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } else {
      // Add the product to bookmarks
      const updatedBookmarks = [...savedBookmarks, product];
      localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    }
    
    fetchProducts();
  };

  //pagination
  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, fetchProducts]);

  return (
    <div>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  <button className="bookmark-btn" onClick={() => handleBookmark(product)}>
                    {localStorage.getItem('bookmarks') && JSON.parse(localStorage.getItem('bookmarks')).some((bookmark) => bookmark.id === product.id) ? 'Unbookmark' : 'Bookmark'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button className="prev" onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button className="next" onClick={() => handlePagination(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Products;
