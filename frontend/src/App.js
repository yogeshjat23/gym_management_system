
import React from "react";
import StickyNavbar from "./components/Navbar";
import HomePage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Registration from "./pages/Registration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <StickyNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About/>} />
          <Route path="/registration" element={<Registration />}/>
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;


