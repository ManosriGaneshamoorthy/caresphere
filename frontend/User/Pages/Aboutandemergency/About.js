import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import logo from '../../Assets/image.png';
import NavBar from '../Navbar';

const About = () => {
  return (
    <div>
      <NavBar/>
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">Welcome to CareSphere</h1>
          <p className="about-subtitle">Your trusted healthcare companion</p>
        </div>
        <div className="about-content">
          <p className="about-description">
            CareSphere is a comprehensive healthcare app designed to make medical care more accessible and convenient for everyone. Our mission is to provide a seamless experience for users to book appointments with doctors, find medical professionals based on their medical history, and access emergency services when needed.
          </p>
          <div className="about-mission">
            <h2 className="about-mission-title">Our Mission</h2>
            <p className="about-mission-description">
              Our mission is to enhance the accessibility and convenience of medical care through innovative technology and dedicated service. We aim to create a healthcare ecosystem that is user-friendly, efficient, and reliable for patients and medical professionals alike.
            </p>
          </div>
          <div className="about-vision">
            <h2 className="about-vision-title">Our Vision</h2>
            <p className="about-vision-description">
              At CareSphere, we envision a future where healthcare is accessible, affordable, and convenient for everyone. We strive to make a positive impact on the lives of our users by providing them with the best possible medical care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
