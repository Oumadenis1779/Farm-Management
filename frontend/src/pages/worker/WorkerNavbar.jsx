// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './worker.css';

function WkNavbar() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <Link to="/Farm Tracker" class="navbar-brand"><img src="https://i.ibb.co/NTtQKqZ/logo.png" alt="logo" style={{ maxWidth: '250px', maxHeight: '250px' }}></img></Link>

          <div class="collapse navbar-collapse nav-container" nav-container id="navbarTogglerDemo03">
            <div class="welcome-container">
              <h2>Welcome to Farmtracker</h2>
            </div>
            <form className="d-flex" role="search" style={{ borderRadius: '20px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', width: '400px' }} />
              <button className="btn btn-outline-success" type="submit" style={{ border: 'none', outline: 'none' }}><img src="https://i.ibb.co/vwY9WRB/search.png" alt="search" border="0" style={{ maxWidth: '30px', maxHeight: '30px' }}></img></button>
            </form>


            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#"><img src="https://i.ibb.co/X4JyyKD/notification-icon.png" alt="notification-icon" style={{ maxWidth: '50px', maxHeight: '50px' }}></img></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"><img src="https://i.ibb.co/SJPMktY/Profile-icon.png" alt="Profile-icon" style={{ maxWidth: '50px', maxHeight: '50px' }}></img></a>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default WkNavbar;
