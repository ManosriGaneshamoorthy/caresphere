package com.example.manosri.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.manosri.Model.Appointments;
import com.example.manosri.Repository.AppointmentsRepository;
@Service
public class AppointmentsService {

    @Autowired
    private AppointmentsRepository appointmentRepository;

    public List<Appointments> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointments> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointments saveAppointment(Appointments appointment) {
        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public long countAppointments() {
        return appointmentRepository.count();
    }

    public List<Appointments> getAppointmentsByUsername(String username) {
        return appointmentRepository.findByUsername(username);
    }
    

    public List<Appointments> getAppointmentsByDoctorusernameAndStatus(String doctorusername, String status) {
        return appointmentRepository.findByDoctorusernameAndStatus(doctorusername, status);
    }
    public void markAsCompleted(Long id) {
        Optional<Appointments> appointmentOpt = appointmentRepository.findById(id);
        if (appointmentOpt.isPresent()) {
            Appointments appointment = appointmentOpt.get();
            appointment.setStatus("completed");
            appointmentRepository.save(appointment);
        } else {
            throw new RuntimeException("Appointment not found");
        }
    }

    public void markAsAccepted(Long id) {
        Optional<Appointments> appointmentOpt = appointmentRepository.findById(id);
        if (appointmentOpt.isPresent()) {
            Appointments appointment = appointmentOpt.get();
            appointment.setStatus("accepted");
            appointmentRepository.save(appointment);
        } else {
            throw new RuntimeException("Appointment not found");
        }
    }
    
}