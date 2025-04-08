
import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [pdfData, setPdfData] = useState({});
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 📌 Fetch PDFs
  const fetchPdfs = async () => {
    try {
      const response = await axios.get("http://localhost:5001/list-pdfs");
      setPdfData(response.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  // 📌 Generate PDFs
  const generatePdfs = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.get("http://localhost:5001/generate-pdfs");
      setMessage(response.data.message);
      fetchPdfs(); // Refresh list
    } catch (error) {
      setMessage("Failed to generate PDFs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={generatePdfs} disabled={loading}>
        {loading ? "Generating..." : "Generate PDFs"}
      </button>
      {message && <p>{message}</p>}

      <h2>Filter PDFs</h2>

      {/* State Filter */}
      <select onChange={(e) => setSelectedState(e.target.value)}>
        <option value="">Select State</option>
        {Object.keys(pdfData).map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      {/* District Filter */}
      {selectedState && (
        <select onChange={(e) => setSelectedDistrict(e.target.value)}>
          <option value="">Select District</option>
          {Object.keys(pdfData[selectedState] || {}).map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      )}

      {/* Category Filter */}
      {selectedDistrict && (
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {Object.keys(pdfData[selectedState][selectedDistrict] || {}).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      )}

      <h2>Available PDFs</h2>
      <ul>
        {selectedState && selectedDistrict && selectedCategory &&
          pdfData[selectedState][selectedDistrict][selectedCategory]?.map((pdf, index) => (
            <li key={index}>
              <a href={`http://localhost:5001/download/${selectedState}/${selectedDistrict}/${selectedCategory}/${pdf}`} download>
                {pdf}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
