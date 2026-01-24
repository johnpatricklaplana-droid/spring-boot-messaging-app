package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.Exceptions.UnauthorizedException;
import com.example.demo.Exceptions.UserAlreadyExistsException;
import com.example.demo.Model.User;
import com.example.demo.Service.AuthService;

import jakarta.servlet.http.HttpServletRequest;

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
    @ResponseBody
    public ResponseEntity<String> logIn (@RequestBody User user) {
        String token = service.loginUser(user);
  
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(60*60)
                .sameSite("Strict")
                .build();
            
        return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .body("{ \"response\": \"Login success\" }");
        
    }

    @GetMapping("/test")
    @ResponseBody
    public List<User> testing () {
        return service.testing();
    }

    @GetMapping("/index")
    public String serveMainPage (Model model, HttpServletRequest request) {

        String username = service.isAuthorized(request); // TODO: Verify authorization and use the username later for personalized content

        model.addAttribute("imagePath", "/getProfilePic/1.png");

        return "index";
    }
    
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> UserExistHandler (UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).body(ex.getMessage());
    }
    
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<String> Unauthorized (UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(ex.getMessage());
    }
    
}
