// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StickyNavbar from './components/Navbar';
import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Registration from './pages/Registration';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import  { Toaster } from 'react-hot-toast';
import StudentList from './pages/StudentList';


const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
    <Route path="/about" element={<ProtectedRoute element={<About />} />} />
    <Route path="/registration" element={<ProtectedRoute element={<Registration />} />} />
    <Route path="/students" element={<ProtectedRoute element={<StudentList />} />} />
    <Route path="/login" element={<Login />} />
    
  </Routes>
   
);

const App = () => (
  <Router>
    <AuthProvider>
    <Toaster />
      <StickyNavbar />
      <AppRoutes />
    </AuthProvider>
  </Router>
);

export default App;
