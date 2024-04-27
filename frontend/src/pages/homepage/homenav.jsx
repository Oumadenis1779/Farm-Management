// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'

function Header() {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon">
                        <nav class="navbar bg-body-tertiary">
                        </nav>
                    </span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" class="navbar-brand"><img src="https://i.ibb.co/NTtQKqZ/logo.png" alt="logo" style={{ maxWidth: '200px', maxHeight: '200px' }}></img></Link>
                    <l class="navbar-nav me-auto mb-2 mb-lg-0">
                        <div class="nav-item  ">
                            <Link to="/" class="nav-link"> Features </Link>
                            <Link to="/ " class="nav-link"> About Us </Link>
                        </div>
                    </l>
                    <form class=" btn-container ">
                        <button type="button" className="btn btn-success link">
                            <Link to="/login" className="text-white link">Get started</Link>
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Header;
