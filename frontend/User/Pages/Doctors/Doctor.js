import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import logo from '../../Assets/image.png';
import NavBar from "../Navbar";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctors from the backend
    fetch("http://localhost:8080/doctors/all")
      .then((response) => response.json())
      .then((data) => setDoctors(data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const handleConfirmAppointment = () => {
    if (!appointmentDate || !appointmentTime) {
      alert("Please select both a date and time for your appointment.");
      return;
    }

    const username = localStorage.getItem('username'); // Get username from local storage

    if (!username) {
      alert("Please log in to confirm your appointment.");
      return;
    }

    // Create appointment object
    const appointment = {
      doctorname: selectedDoctor.doctor, // Adjust field names as necessary
      doctorEmail: selectedDoctor.email, // Adjust field names as necessary
      PatientName: selectedDoctor.name, // Adjust field names as necessary
      doctorSpecialty: selectedDoctor.specialty, // Adjust field names as necessary
      doctorHospital: selectedDoctor.hospital, // Adjust field names as necessary
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      username: username,
      doctorImageUrl: selectedDoctor.imageUrl // Adjust field names as necessary
    };

    // Send appointment details to the backend
    fetch("http://localhost:8080/appointments/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    })
      .then((response) => response.json())
      .then(() => {
        // Navigate to the ThankYou page with appointment details
        navigate("/thankyou", {
          state: {
            doctor: selectedDoctor,
            date: appointmentDate,
            time: appointmentTime,
          },
        });
        // Close modal after confirming
        setSelectedDoctor(null);
      })
      .catch((error) => console.error("Error creating appointment:", error));
  };

  const handleCancelAppointment = () => {
    setSelectedDoctor(null); // Close modal without confirming
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const title = doctor.name.toLowerCase(); // Assuming you use `name` for doctor name
    const description = doctor.description.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return title.includes(searchTermLower) || description.includes(searchTermLower);
  });

  return (
    <div>
      <NavBar />
      <div className="doctor-container">
        <h1 className="header">Book an Appointment with Our Doctors</h1>
        <div
          className="search-container"
          style={{
            display: 'center',
            justifyContent: 'center',
            marginBottom: '2px',
            padding:'10px',
            width:'200px',
          }}
        >
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{
              width: '100%',
              maxWidth: '400px',
              padding: '10px',
              fontSize: '10px',
              border: '2px solid #ddd',
              borderRadius: '5px',
              
            }}
          />
        </div>
        <div className="doctor-grid">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              img={doctor.imageUrl} // Adjust field names as necessary
              title={doctor.doctor} // Adjust field names as necessary
              description={doctor.name}
              Specialty={doctor.specialty} // Adjust field names as necessary
            >
              <div className="button-container">
                <button
                  className="book-appointment-btn"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  Book Appointment
                </button>
              </div>
            </Card>
          ))}
        </div>

        {selectedDoctor && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2 className="modal-header">Book Appointment with Dr. {selectedDoctor.name}</h2>
              <form className="appointment-form">
                <label htmlFor="date">Select Date:</label>
                <input
                  type="date"
                  id="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="form-input"
                />
                <label htmlFor="time">Select Time:</label>
                <input
                  type="time"
                  id="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="form-input"
                />
                <div className="modal-buttons">
                  <button
                    type="button"
                    className="confirm-btn"
                    onClick={handleConfirmAppointment}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancelAppointment}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctor;
