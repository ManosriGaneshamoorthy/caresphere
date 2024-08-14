import React, { useState, useEffect } from 'react';
import './ConHis.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';

const ConHis = () => {
  const [consultations, setConsultations] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState({});

  useEffect(() => {
    const fetchConsultations = async () => {
      const doctor = localStorage.getItem('username');

      if (!doctor) {
        console.error('No doctor username found in local storage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/doctor/completed?doctor=${encodeURIComponent(doctor)}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched consultations:', data); // Log the entire response for debugging
          setConsultations(data);
        } else {
          console.error('Failed to fetch consultations, status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching consultations:', error);
      }
    };

    fetchConsultations();
  }, []);

  const handleViewDetails = (consultation) => {
    console.log('Selected consultation:', consultation); // Log the consultation being viewed
    setSelectedConsultation(consultation);
    setShowDetails(true);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h2>CARESPHERE</h2>
        </div>
        <ul>
          <li>
            <Link to="/doctor/home">Dashboard</Link>
          </li>
          <li>
            <Link to="/doctor/pat">Patients</Link>
          </li>
          <li>
            <Link to="/doctor/app">Appointments</Link>
          </li>
          <li>
            <Link to="/doctor/his">Consultation History</Link>
          </li>
          <li>
            <Link to="/doctor/logout">Logout</Link>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Consultation History</h1>
        </div>
        <div className="content">
          <div className="consultation-list">
            {consultations.map((consultation) => (
              <div className="consultation-card" key={consultation.id}>
                <h4>{consultation.doctorName}</h4>
                <p>Patient: {consultation.name}</p>
                
                <button onClick={() => handleViewDetails(consultation)}>View Details</button>
              </div>
            ))}
          </div>
          {showDetails && (
            <div className="consultation-details">
              <h2>Consultation Details</h2>
              <p><strong>Doctor:</strong> {selectedConsultation.doctor || 'N/A'}</p>
              <p><strong>Patient:</strong> {selectedConsultation.name || 'N/A'}</p>
              <p><strong>Illness:</strong> {selectedConsultation.illness || 'N/A'}</p>
              <p><strong>Diagnosis:</strong> {selectedConsultation.status || 'N/A'}</p>
              <p><strong>Treatment:</strong> {selectedConsultation.treatment || 'N/A'}</p>
              <button onClick={() => setShowDetails(false)}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConHis;
