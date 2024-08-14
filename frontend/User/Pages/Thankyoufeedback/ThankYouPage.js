import React from 'react';
import './ThankYouPage.css'; // Import custom styles
import { Link, useLocation } from 'react-router-dom';
import logo from '../../Assets/image.png'; // Adjust the path as necessary

const ThankYou = () => {
  const location = useLocation();
  const { doctor, date, time } = location.state;

  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <span className="logo-text">CARESPHERE</span>
        </div>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/doctors" className="nav-link">Doctors</Link></li>
          <li><Link to="/appointments" className="nav-link">Appointments</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/emergency" className="nav-link emergency-link">Emergency</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
        </ul>
      </nav>
      <div className="thank-you-container">
        <h1 className="thank-you-header">Thank You for Booking!</h1>
        <div className="appointment-details">
          <p>Doctor: {doctor.name}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
        </div>
        <Link to="/" className="home-link">Return to Home Page</Link>
      </div>
    </div>
  );
};

export default ThankYou;
