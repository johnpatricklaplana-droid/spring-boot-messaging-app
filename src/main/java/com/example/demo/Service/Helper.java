package com.example.demo.Service;

import org.springframework.stereotype.Component;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class Helper {
    
    public String extractToken(HttpServletRequest request) {

        String token = null;

        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if(cookie.getName().equals("token")) {
                token = cookie.getValue();
                return token;
            }
        }

        return null;
    }

}
