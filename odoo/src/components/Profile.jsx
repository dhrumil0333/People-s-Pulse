
import React, { useState, useEffect, useContext } from 'react';
import { LogContext } from '../context/LogContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css';

const Profile = () => {
  const { logEmail } = useContext(LogContext);
  const navigate = useNavigate();
  
  // Get user email from localStorage in case logEmail is null
  const userEmail = logEmail || localStorage.getItem("userEmail");
  const [userData, setUserData] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [issues, setIssues] = useState([]);

  // 🔹 Redirect to login if user is not logged in
  useEffect(() => {
    if (!userEmail) {
      navigate('/login');
    }
  }, [userEmail, navigate]);

  // 🔹 Fetch user data from backend
  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:5000/user/${userEmail}`)
        .then(response => setUserData(response.data))
        .catch(error => console.error("Error fetching user data:", error));

      // Fetch user's submitted issues
      axios.get(`http://localhost:5000/issues/${userEmail}`)
        .then(response => setIssues(response.data))
        .catch(error => console.error("Error fetching user issues:", error));
    }
  }, [userEmail]);

  // 🔹 Update user address
  const updateAddress = () => {
    axios.put('http://localhost:5000/update-address', {
      Email: userEmail,
      address: newAddress
    })
      .then(response => {
        alert("Address updated successfully!");
        setUserData(response.data.user);
      })
      .catch(error => alert("Failed to update address"));
  };


  const downloadPdf = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/issues/pdf/${userEmail}`, {
        responseType: 'blob' // 📂 Important to handle file download
      });

      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'User_Issues_Report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("No Issues Record found");
    }
  };



  if (!userData) {
    return <h2>Loading profile...</h2>;
  }

  return (
    <div className='Profile'>
      <div className='profile-cover'>
        <div className="profile-nanu">
        <h1>Profile</h1>
        <div className="profile-container">
          <p><strong>Full Name:</strong> {userData.firstName} {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.Email}</p>
          <p><strong>Phone:</strong> {userData.PhoneNo}</p>
          <div className="profile-address">
            <strong>Address:</strong>
            <p>{userData.address}</p>
          </div>
          <textarea
            placeholder="Enter your address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <div className='btn-update-address-div'>
            <button className='btn-update-address' onClick={updateAddress}>Update Address</button>
          </div>

          {/* 🔹 Display Issues Submitted by the User */}
          <h2 style={{marginTop: '50px'}}>Your Submitted Issues</h2>
          {issues.length === 0 ? (
            <p>No issues submitted yet.</p>
          ) : (
            <ul>
              {issues.map((issue) => (
                <li key={issue.id}>
                  <strong>{issue.title}</strong> - {issue.description}
                </li>
              ))}
            </ul>
          )}

            <div className="btn-download-pdf-div">
              <button className="btn-download-pdf" style={{backgroundColor: '#006400',color: 'white',borderRadius: '30px'}} onClick={downloadPdf}>
                Download Issues Report (PDF)
              </button>
            </div>

        </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;




