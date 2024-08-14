import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HomePage = () => {
  // Data for the first bar chart
  const appointmentsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Appointments',
        data: [30, 45, 20, 50, 75, 60],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)', // Hover effect color
        hoverBorderColor: 'rgba(75, 192, 192, 1)', // Hover border color
      },
    ],
  };

  // Data for the second bar chart
  const revenueData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [5000, 7000, 6000, 8000],
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 159, 64, 0.4)', // Hover effect color
        hoverBorderColor: 'rgba(255, 159, 64, 1)', // Hover border color
      },
    ],
  };

  // Options for the bar charts
  const chartOptions = {
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
      intersect: false, // Hover effect is active even when the pointer is not directly over a bar
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
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
          text: 'Value',
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
            <Link to="/admin/home" style={{ color: '#fff', textDecoration: 'none', display: 'block', fontSize: 18 }}>
              Dashboard
            </Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/admin/doc" style={{ color: '#fff', textDecoration: 'none', display: 'block', fontSize: 18 }}>
              Doctors
            </Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/admin/add" style={{ color: '#fff', textDecoration: 'none', display: 'block', fontSize: 18 }}>
              Add Doctors
            </Link>
          </li>
          <li style={{ padding: 15, borderBottom: '1px solid #444' }}>
            <Link to="/admin/user" style={{ color: '#fff', textDecoration: 'none', display: 'block', fontSize: 18 }}>
              Users
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
          <h2 style={{ fontSize: 22, marginBottom: 20 }}>Recent Appointments</h2>
          <div className="table-container" style={{ overflowX: 'auto', padding: 20, borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.1)', backgroundColor: '#ffffff' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f1f1' }}>
                  <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left', fontWeight: 'bold' }}>Date</th>
                  <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left', fontWeight: 'bold' }}>Doctor</th>
                  <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left', fontWeight: 'bold' }}>Patient</th>
                  <th style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left', fontWeight: 'bold' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>2022-01-01</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Dr. Smith</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>John Doe</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Attended</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>2022-01-02</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Dr. Johnson</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Jane Doe</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Unattended</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>2022-01-03</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Dr. Brown</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Bob Smith</td>
                  <td style={{ border: '1px solid #ddd', padding: 12, textAlign: 'left' }}>Attended</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bar-chart" style={{ padding: 20, marginTop: 20, borderTop: '1px solid #ddd', backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, fontSize: 22 }}>Appointments Overview</h3>
            <Bar data={appointmentsData} options={chartOptions} />
          </div>
          <div className="bar-chart" style={{ padding: 20, marginTop: 20, borderTop: '1px solid #ddd', backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, fontSize: 22 }}>Revenue Overview</h3>
            <Bar data={revenueData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
