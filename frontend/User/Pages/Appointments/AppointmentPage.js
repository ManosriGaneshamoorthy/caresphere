import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableRow, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from '../Navbar';
import './Appointments.css';

const AppointmentList = ({ appointments, onDelete }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      {appointments.map((appointment, index) => (
        <Grid item key={index} xs={12} sm={10} md={8} lg={6}>
          <Card 
            className="appointment-card" 
            onClick={() => handleSelectAppointment(appointment)}
            sx={{ 
              '&:hover': { boxShadow: 6 }, 
              cursor: 'pointer',
              borderRadius: 2,
              backgroundColor: '#f9f9f9'
            }}
          >
            <CardContent>
              <Typography variant="h6" component="p" sx={{ fontWeight: 'bold' }}>
                {appointment.patientName}
              </Typography>
              <Typography variant="body2" component="p" color="text.secondary">
                {appointment.appointmentDate} at {appointment.appointmentTime}
              </Typography>
            </CardContent>
          </Card>
          {selectedAppointment && selectedAppointment === appointment && (
            <Card 
              className="appointment-details-card"
              sx={{
                mt: 2,
                borderRadius: 2,
                boxShadow: 4,
                backgroundColor: '#ffffff',
                padding: 2
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                  Appointment Details
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          <strong>My Name:</strong>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          {appointment.username}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          <strong>Appointment Date:</strong>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          {appointment.appointmentDate}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          <strong>Appointment Time:</strong>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          {appointment.appointmentTime}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          <strong>Doctor Email:</strong>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          {appointment.doctorEmail}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          <strong>Hospital:</strong>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          {appointment.doctorHospital}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => onDelete(appointment.id)}
                sx={{ mt: 2, mb: 2 }}
              >
                Delete
              </Button>
            </Card>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        try {
          const response = await fetch(`http://localhost:8080/appointments/user?username=${username}`);
          if (response.ok) {
            const data = await response.json();
            setAppointments(data);
            localStorage.setItem('appointments', JSON.stringify(data));
          } else {
            console.error('Failed to fetch appointments');
          }
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      }
    };
  
    fetchAppointments();
  }, []);
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/appointments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
        setAppointments(updatedAppointments);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
      } else {
        console.error('Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };
  

  return (
    <div className="appointment-page">
      <NavBar />
      <Box sx={{ textAlign: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          My Appointments
        </Typography>
      </Box>
      <div className="appointment-container">
        <AppointmentList appointments={appointments} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default AppointmentPage;
