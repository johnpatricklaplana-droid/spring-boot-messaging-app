package com.example.demo.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Exceptions.UnauthorizedException;
import com.example.demo.Exceptions.UserAlreadyExistsException;
import com.example.demo.Exceptions.UserDontExistsException;
import com.example.demo.Model.User;
import com.example.demo.Repository.AuthRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class AuthService {
    
    @Autowired
    AuthRepository authRepo;
    @Autowired
    JwtService jwtService;

    public void signUp(User user) {

        if(authRepo.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistsException("USER ALREADY EXIST");
        }

        String token = UUID.randomUUID().toString();
        user.setEmailVerificationToken(token);
        authRepo.save(user);
    }

    public String loginUser(User user) {

        User userFromDB = authRepo.findUserByEmail(user.getEmail()).orElseThrow(() -> new RuntimeException("user not found"));

        if(!userFromDB.getPassword().equals(user.getPassword())) {
           throw new UserDontExistsException("user not found");
        } 

        String username = userFromDB.getEmail();
        
        String token = jwtService.generateToken(username);

        return token;
    }

    public List<User> testing() {
        return authRepo.findAll();
    }

    public String isAuthorized (HttpServletRequest request) {
        
        String token = null;

        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for (Cookie c: cookies) {
                if("token".equals(c.getName())) {
                    token = c.getValue();
                }
            }
        }

        if(token == null) {
            throw new UnauthorizedException("Unauthorized");
        }

        if(!jwtService.isTokenValid(token)) {
            throw new UnauthorizedException("Unauthorized");
        }

        return jwtService.extractUsername(token);
        
    }

}
