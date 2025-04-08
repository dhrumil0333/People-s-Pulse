
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LogContext } from '../context/LogContext';

const Footer = () => {
    const { language } = useContext(LogContext);

    const translations = {
        en: {
            title: "People's Pulse",
            tagline: "Connecting Communities, Strengthening Governance",
            quickLinks: "Quick Links",
            home: "Home",
            initiatives: "Initiatives",
            services: "Services",
            policy: "Policy",
            contactUs: "Contact Us",
            email: "Email",
            phone: "Phone",
            address: "Address",
            rights: "All rights reserved."
        },
        hi: {
            title: "पीपल्स पल्स",
            tagline: "समुदायों को जोड़ना, शासन को मजबूत करना",
            quickLinks: "त्वरित लिंक",
            home: "होम",
            initiatives: "पहल",
            services: "सेवाएं",
            policy: "नीति",
            contactUs: "संपर्क करें",
            email: "ईमेल",
            phone: "फोन",
            address: "पता",
            rights: "सभी अधिकार सुरक्षित।"
        }
    };

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <h1>{translations[language].title}</h1>
                    <p>{translations[language].tagline}</p>
                </div>
                
                <div className="footer-links">
                    <h3>{translations[language].quickLinks}</h3>
                    <ul>
                        <li><Link to="/">{translations[language].home}</Link></li>
                        <li><Link to="/initiatives">{translations[language].initiatives}</Link></li>
                        <li><Link to="/services">{translations[language].services}</Link></li>
                        <li><Link to="/policy">{translations[language].policy}</Link></li>
                    </ul>
                </div>
                
                <div className="footer-contact">
                    <h3>{translations[language].contactUs}</h3>
                    <p><strong>{translations[language].email}:</strong> <a href="mailto:support@peoplepulse.com">support@peoplepulse.com</a></p>
                    <p><strong>{translations[language].phone}:</strong> <a href="tel:+917984620052">+91 7984620052</a></p>
                    <p><strong>{translations[language].address}:</strong> Charusat University, Changa</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2025 People's Pulse. {translations[language].rights}</p>
            </div>
        </footer>
    );
};

export default Footer;

