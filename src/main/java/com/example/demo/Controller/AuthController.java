package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.Model.User;
import com.example.demo.Service.AuthService;

@Controller
public class AuthController {

    @Autowired
    AuthService service;
    
    @PostMapping("/signup")
    @ResponseBody
    public ResponseEntity<String> signUp(@RequestBody User user) {
        service.signUp(user);
        return ResponseEntity.ok("not bad");
    }

    @GetMapping("/testing")
    @ResponseBody
    public List<User> GetUsersForTesting () {
        return service.getUserSTesting();
    }

    //TODO:
    // @PutMapping
    // @ResponseBody
    // public ResponseEntity<String> updateUser (@RequestBody User user) {
    //     service.updateUser(user);
    //     return ResponseEntity.ok("Good one");
    // }
 
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> UserExistHandler (UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).body(ex.getMessage());
    }
    
}
