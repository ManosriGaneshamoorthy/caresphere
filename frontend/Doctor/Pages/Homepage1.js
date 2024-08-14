import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

// Register the components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const HomePage = () => {
  const [ongoingPatients, setOngoingPatients] = useState([]);
  const [completedPatients, setCompletedPatients] = useState([]);

  useEffect(() => {
    const doctorUsername = localStorage.getItem('username');
    
    fetch(`http://localhost:8080/doctor/ongoing?doctor=${doctorUsername}`)
      .then(response => response.json())
      .then(data => setOngoingPatients(data));

    fetch(`http://localhost:8080/doctor/completed?doctor=${doctorUsername}`)
      .then(response => response.json())
      .then(data => setCompletedPatients(data));
  }, []);

  const getChartData = () => {
    const ongoingData = ongoingPatients.reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const completedData = completedPatients.reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const labels = [...new Set([...Object.keys(ongoingData), ...Object.keys(completedData)])];

    return {
      labels,
      datasets: [
        {
          label: 'Ongoing Patients',
          data: labels.map(label => ongoingData[label] || 0),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Completed Patients',
          data: labels.map(label => completedData[label] || 0),
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  // Options for the line chart
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ': ' + context.raw;
          },
        },
        backgroundColor: 'rgba(0,0,0,0.7)', // Tooltip background color
        titleColor: '#fff', // Tooltip title color
        bodyColor: '#fff', // Tooltip body color
        borderColor: 'rgba(0,0,0,0.5)', // Tooltip border color
        borderWidth: 1, // Tooltip border width
      },
    },
    interaction: {
      mode: 'index',
      intersect: false, // Hover effect is active even when the pointer is not directly over a line
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          color: '#333', // Color of x-axis labels
        },
        grid: {
          color: '#ddd', // Grid line color
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Patients',
        },
        beginAtZero: true,
        ticks: {
          color: '#333', // Color of y-axis labels
        },
        grid: {
          color: '#ddd', // Grid line color
        },
      },
    },
  };

  return (
    <div className="admin-dashboard" style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <div className="sidebar" style={{ 
        width: 250, 
        background: 'linear-gradient(135deg, #2c3e50, #34495e)', // Gradient background
        color: '#fff', 
        padding: 0, 
        position: 'fixed', 
        top: 0, 
        bottom: 0, 
        left: 0, 
        boxShadow: '2px 0 5px rgba(0,0,0,0.3)', // Add shadow for better separation
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="logo" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-start', 
          padding: 20, 
          paddingLeft: 15, // Adjust padding
          borderBottom: '1px solid #444' // Border for separation
        }}>
          <img src={logo} alt="Logo" style={{ width: 40, height: 40, marginRight: 10 }} />
          <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>CARESPHERE</h2>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/home" style={{ color: '#fff', textDecoration: 'none', display: 'block', fontSize: 18 }}>
              Dashboard
            </Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/pat" style={{ color: '#fff', textDecoration: 'none', display: 'block', fontSize: 18 }}>
              Patients
            </Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/app" style={{ color: '#fff', textDecoration: 'none', display: 'block', fontSize: 18 }}>
              Appointments
            </Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/doctor/his" style={{ color: '#fff', textDecoration: 'none', display: 'block', fontSize: 18 }}>
              Consultation History
            </Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', display: 'block', fontSize: 18 }}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <div className="main-content" style={{ flex: 1, marginLeft: 250, display: 'flex', flexDirection: 'column', backgroundColor: '#f8f9fa' }}>
        <div className="header" style={{ backgroundColor: '#ffffff', padding: 20, borderBottom: '1px solid #ddd', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <h1 style={{ margin: 0, fontSize: 24 }}>Home</h1>
        </div>
        <div className="content" style={{ flex: 1, padding: 20 }}>
          <div className="line-chart" style={{ padding: 20, marginTop: 20, backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, fontSize: 22 }}>Patient Trends</h3>
            <Line data={getChartData()} options={lineOptions} />
          </div>
          {/* Add other charts or content as needed */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
