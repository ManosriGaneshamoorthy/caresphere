import React, { useState, useEffect } from 'react';
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const doctorUsername = localStorage.getItem('username'); // Retrieve username from local storage
    
      if (!doctorUsername) {
        setError(new Error('No doctor username found in local storage'));
        setLoading(false);
        return;
      }
    
      try {
        const response = await axios.get('http://localhost:8080/appointments/doctor', {
          params: { 
            doctorusername: doctorUsername,
            status: 'active'  // Assuming you want to fetch active appointments, adjust as needed
          } 
        });
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching appointments: {error.message}</p>;

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ width: 250, backgroundColor: '#333', color: '#fff', padding: 0, position: 'fixed', top: 0, bottom: 0, left: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '20px 0' }}>
          <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />
          <h2 style={{ fontSize: 20, margin: 0 }}>CARESPHERE</h2>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/home" style={{ color: '#fff', textDecoration: 'none', display: 'block', width: '100%' }}>Dashboard</Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/pat" style={{ color: '#fff', textDecoration: 'none', display: 'block', width: '100%' }}>Patients</Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/app" style={{ color: '#fff', textDecoration: 'none', display: 'block', width: '100%' }}>Appointments</Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/his" style={{ color: '#fff', textDecoration: 'none', display: 'block', width: '100%' }}>Consultation History</Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/logout" style={{ color: '#fff', textDecoration: 'none', display: 'block', width: '100%' }}>Logout</Link>
          </li>
        </ul>
      </div>
      <div style={{ marginLeft: 250, padding: '60px 20px', width: 'calc(100% - 250px)' }}>
        <div style={{ marginBottom: 30 }}>
          <h1 style={{ fontSize: 32, margin: 0, color: '#333' }}>Appointments</h1>
        </div>
        <div style={{ backgroundColor: '#f9f9f9', padding: 20, borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ marginBottom: 20 }}>All Appointments:</h2>
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              style={{
                maxWidth: '800px',
                margin: '20px auto',
                padding: 20,
                backgroundColor: '#fff',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                  borderBottom: '1px solid #ddd',
                }}
              >
                <h3>Appointment {appointment.id}</h3>
                <p style={{ fontSize: 16, color: '#666' }}>
                  {appointment.appointmentDate} {appointment.appointmentTime}
                </p>
              </div>
              <div
                style={{
                  padding: 20,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p>
                    <strong>Patient Name:</strong> {appointment.username}
                  </p>
                  <p>
                    <strong>Doctor Name:</strong> {appointment.doctorname}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Illness:</strong> {appointment.illness}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;