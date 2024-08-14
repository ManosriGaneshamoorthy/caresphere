import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all the necessary components
import About from '../User/Pages/Aboutandemergency/About';
import EmergencyPage from '../User/Pages/Aboutandemergency/EmergencyPage';
import AppointmentPage from '../User/Pages/Appointments/AppointmentPage';
import Doctor from '../User/Pages/Doctors/Doctor';
import Login from '../User/Pages/Loginandsignup/Login';
import Register from '../User/Pages/Loginandsignup/Register';
import ThankYou from '../User/Pages/Thankyoufeedback/ThankYouPage';
import Feedback from '../User/Pages/Thankyoufeedback/Feedback';
import UserDetails from '../User/Pages/Loginandsignup/UserDetails';

// Doctor pages
import DoctorHomePage from '../Doctor/Pages/Homepage1';
import Patients from '../Doctor/Pages/Patients';
import DoctorAppointments from '../Doctor/Pages/Appointments';
import ConHis from '../Doctor/Pages/ConHis';
import DoctorLogin from '../Doctor/Pages/DoctorLogin';

// Admin pages
import AdminHomePage from '../Admin/Pages/HomePage';
import DoctorsPage from '../Admin/Pages/DoctorsPage';
import Users from '../Admin/Pages/Users';
import AddDoctor from '../Admin/Pages/AddDoctor';
import AdminLogin from '../Admin/Pages/AdminLogin';
import Home from '../User/Pages/Home';

const AppRouting = () => {
  return (
    
    <Routes>
      {/* User routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/userdetails" element={<UserDetails />} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="/appointments" element={<AppointmentPage />} />
      <Route path="/doctors" element={<Doctor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thankyou" element={<ThankYou />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/userlogin" element={<Login />} />
      <Route path="/logout" element={<Home />} />

      {/* Doctor routes */}
      <Route path="/doctor" element={<DoctorLogin />} />
      <Route path="/doctor/home" element={<DoctorHomePage />} />
      <Route path="/doctor/pat" element={<Patients />} />
      <Route path="/doctor/app" element={<DoctorAppointments />} />
      <Route path="/doctor/his" element={<ConHis />} />
      <Route path="/doctor/logout" element={<Login />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/home" element={<AdminHomePage />} />
      <Route path="/admin/doc" element={<DoctorsPage />} />
      <Route path="/admin/add" element={<AddDoctor />} />
      <Route path="/admin/user" element={<Users />} />
      <Route path="/admin/logout" element={<Login />} />
    </Routes>
  );
};

export default AppRouting;