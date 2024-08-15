
import React, { useState } from 'react';

import './Navbar.css';
import Logo from '../assets/nitLogo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => setIsOpen(!isOpen);
 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
        <img  src={Logo} alt="Logo" className="navbar-logo" /> </a>
        <h1>राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर <br/>National Institute of Technology Hamirpur </h1>
        
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <a href="/" className="navbar-item">Home</a>
          <a href="/dashboard" className="navbar-item">Dashboard</a>
       

          <a href="/registration" className="navbar-item">Register</a>
          <a href="/about" className="navbar-item">About</a>
          

        </div>
        <div className="navbar-toggle" onClick={toggleMenu}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
