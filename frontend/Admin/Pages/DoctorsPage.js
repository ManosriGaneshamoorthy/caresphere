import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');

  // Function to fetch doctor data
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8080/doctors/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // Fetch doctors when component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Handle toggle active status
  const handleToggleActive = async (doctorId) => {
    try {
      // Update local state first
      setDoctors(prevDoctors =>
        prevDoctors.map(doctor =>
          doctor.id === doctorId ? { ...doctor, isActive: !doctor.isActive } : doctor
        )
      );
      // Update in the backend
      const response = await fetch(`http://localhost:8080/doctors/${doctorId}/update-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !doctors.find(doc => doc.id === doctorId).isActive }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error toggling active status:', error);
    }
  };

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.email.toLowerCase().includes(search.toLowerCase()) ||
      doctor.phone.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Handle doctor removal
  const handleRemoveDoctor = async (doctorId, index) => {
    try {
      const response = await fetch(`http://localhost:8080/doctors/${doctorId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newDoctors = [...doctors];
      newDoctors.splice(index, 1);
      setDoctors(newDoctors);
    } catch (error) {
      console.error('Error removing doctor:', error);
    }
  };

  return (
    <div className="admin-dashboard" style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <div className="sidebar" style={{ width: 250, backgroundColor: '#2a3f54', color: '#fff', padding: 0, position: 'fixed', top: 0, bottom: 0, left: 0 }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <img src={logo} alt="Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
          <h2 style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>CARESPHERE</h2>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ padding: 15, borderBottom: '1px solid #3a4a5a' }}>
            <Link to="/admin/home" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #3a4a5a' }}>
            <Link to="/admin/doc" style={{ color: '#fff', textDecoration: 'none' }}>Doctors</Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #3a4a5a' }}>
            <Link to="/admin/add" style={{ color: '#fff', textDecoration: 'none' }}>Add Doctors</Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #3a4a5a' }}>
            <Link to="/admin/user" style={{ color: '#fff', textDecoration: 'none' }}>Users</Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #3a4a5a' }}>
            <Link to="/admin/logout" style={{ color: '#fff', textDecoration: 'none' }}>Logout</Link>
          </li>
        </ul>
      </div>
      <div className="main-content" style={{ flex: 1, padding: '20px 40px', marginLeft: 250 }}>
        <div className="header" style={{ backgroundColor: '#2a3f54', padding: 15, borderRadius: 5, marginBottom: 20, color: 'white' }}>
          <h1 style={{ margin: 0 }}>Doctors</h1>
        </div>
        <div className="content" style={{ padding: 20 }}>
          <div className="searchArea" style={{ display: 'center', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <input
              type="text"
              placeholder="Search..."
              className="doctorListSearch"
              onChange={handleSearch}
              value={search}
              style={{ width: 300, padding: 10, fontSize: 16, borderRadius: 10, border: '1px solid #ddd' }}
            />
          </div>
          <div className="doctorList" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {filteredDoctors.map((doctor, index) => (
              <div className="doctor-card" key={doctor.id} style={{ backgroundColor: '#fff', border: '1px solid #ddd', padding: 20, borderRadius: 10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <div className="doctor-image" style={{ marginBottom: 20 }}>
                  {doctor.imageUrl ? (
                    <img src={doctor.imageUrl} alt="Doctor" style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />
                  ) : (
                    <div style={{ width: '200px', height: '200px', backgroundColor: '#ccc', borderRadius: '10px' }} />
                  )}
                </div>
                <div className="doctor-info">
                  <h3 className="username" style={{ margin: '10px 0' }}>{doctor.name}</h3>
                  <p className="email" style={{ margin: '5px 0', color: '#555' }}>Email: <a href={`mailto:${doctor.email}`} style={{ color: '#007bff', textDecoration: 'none' }}>{doctor.email}</a></p>
                  <p className="phone" style={{ margin: '5px 0', color: '#555' }}>Phone: {doctor.phone}</p>
                  <p className="specialty" style={{ margin: '5px 0', color: '#555' }}>Specialty: {doctor.specialty}</p>
                  <p className="hospital" style={{ margin: '5px 0', color: '#555' }}>Hospital: {doctor.hospital}</p>
                  <p className="yearsOfExperience" style={{ margin: '5px 0', color: '#555' }}>Years of Experience: {doctor.yearsOfExperience}</p>
                  <p className="description" style={{ margin: '5px 0', color: '#555' }}>{doctor.description}</p>
                  <div className="button-group" style={{ marginTop: 10 }}>
                    <button
                      className="remove-button"
                      onClick={() => handleRemoveDoctor(doctor.id, index)}
                      style={{ padding: '5px 10px', borderRadius: 5, backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer', marginRight: 10 }}
                    >
                      Delete
                    </button>
                    <button
                      className="toggle-button"
                      onClick={() => handleToggleActive(doctor.id)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 5,
                        backgroundColor: doctor.isActive ? '#28a745' : '#ffc107',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {doctor.isActive ? 'On' : 'Off'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
