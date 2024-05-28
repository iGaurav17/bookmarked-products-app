import React, { useState, useEffect } from 'react';
import './style.css'; 

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  return (
    <div className="container">
      <h2>Bookmarks</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookmarks.map((bookmark, index) => (
            <tr key={index}>
              <td>{bookmark.title}</td>
              <td>{bookmark.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookmarks;