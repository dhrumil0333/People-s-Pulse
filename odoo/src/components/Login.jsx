import React, { useContext } from 'react';
import './login.css';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogContext } from '../context/LogContext';
import img from './img/5.png';

const Login = () => {
    const { profile, setProfile, logEmail, setlogEmail, language } = useContext(LogContext);
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit,
        formState: { errors } 
    } = useForm();

    const onSubmit = async (data) => {  
        try {
            const response = await axios.post('http://localhost:5000/log', data);

            if (response.data === "Success") {
                console.log("Login successful:", response.data);
                alert(translations[language].successMessage);

                // Save user email in localStorage
                localStorage.setItem("userEmail", data.Email);

                // Update the context state
                setProfile("user");
                setlogEmail(data.Email);

                // Navigate to issues page after login
                navigate('/issues');
            } else {
                alert(translations[language].invalidCredentials);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert(translations[language].errorMessage);
        }
    };

    // Language translations
    const translations = {
        en: {
            title: "People's Pulse",
            loginAccount: "Login Your Account",
            email: "Email",
            password: "Password",
            submit: "Login",
            register: "Register Now",
            requiredField: "This field is required",
            passwordMinLength: "Minimum 8 characters are required",
            successMessage: "You logged in successfully",
            invalidCredentials: "Invalid Email or Password",
            errorMessage: "Login failed. Please try again."
        },
        hi: {
            title: "पीपल्स पल्स",
            loginAccount: "अपने खाते में लॉगिन करें",
            email: "ईमेल",
            password: "पासवर्ड",
            submit: "लॉगिन",
            register: "रजिस्टर करें",
            requiredField: "यह फ़ील्ड आवश्यक है",
            passwordMinLength: "कम से कम 8 वर्ण आवश्यक हैं",
            successMessage: "आप सफलतापूर्वक लॉग इन हो गए",
            invalidCredentials: "अमान्य ईमेल या पासवर्ड",
            errorMessage: "लॉगिन विफल रहा। कृपया पुन: प्रयास करें।"
        }
    };

    return (
        <div className="log-login">
            <div className="login-left">
                <img src={img} alt="" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="login-text">
                    <h1 className='sign-h1'>{translations[language].title}</h1>
                    <p className='sign-p'>{translations[language].loginAccount}</p>
                </div>
                <div className='login-right log-right'>
                    <input 
                        className="asdfa" 
                        placeholder={translations[language].email} 
                        type='email' 
                        {...register("Email", { required: translations[language].requiredField })}
                    />
                    {errors.Email && <div className='error'>{errors.Email.message}</div>}

                    <input 
                        className="asdfa" 
                        placeholder={translations[language].password} 
                        type='password' 
                        {...register("password", { 
                            required: translations[language].requiredField, 
                            minLength: { value: 8, message: translations[language].passwordMinLength } 
                        })} 
                    />
                    {errors.password && <div className='error'>{errors.password.message}</div>}

                    <input className='login-btn login-signin' style={{borderRadius: '10px'}} type="submit" value={translations[language].submit} />
                    <button className='login-btn register-now' style={{borderRadius: '10px'}} onClick={() => navigate('/sign')}>
                        {translations[language].register}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;

