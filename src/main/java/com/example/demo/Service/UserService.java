package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.User;
import com.example.demo.Repository.AuthRepository;



@Service
public class UserService {

    @Autowired
    AuthRepository authRepo;
    
    public User getUser (int userId) {
        User user = authRepo.findById(userId).
            orElseThrow(() -> new RuntimeException("user not found"));
        return user;
    }
} 
