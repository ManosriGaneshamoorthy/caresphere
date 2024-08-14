import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Quote.css';

const Quote = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Get the username from local storage
    const username = localStorage.getItem('username');
    
    // Check if the user is logged in
    if (username) {
      // Navigate to /doctors if logged in
      navigate('/doctors');
    } else {
      // Navigate to /login if not logged in
      navigate('/login');
    }
  };

  return (
    <div>
      <div className="quote-section">
        <div className="quote-content">
          <h1>Welcome to Our Doctor Consultant Service</h1>
          <p>Caresphere is a digital healthcare platform ensures the patient care through integrated technology solutions</p>
          <button className="appointment-button" onClick={handleButtonClick}>Book an Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default Quote;