import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import './Navbar.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// Import the logo image
import logo from '../Assets/logo.png'; // Adjust the path according to where your logo is stored

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve username from local storage on component mount
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('username');
        setUsername(null);
        navigate('/');
        Swal.fire(
          'Logged out!',
          'You have been logged out.',
          'success'
        );
      }
    });
  };

  const fetchUserDetails = async () => {
    try {
      const username = localStorage.getItem('username');
      if (username) {
        const response = await axios.get('http://localhost:8080/userdetails/user', {
          params: { username }
        });
        console.log('User details fetched:', response.data);
        setUserDetails(response.data); // Update state with user details
      } else {
        console.error('Username not found in localStorage');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleUserIconClick = async () => {
    await fetchUserDetails();
    Swal.fire({
      title: 'User Details',
      html: `
        <p><strong>Username:</strong> ${userDetails?.username || 'N/A'}</p>
        <p><strong>Emergency Contact:</strong> ${userDetails?.emergencyContact || 'N/A'}</p>
        <p><strong>Consulting Doctor:</strong> ${userDetails?.consultingDoctor || 'N/A'}</p>
        <p><strong>Date of Birth:</strong> ${userDetails?.dateOfBirth ? new Date(userDetails.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Address:</strong> ${userDetails?.address || 'N/A'}</p>
        <p><strong>Phone Number:</strong> ${userDetails?.phone || 'N/A'}</p>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Edit',
      cancelButtonText: 'Close'
    }).then((result) => {
      if (result.isConfirmed) {
        handleEditUserDetails();
      }
    });
  };

  const handleEditUserDetails = () => {
    Swal.fire({
      title: 'Edit User Details',
      html: `
        <input id="edit-username" class="swal2-input" placeholder="Username" value="${userDetails?.username || ''}">
        <input id="edit-emergency-contact" class="swal2-input" placeholder="Emergency Contact" value="${userDetails?.emergencyContact || ''}">
        <input id="edit-consulting-doctor" class="swal2-input" placeholder="Consulting Doctor" value="${userDetails?.consultingDoctor || ''}">
        <input id="edit-date-of-birth" type="date" class="swal2-input" value="${userDetails?.dateOfBirth ? new Date(userDetails.dateOfBirth).toISOString().split('T')[0] : ''}">
        <input id="edit-address" class="swal2-input" placeholder="Address" value="${userDetails?.address || ''}">
        <input id="edit-phone" class="swal2-input" placeholder="Phone Number" value="${userDetails?.phone || ''}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        const updatedUserDetails = {
          ...userDetails,
          username: document.getElementById('edit-username').value,
          emergencyContact: document.getElementById('edit-emergency-contact').value,
          consultingDoctor: document.getElementById('edit-consulting-doctor').value,
          dateOfBirth: document.getElementById('edit-date-of-birth').value,
          address: document.getElementById('edit-address').value,
          phone: document.getElementById('edit-phone').value,
        };
        updateUserDetails(updatedUserDetails);
      }
    });
  };

  const updateUserDetails = async (updatedUserDetails) => {
    try {
      const response = await axios.put('http://localhost:8080/userdetails/user', updatedUserDetails);
      Swal.fire('Success', 'User details updated successfully!', 'success');
      setUserDetails(updatedUserDetails); // Update local state
    } catch (error) {
      Swal.fire('Error', 'Failed to update user details', 'error');
      console.error('Error updating user details:', error);
    }
  };

  return (
    <nav>
      <div className="wrapper">
        <div className="logoo">
          <img src={logo} alt="Logo" className="logo-image" /> {/* Add the logo image */}
          <Link to="/">Caresphere</Link>
        </div>
        <ul className={`nav-links ${dropdownOpen ? 'open' : ''}`}>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li onClick={handleDropdownToggle}>
            <Link to="/doctors" className="desktop-item">Doctor</Link>
          </li>
          <li>
            <Link to="/appointments" className='desktop-item'>Appointments</Link>
          </li>
          <li>
            <Link to="/emergency" className='desktop-item'>Emergency</Link>
          </li>
          <li>
            {username ? (
              <>
                <span onClick={handleUserIconClick} className='desktop-item'>
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span onClick={handleLogout} className='desktop-item'>Logout</span>
              </>
            ) : (
              <Link to="/login" className='desktop-item'>Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
