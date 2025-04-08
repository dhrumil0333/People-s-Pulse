import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'
import { useContext } from 'react';
import { LogContext } from '../context/LogContext';
import { useState } from "react";

const Navbar = () => {
  const value = useContext(LogContext);
  const {language, setLanguage } = useContext(LogContext);

  const translations = {
    en: { home: "HOME", policies: "POLICIES", issues: "REGISTER ISSUES", profile: "Profile", logout: "Log out", signup: "Sign up", login: "Log in", title: "People's Pulse" },
    hi: { home: "होम", policies: "नीतियाँ", issues: "मुद्दे दर्ज करें", profile: "प्रोफ़ाइल", logout: "लॉग आउट", signup: "साइन अप", login: "लॉग इन", title: "पीपल्स पल्स" }
  };


  return (
    <div>
    <div className='nav'>
      <h1>{translations[language].title}</h1>

      <div className="logo">
        <ul>
          <li>
            <Link to="/" className="nav-link">{translations[language].home}</Link>
          </li> 
          <li>
            <Link to="/policy" className="nav-link">{translations[language].policies}</Link>
          </li>
          <li>
            <Link to="/issues" className="nav-link">{translations[language].issues}</Link>
          </li>
        </ul>
      </div>

      <div className='nav-setup'>
      <select className="language-selector" value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
      {value.profile === "user" ? (
        <div className="login">
          <Link to="/user" className="list-style">{translations[language].profile}</Link>
          <Link to="/" className="list-style" onClick={() => value.setProfile("notuser")}>
            {translations[language].logout}
          </Link>
        </div>
      ) : (
        <div className="login">
          <Link to="/sign" className="list-style">{translations[language].signup}</Link>
          <Link to="/log" className="list-style">{translations[language].login}</Link>
        </div>
      )}
      </div>
      {/* Language Selector */}
    </div>
  </div>
  )
}

export default Navbar
