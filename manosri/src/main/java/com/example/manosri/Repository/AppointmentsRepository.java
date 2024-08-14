package com.example.manosri.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.manosri.Model.Appointments;

    @Repository
public interface AppointmentsRepository extends JpaRepository<Appointments, Long> {
    List<Appointments> findByUsername(String username);
    List<Appointments> findByDoctorusernameAndStatus(String doctorusername, String status);
    List<Appointments> findByUsernameAndStatusIn(String username, List<String> statuses);
}