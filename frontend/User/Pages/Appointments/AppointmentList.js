import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Table, TableBody, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AppointmentList = ({ appointments, onDelete }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <Grid container spacing={2} direction="column" alignItems="center">
      {appointments.map((appointment, index) => (
        <Grid item key={index} xs={12} sm={10} md={8} lg={6}>
          <Card className="appointment-card" onClick={() => handleSelectAppointment(appointment)}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {appointment.patientName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {appointment.appointmentDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {appointment.appointmentTime}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">
                      {appointment.doctor_email}
                    </Typography>
                  </TableCell>
                  
                </TableRow>
              </TableBody>
            </Table>
          </Card>
          {selectedAppointment && selectedAppointment === appointment && (
            <Card className="appointment-details-card">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Appointment Details
                </Typography>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          <strong>Patient Name:</strong>
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
                          <strong>Doctor Mail:</strong>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" component="p">
                          {appointment.doctor_email}
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
                className="delete-button"
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

export default AppointmentList;
