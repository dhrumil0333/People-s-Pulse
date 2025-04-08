import React from 'react'
import { useContext, useEffect } from 'react'
import './home.css'
import img from './img/1.png'
import img1 from './img/2.png'
import img2 from './img/3.png'
import img3 from './img/4.png'
import { useNavigate } from 'react-router-dom'
import { LogContext } from '../context/LogContext';


const Home = () => {
    const navigate = useNavigate();
    const { language } = useContext(LogContext);

    const translations = {
        en: {
            slogan: '"Empowering Communities',
            slogan2: 'Shaping the Future."',
            section1_title: "Empowering communities",
            section1_subtitle: "Join the Civic Engagement Revolution",
            section1_desc: "People's Pulse is transforming civic engagement in Vadodara, IN, by providing an all-in-one platform that empowers community members. Users can propose local improvements, access public services, and actively shape policy. With features like community initiatives, simplified service access, and tools for policy participation, we are committed to making governance more transparent and responsive. Our platform focuses on inclusion, offering multilingual support and real-time updates to foster trust and community involvement.",
            section2_title: "Empower your community",
            section2_subtitle: "Engage, access, and Influence",
            card1_title: "Community initiatives",
            card1_desc: "Empower your voice by proposing local improvements and discussing community projects.",
            card2_title: "Access to services",
            card2_desc: "Easily navigate public services and apply for government benefits.",
            card3_title: "Policy participation",
            card3_desc: "Engage directly with local representatives and track government actions.",
            footer_title: "People's Pulse"
        },
        hi: {
            slogan: '"समुदायों को सशक्त बनाना, भविष्य को आकार देना।"',
            section1_title: "समुदायों को सशक्त बनाना",
            section1_subtitle: "नागरिक जुड़ाव क्रांति में शामिल हों",
            section1_desc: "पीपल्स पल्स वडोदरा, भारत में नागरिक जुड़ाव को बदल रहा है, जिससे समुदाय के सदस्यों को सशक्त बनाने के लिए एक ऑल-इन-वन प्लेटफ़ॉर्म प्रदान किया जाता है। उपयोगकर्ता स्थानीय सुधारों का प्रस्ताव कर सकते हैं, सार्वजनिक सेवाओं तक पहुंच सकते हैं, और सक्रिय रूप से नीति निर्माण में भाग ले सकते हैं। हमारे प्लेटफ़ॉर्म में सामुदायिक पहल, सरल सेवा पहुंच और नीति भागीदारी के उपकरण शामिल हैं, जो शासन को अधिक पारदर्शी और उत्तरदायी बनाने के लिए प्रतिबद्ध हैं। हमारा फोकस समावेशन पर है, जिसमें बहुभाषी समर्थन और रीयल-टाइम अपडेट शामिल हैं, ताकि विश्वास और सामुदायिक भागीदारी को बढ़ावा दिया जा सके।",
            section2_title: "अपने समुदाय को सशक्त बनाएं",
            section2_subtitle: "संलग्न हों, पहुंचें, और प्रभाव डालें",
            card1_title: "सामुदायिक पहल",
            card1_desc: "स्थानीय सुधारों का प्रस्ताव करके और सामुदायिक परियोजनाओं पर चर्चा करके अपनी आवाज़ को सशक्त बनाएं।",
            card2_title: "सेवाओं तक पहुंच",
            card2_desc: "सार्वजनिक सेवाओं को आसानी से नेविगेट करें और सरकारी लाभों के लिए आवेदन करें।",
            card3_title: "नीति भागीदारी",
            card3_desc: "स्थानीय प्रतिनिधियों के साथ सीधे संलग्न हों और सरकारी कार्यों को ट्रैक करें।",
            footer_title: "पीपल्स पल्स"
        }
    };

    useEffect(() => {
        // Load Botpress Webchat script dynamically
        const botpressScript = document.createElement('script');
        botpressScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
        botpressScript.async = true;
        document.body.appendChild(botpressScript);

        // Load your Botpress chatbot instance
        const botInstanceScript = document.createElement('script');
        botInstanceScript.src = "https://files.bpcontent.cloud/2025/03/01/16/20250301163502-JIDPRAI6.js";
        botInstanceScript.async = true;
        document.body.appendChild(botInstanceScript);

        return () => {
            // Clean up when component unmounts
            document.body.removeChild(botpressScript);
            document.body.removeChild(botInstanceScript);
        };
    }, []);


  return (
    <div>
            <div className="home-img">
                <div className='home-div'>
                <h1>{translations[language].slogan}</h1>
                <h1>{translations[language].slogan2}</h1>
                </div>
            </div>

            <section className='home-setter'>
            <div className="home-div2">
                <div className="home-inner">
                    <div className="home-div2-one">
                        <h2>{translations[language].section1_title}</h2>
                        <h1>{translations[language].section1_subtitle}</h1>
                        <p>{translations[language].section1_desc}</p>
                    </div>
                    <div className="home-div2-two">
                        <img src={img} alt="" />
                    </div>
                </div>
            </div>

            <div className="home-div3">
                <div className="home-inner-2">
                    <div className="home-text-align">
                    <h2>{translations[language].section2_title}</h2>
                    <h1>{translations[language].section2_subtitle}</h1>
                    </div>
                    <div className='home-card-all'>
                        <div className="home-card-1">
                            <img src={img1} alt="" />
                            <h2>{translations[language].card1_title}</h2>
                            <p>{translations[language].card1_desc}</p>
                        </div>
                        <div className="home-card-2">
                            <img src={img2} alt="" />
                            <h2>{translations[language].card2_title}</h2>
                            <p>{translations[language].card2_desc}</p>
                        </div>
                        <div onClick={() => { navigate('./policy') }} className="home-card-3">
                            <img src={img3} alt="" />
                            <h2>{translations[language].card3_title}</h2>
                            <p>{translations[language].card3_desc}</p>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
  )
}

export default Home
