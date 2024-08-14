import React, { useState, useEffect } from 'react';
import './Patients.css';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      // Retrieve doctor (username) from local storage
      const doctor = localStorage.getItem('username');

      if (!doctor) {
        console.error('No doctor username found in local storage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/doctor/ongoing?doctor=${encodeURIComponent(doctor)}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data); // Check the fetched data
          setPatients(data);
        } else {
          console.error('Failed to fetch patients, status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="admin-dashboard">
      <div className="sidebar" style={{ width: 250, backgroundColor: '#333', color: '#fff', padding: 0, position: 'fixed', top: 0, bottom: 0, left: 0 }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: 20, paddingLeft: 5 }}>
          <img src={logo} alt="Logo" />
          <h2>CARESPHERE</h2>
        </div>
        <ul>
          <li style={{ padding: 10, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/home" style={{ color: '#fff', textDecoration: 'none' }}>
              Dashboard
            </Link>
          </li>
          <li style={{ padding: 10, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/pat" style={{ color: '#fff', textDecoration: 'none' }}>
              Patients
            </Link>
          </li>
          <li style={{ padding: 10, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/app" style={{ color: '#fff', textDecoration: 'none' }}>
              Appointments
            </Link>
          </li>
          <li style={{ padding: 10, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/his" style={{ color: '#fff', textDecoration: 'none' }}>
              Consultation History
            </Link>
          </li>
          <li style={{ padding: 10, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/logout" style={{ color: '#fff', textDecoration: 'none' }}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className="main-content" style={{ marginLeft: 200, padding: 50 }}>
        <div className="header">
          <h1>Ongoing Patients</h1>
        </div>
        <div className="content">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ padding: 10, border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: 10, border: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: 10, border: '1px solid #ddd' }}>Email</th>
                <th style={{ padding: 10, border: '1px solid #ddd' }}>Phone</th>
                <th style={{ padding: 10, border: '1px solid #ddd' }}>Illness</th>
                <th style={{ padding: 10, border: '1px solid #ddd' }}>Doctor</th>
                <th style={{ padding: 10, border: '1px solid #ddd' }}>Treatment</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td style={{ padding: 10, border: '1px solid #ddd' }}>{patient.id}</td>
                  <td style={{ padding: 10, border: '1px solid #ddd' }}>{patient.name}</td>
                  <td style={{ padding: 10, border: '1px solid #ddd' }}>{patient.email}</td>
                  <td style={{ padding: 10, border: '1px solid #ddd' }}>{patient.phone}</td>
                  <td style={{ padding: 10, border: '1px solid #ddd' }}>{patient.illness}</td>
                  <td style={{ padding: 10, border: '1px solid #ddd' }}>{patient.doctor}</td>
                  <td style={{ padding: 10, border: '1px solid #ddd' }}>{patient.treatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;
