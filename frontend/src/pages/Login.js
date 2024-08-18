// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css'; 
const HARD_CODED_USERNAME = 'admin';
const HARD_CODED_PASSWORD = 'adminpass';
const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    // Implement authentication logic here (e.g., verify username and password)
    if (username === HARD_CODED_USERNAME && password === HARD_CODED_PASSWORD) {
      // Handle successful login (e.g., redirect or update state)
      login();
     
      // Call your login function or redirect here
    } else {
      setMessage(('Invalid username or password.'));
      
    }


    
    
  };

  return (


    
    <div className='log-container' >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      <br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button type="submit">Login</button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Login;
