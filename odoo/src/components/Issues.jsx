import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogContext } from '../context/LogContext';
import './issues.css';

const Issues = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const { logEmail, language } = useContext(LogContext);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (!logEmail) {
            navigate('/login');
        }
    }, [navigate, logEmail]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {  
        if (!image) {
            alert(language === "hi" ? "कृपया एक छवि अपलोड करें" : "Please upload an image");
            return;
        }

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("state", data.state);
        formData.append("district", data.district);
        formData.append("location", data.location);
        formData.append("image", image);
        formData.append("email", logEmail);

        setLoading(true);

        try {
            await axios.post("http://localhost:5000/issues", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            alert(language === "hi" ? "समस्या सफलतापूर्वक जमा की गई" : "Issue submitted successfully");
            navigate("/thank-you");
        } catch (error) {
            console.error("Error submitting issue:", error);
            alert(language === "hi" ? "एक त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।" : "An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="left-panel">
                <h2>{language === "hi" ? "समस्याएँ रिपोर्ट करें" : "Report Issues"}</h2>
                <p>{language === "hi" ? '"आपकी चिंताएँ, हमारी प्रतिबद्धता!"' : '"Your Concerns, Our Commitment!"'}</p>
            </div>
            <div className="right-panel">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder={language === "hi" ? "शीर्षक" : "Title"} {...register("title", { required: true })} />
                    {errors.title && <p className='error'>{language === "hi" ? "यह फ़ील्ड आवश्यक है" : "This field is required"}</p>}
                    
                    <textarea placeholder={language === "hi" ? "विवरण" : "Description"} {...register("description", { required: true })}></textarea>
                    {errors.description && <p className='error'>{language === "hi" ? "यह फ़ील्ड आवश्यक है" : "This field is required"}</p>}
                    
                    <select {...register("category", { required: true })}>
                        <option value="">{language === "hi" ? "श्रेणी चुनें" : "Select Category"}</option>
                        <option value="road">{language === "hi" ? "सड़क की समस्या" : "Road Issue"}</option>
                        <option value="electricity">{language === "hi" ? "बिजली की समस्या" : "Electricity Issue"}</option>
                        <option value="water">{language === "hi" ? "पानी की समस्या" : "Water Issue"}</option>
                        <option value="sanitation">{language === "hi" ? "स्वच्छता" : "Sanitation"}</option>
                    </select>
                    {errors.category && <p className='error'>{language === "hi" ? "यह फ़ील्ड आवश्यक है" : "This field is required"}</p>}
                    
                    <input type='text' placeholder={language === "hi" ? "राज्य" : "State"} {...register("state", { required: true })} />
                    <input type='text' placeholder={language === "hi" ? "जिला" : "District"} {...register("district", { required: true })} />
                    <input type='text' placeholder={language === "hi" ? "स्थान" : "Location"} {...register("location", { required: true })} />
                    
                    <div className="file-upload">
                        <input type='file' accept='image/*' onChange={handleImageChange} />
                        {preview && <img src={preview} alt={language === "hi" ? "पूर्वावलोकन" : "Preview"} className="image-preview" />}
                    </div>

                    <div className='button-group'>
                        <button type="submit" className="save" disabled={loading}>
                            {loading ? (language === "hi" ? "जमा किया जा रहा है..." : "Submitting...") : (language === "hi" ? "सहेजें" : "Save")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Issues;

