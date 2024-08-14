package com.example.manosri.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.manosri.Model.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}