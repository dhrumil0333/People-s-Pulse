import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import './sign.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogContext } from '../context/LogContext';

const Sign = () => {
    const navigate = useNavigate();
    const { language } = useContext(LogContext);

    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
    } = useForm();

    const password = watch("password");

    const onSubmit = (data) => {  
        axios.post('http://localhost:5000/sign', data)
            .then((result) => {
                console.log("Successfully saved:", result.data);
                alert(translations[language].successMessage);
                navigate('/log');
            })
            .catch((err) => {
                if (err.response?.status === 402) {
                    alert(translations[language].emailExists);
                    navigate('/log');
                } else {
                    alert(translations[language].errorMessage);
                }
            });
    };

    // Language translations
    const translations = {
        en: {
            title: "People's Pulse",
            createAccount: "Create Account",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email",
            phone: "Phone Number",
            password: "Password",
            confirmPassword: "Confirm Password",
            submit: "Sign Up",
            requiredField: "This field is required",
            phoneValidation: "Phone number must be numeric",
            phoneLength: "Number must be of 10 characters",
            passwordMinLength: "Minimum 8 characters are required",
            passwordMismatch: "Passwords do not match",
            successMessage: "You signed up successfully",
            emailExists: "Email already registered! Try logging in.",
            errorMessage: "An error occurred. Please try again."
        },
        hi: {
            title: "पीपल्स पल्स",
            createAccount: "खाता बनाएँ",
            firstName: "पहला नाम",
            lastName: "अंतिम नाम",
            email: "ईमेल",
            phone: "फोन नंबर",
            password: "पासवर्ड",
            confirmPassword: "पासवर्ड की पुष्टि करें",
            submit: "साइन अप करें",
            requiredField: "यह फ़ील्ड आवश्यक है",
            phoneValidation: "फोन नंबर केवल संख्यात्मक होना चाहिए",
            phoneLength: "नंबर 10 अंकों का होना चाहिए",
            passwordMinLength: "कम से कम 8 वर्ण आवश्यक हैं",
            passwordMismatch: "पासवर्ड मेल नहीं खाते",
            successMessage: "आपने सफलतापूर्वक साइन अप किया",
            emailExists: "ईमेल पहले से पंजीकृत है! लॉग इन करने का प्रयास करें।",
            errorMessage: "एक त्रुटि हुई। कृपया पुन: प्रयास करें।"
        }
    };

    return (
        <div className='sign'>
            <div className="sign-left">
                <img src="https://youthtoday.org/wp-content/uploads/sites/13/2024/09/REPORT_2024.09.16_Youth-Civic-Empowerment.jpg" alt="" />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h1 className='sign-h1'>{translations[language].title}</h1>
                    <p className='sign-p'>{translations[language].createAccount}</p>
                    
                    <input className='sign-all' placeholder={translations[language].firstName} 
                        type='text' {...register("firstName", { required: translations[language].requiredField })} />
                    
                    <input className='sign-all' placeholder={translations[language].lastName} 
                        type='text' {...register("lastName", { required: translations[language].requiredField })} />
                    
                    <div className="error-fix">
                        {errors.firstName && <p className='error'>{errors.firstName.message}</p>}
                        {errors.lastName && <p className='error'>{errors.lastName.message}</p>}
                    </div>
                </div>

                <div>
                    <input className='sign-all' placeholder={translations[language].email} 
                        type='email' {...register("Email", { required: translations[language].requiredField })} />
                    
                    <input className='sign-all' placeholder={translations[language].phone} 
                        type='text' {...register("PhoneNo", { 
                            required: translations[language].requiredField, 
                            minLength: { value: 10, message: translations[language].phoneLength }, 
                            maxLength: { value: 10, message: translations[language].phoneLength }, 
                            pattern: { value: /^[0-9]+$/, message: translations[language].phoneValidation } 
                        })} /> 
                    
                    <div className="error-fix">
                        {errors.Email && <div className='error'>{errors.Email.message}</div>}
                        {errors.PhoneNo && <div className='error'>{errors.PhoneNo.message}</div>}
                    </div>
                </div>

                <div>
                    <input className='sign-all' placeholder={translations[language].password} 
                        type='password' {...register("password", { 
                            required: translations[language].requiredField, 
                            minLength: { value: 8, message: translations[language].passwordMinLength } 
                        })} /> 
                    
                    <input className='sign-all' placeholder={translations[language].confirmPassword} 
                        type='password' {...register("confirmPass", { 
                            required: translations[language].requiredField, 
                            minLength: { value: 8, message: translations[language].passwordMinLength },
                            validate: (value) => value === password || translations[language].passwordMismatch 
                        })} /> 
                    
                    <div className="error-fix">
                        {errors.password && <div className='error'>{errors.password.message}</div>}
                        {errors.confirmPass && <div className='error'>{errors.confirmPass.message}</div>}
                    </div>
                </div>

                <input className='sign-btn' type="submit" value={translations[language].submit} />
            </form>
        </div>
    );
};

export default Sign;

