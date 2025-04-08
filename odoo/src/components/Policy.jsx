import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { LogContext } from "../context/LogContext"; // Import context
import "./Policy.css";

const Policy = () => {
  const { language } = useContext(LogContext); // Get the selected language from context
  const [policies, setPolicies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/policies")
      .then((response) => setPolicies(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (e, policyId) => {
    e.preventDefault();
    console.log(`Feedback for ${policyId}:`, feedback[policyId] || "");
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [policyId]: "",
    }));
  };

  const handleFeedback = (e, policyId) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [policyId]: e.target.value,
    }));
  };

  const filteredPolicies = policies.filter((policy) =>
    selectedCategory === "all" ? true : policy.category === selectedCategory
  );

  return (
    <div className="policy-container">
      <div className="containerlodu">
      <div className="policy-header">
        <h2>{language === "en" ? "Government Policies" : "सरकारी नीतियाँ"}</h2>
        <div className="selectors">
          <select value={selectedCategory} onChange={handleCategoryChange} className="policy-select">
            <option value="all">{language === "en" ? "All Policies" : "सभी नीतियाँ"}</option>
            <option value="state">{language === "en" ? "State Policies" : "राज्य नीतियाँ"}</option>
            <option value="central">{language === "en" ? "Central Policies" : "केंद्र सरकार की नीतियाँ"}</option>
          </select>
        </div>
      </div>

      <div className="policy-list">
        {filteredPolicies.map((policy) => (
          <div key={policy.id} className="policy-card">
            <h3>{language === "en" ? policy.title : policy.title_hi}</h3>
            <p>{language === "en" ? policy.description : policy.description_hi}</p>
            <p className="policy-date">📅 {policy.date}</p>
            <a href={policy.source} target="_blank" rel="noopener noreferrer" className="policy-link">
              {language === "en" ? "Read More" : "और पढ़ें"}
            </a>
            <form onSubmit={(e) => handleSubmit(e, policy.id)} className="policy-feedback">
              <textarea
                placeholder={language === "en" ? "Give your feedback..." : "अपनी प्रतिक्रिया दें..."}
                value={feedback[policy.id] || ""}
                onChange={(e) => handleFeedback(e, policy.id)}
              ></textarea>
              <button type="submit">{language === "en" ? "Submit" : "जमा करें"}</button>
            </form>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Policy;
