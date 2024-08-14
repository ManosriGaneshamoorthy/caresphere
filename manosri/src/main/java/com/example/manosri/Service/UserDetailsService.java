package com.example.manosri.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.manosri.Model.UserDetails;
import com.example.manosri.Repository.UserDetailsRepository;

@Service
public class UserDetailsService {
    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public UserDetails saveUserDetails(UserDetails userDetails) {
        return userDetailsRepository.save(userDetails);
    }

    public List<UserDetails> getAllUserDetails() {
        return userDetailsRepository.findAll();
    }
    
    public List<UserDetails> getDetailsByUser(String username){
        return userDetailsRepository.findByUsername(username);
    }
}