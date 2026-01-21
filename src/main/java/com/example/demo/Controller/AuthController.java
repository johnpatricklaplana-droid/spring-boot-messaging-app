package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.Exceptions.UserAlreadyExistsException;
import com.example.demo.Model.User;
import com.example.demo.Service.AuthService;

@Controller
public class AuthController {

    @Autowired
    AuthService service;

    @PostMapping("/signup")
    @ResponseBody
    public String signUp(@RequestBody User user) {
        service.signUp(user);
        return "{ \"response\": \"good one\" }";
    }

    @PostMapping("/login")
    public String logIn (@RequestBody User user) {
        service.loginUser(user);
        return "";
    }
    
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> UserExistHandler (UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).body(ex.getMessage());
    }
    
}
