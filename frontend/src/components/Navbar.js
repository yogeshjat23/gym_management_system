
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';
import Logo from '../assets/nitLogo.png';
/*
  const handleImport = async () => {
    try {
      const response = await fetch('http://localhost:5000/import', {
        method: 'GET',
      });

      if (response.ok) {
        const result = await response.text();
        alert(result); 
      } else {
        alert('Failed to import data');
      }
    } catch (error) {
      console.error('Error during import:', error);
      alert('Error during import');
    }
  };
*/

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={Logo} alt="Logo" className="navbar-logo" />
        </a>
        <h1>
          राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर <br /> National Institute of Technology Hamirpur
        </h1>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-item">Home</Link>
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="navbar-item">Dashboard</Link>
              <Link to="/registration" className="navbar-item">Register</Link>
              <Link to="/students" className="navbar-item">List</Link>
              <Link to="/about" className="navbar-item" >About</Link>
             {/* <div onClick={handleImport} className="navbar-item logout" >Import</div> */}
              <div onClick={logout} className="navbar-item logout" >Logout</div>
            </>
          ) : (
            <>
             <Link to="/login" className="navbar-item logout " >Login</Link>
            </>
          )}
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
