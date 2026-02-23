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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.DTO.UserDTO;
import com.example.demo.Exceptions.UnauthorizedException;
import com.example.demo.Exceptions.UserAlreadyExistsException;
import com.example.demo.Exceptions.UserDontExistsException;
import com.example.demo.Model.User;
import com.example.demo.Service.AuthService;
import com.example.demo.Service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class AuthController {

    @Autowired
    AuthService service;

    @Autowired
    UserService userServie;

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

    @GetMapping("/index")
    public String serveMainPage (Model model, HttpServletRequest request) {

        String userId = service.isAuthorized(request);
        User user = userServie.getUser(Integer.parseInt(userId));
       
        model.addAttribute("imagePath", "/getProfilePic/" + userId + ".png");
        model.addAttribute("userId", userId);
        model.addAttribute("email", user.getEmail());

        return "index";
    }

    @GetMapping("/personprofile/{userId}/{currentUserId}")
    public String PersonProfile (Model model, @PathVariable int userId, @PathVariable int currentUserId) {
        model.addAttribute("imagePath", "/getProfilePic/" + currentUserId + ".png");
        model.addAttribute("currentUserId", currentUserId);

        model.addAttribute("name", null);
        model.addAttribute("userId", userId);
        model.addAttribute("imagePathForFriend", "/getProfilePic/" + userId + ".png");
         
        return "PersonProfile";
    }

    @GetMapping("/menu/{currentUserId}")
    public  String menu (Model model, @PathVariable int currentUserId) {
        User user = userServie.getUser(currentUserId);

        model.addAttribute("imagePath", "/getProfilePic/" + currentUserId + ".png");
        model.addAttribute("email", user.getEmail());
        model.addAttribute("userId", currentUserId);

        return "Menu";
    }

    @GetMapping("/search/{name}")
    @ResponseBody
    public List<UserDTO> searchUser (@PathVariable String name) {
        return service.searchUsers(name);
    }
    
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> UserExistHandler (UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatusCode.valueOf(409)).body(ex.getMessage());
    }
    
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<String> Unauthorized (UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(ex.getMessage());
    }
    
    @ExceptionHandler(UserDontExistsException.class)
    public ResponseEntity<String> UserDontExist (UserDontExistsException ex) {
        return ResponseEntity.status(HttpStatusCode.valueOf(401)).body(ex.getMessage());
    }
    
}
