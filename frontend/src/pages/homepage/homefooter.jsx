// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomeFooter() {
  return (
    <footer className="bg-gray-500 my-5 p-4 wfooter-container nav-link">
      <div className="container mx-auto bg-gray-500 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4  footer-container">
          {/* First row */}
          <div className="col">
            <div className="col">
              <Link to="/" class="navbar-brand"><img src="https://i.ibb.co/NTtQKqZ/logo.png" alt="logo" style={{ maxWidth: '200px', maxHeight: '200px' }}></img></Link>
            </div>
          </div>
          {/* Second row */}
          <div className="col" >
            <div className="row text-black">
              <h4 className="text-lg  text-black font-bold mb-2">Product</h4>
              <ul>
                <li><a href="/" class='text-black nav-link'>Farm Tracker</a></li>
                <li><a href="/" class='text-black nav-link'>Help & Support</a></li>
                <li><a href="/" class='text-black nav-link'>Plans & Pricing</a></li>
              </ul>
            </div>
          </div>
          {/* Third row */}
          <div className="col">
            <div className="row text-black">
              <h4 className="text-lg text-black font-bold mb-2">Services</h4>
              <ul>
                <li><a href="/" class='text-black nav-link'>Task Management</a></li>
                <li><a href="/" class='text-black nav-link'>Inventory Tracking</a></li>
              </ul>
            </div>
          </div>
          {/* Fourth row */}
          <div className="col nav-link">
            <div className="row text-black nav-link">
              <h4 className="text-lg font-bold mb-2">Links</h4>
              <ul>
                <li><a href="/" class='text-black nav-link'>Contact Us</a></li>
                <li><a href="/" class='text-black nav-link'>About Us</a></li>
                <li><a href="/" class='text-black nav-link'>FAQs</a></li>
                <li><a href="/" class='text-black nav-link'>Why Farm Tracker</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <section className="p-3 pt-0">
          <div className="row d-flex align-items-center">
            <div className="col-md-7 col-lg-8 text-center text-md-start">
              <div className="p-3">
                © 2024 Copyright:
                <a className="text-white" href="https://mdbootstrap.com/">farmmanagement.com</a>
              </div>
            </div>
            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
              {/* Social media buttons here */}
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default HomeFooter;
