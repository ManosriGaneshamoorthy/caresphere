package com.example.manosri.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.manosri.Model.Doctor;
import com.example.manosri.Repository.DoctorRepository;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;
    @Autowired
    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public long countDoctors() {
        return doctorRepository.count();
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}