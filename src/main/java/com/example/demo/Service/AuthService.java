package com.example.demo.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Controller.UserAlreadyExistsException;
import com.example.demo.Model.User;
import com.example.demo.Repository.AuthRepository;

@Service
public class AuthService {
    
    @Autowired
    AuthRepository authRepo;

    public void signUp(User user) {

        if(authRepo.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("USER ALREADY EXIST");
        }
        String token = UUID.randomUUID().toString();
        user.setEmailVerificationToken(token);
        authRepo.save(user);
    }

    public List<User> getUserSTesting() {
        return authRepo.findAll();
    }

    //TODO: 
    // public void updateUser(User user) {
    //     authRepo.save(user);
    // }


}
