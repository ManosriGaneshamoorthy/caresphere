package com.example.manosri.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.manosri.Model.UserDetails;
import com.example.manosri.Service.UserDetailsService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/userdetails")
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping
    public UserDetails createUserDetails(@RequestBody UserDetails userDetails) {
        // Save user details to the database
        return userDetailsService.saveUserDetails(userDetails);
    }

    @GetMapping
    public List<UserDetails> getAllUserDetails() {
        // Get all user details from the database
        return userDetailsService.getAllUserDetails();
    }

    @GetMapping("/user")
public UserDetails getDetailsByUser(@RequestParam String username) {
    return userDetailsService.getDetailsByUser(username).stream().findFirst().orElse(null);
}

}
