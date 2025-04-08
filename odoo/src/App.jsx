import React from 'react'
import Policy from './components/Policy'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Sign from './components/Sign';
import Login from './components/Login';
import { LogProvider } from "./context/LogContext";
import Profile from './components/Profile';
import Issues from './components/Issues';
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer';


const App = () => {
  return (
    <div>
      <LogProvider>

      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/log" element={<Login />} />
        <Route path="/user" element={<Profile />} />
        <Route path="/issues" element={<Issues />} />
         

      </Routes>
        <Footer/>
    </Router>
      </LogProvider>
    </div>
  )
}

export default App
