package com.example.demo.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Exceptions.UserAlreadyExistsException;
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

    public void loginUser(User user) {
        if(!authRepo.existsByEmail(user.getEmail())) {
            // TODO:
        }
    }

    public List<User> testing() {
        return authRepo.findAll();
    }


}
