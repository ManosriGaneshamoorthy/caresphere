import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';

const base64Encode = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const AddDoctor = () => {
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    specialty: '',
    hospital: '',
    yearsOfExperience: '',
    description: '',
    imageUrl: '',
  });

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await base64Encode(file);
        setImagePreview(base64);
        setNewDoctor({ ...newDoctor, imageUrl: base64 });
      } catch (error) {
        console.error('Error converting to base64:', error);
        setMessage('Error converting image to base64.');
      }
    } else {
      setMessage('Please upload a valid image file.');
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/doctors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });

      if (!response.ok) {
        throw new Error('Failed to add doctor');
      }

      setMessage('Doctor added successfully.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: ' + error.message);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setMessage('User created successfully.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: ' + error.message);
    }
  };

  const formGroupStyle = {
    marginBottom: 20,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: 5,
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const textareaStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minHeight: '100px',
  };

  const fileInputStyle = {
    display: 'block',
    marginTop: 10,
  };

  const imagePreviewStyle = {
    marginTop: 10,
    maxWidth: '200px',
    maxHeight: '200px',
    borderRadius: '10px',
    objectFit: 'cover',
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
          <h1 style={{ margin: 0 }}>Add Doctor</h1>
        </div>
        <div className="content" style={{ padding: 20 }}>
          <form>
            {/* Doctor Image */}
            <div style={formGroupStyle}>
              <label style={labelStyle}>Doctor's Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={fileInputStyle}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Doctor Preview"
                  style={imagePreviewStyle}
                />
              )}
            </div>
            {/* Doctor Details */}
            <div style={formGroupStyle}>
              <label style={labelStyle}>Full Name:</label>
              <input
                type="text"
                name="name"
                value={newDoctor.name}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter full name"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Username:</label>
              <input
                type="text"
                name="username"
                value={newDoctor.username}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter username"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Email:</label>
              <input
                type="email"
                name="email"
                value={newDoctor.email}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter email"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={newDoctor.phone}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter phone number"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Specialty:</label>
              <input
                type="text"
                name="specialty"
                value={newDoctor.specialty}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter specialty"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Hospital:</label>
              <input
                type="text"
                name="hospital"
                value={newDoctor.hospital}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter hospital"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Years of Experience:</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={newDoctor.yearsOfExperience}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="Enter years of experience"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Description:</label>
              <textarea
                name="description"
                value={newDoctor.description}
                onChange={handleInputChange}
                style={textareaStyle}
                placeholder="Enter description"
              />
            </div>
            {/* Buttons */}
            <div style={formGroupStyle}>
              <button
                type="submit"
                onClick={handleAddDoctor}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#5cb85c',
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Add Doctor
              </button>
              {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
            </div>
          </form>
          <div className="header" style={{ backgroundColor: '#2a3f54', padding: 15, borderRadius: 5, marginBottom: 20, color: 'white' }}>
            <h1 style={{ margin: 0 }}>Add User</h1>
          </div>
          <form>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Username:</label>
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleUserInputChange}
                style={inputStyle}
                placeholder="Enter username"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Email:</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleUserInputChange}
                style={inputStyle}
                placeholder="Enter email"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Password:</label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleUserInputChange}
                style={inputStyle}
                placeholder="Enter password"
              />
            </div>
            <div style={formGroupStyle}>
              <label style={labelStyle}>Role:</label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleUserInputChange}
                style={inputStyle}
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="user">User</option>
              </select>
            </div>
            <div style={formGroupStyle}>
              <button
                type="submit"
                onClick={handleCreateUser}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#5cb85c',
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Add User
              </button>
              {message && <p style={{ color: 'white', marginTop: '10px' }}>{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
