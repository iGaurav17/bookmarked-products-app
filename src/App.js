import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './Products';
import Bookmarks from './Bookmarks';
import './style.css'; 

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/bookmarks">Bookmarks</Link>
            </li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
