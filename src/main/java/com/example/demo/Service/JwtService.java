package com.example.demo.Service;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    
    private static final String SECRET_KEY = "my-super-secret-key-1234567890123456"; // at least 32 bytes for HS256

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String username) {
        long expirationMillis = 1000 * 60 * 60; 

        return Jwts.builder()
                .setSubject(username)             
                .setIssuedAt(new Date())          
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis)) 
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // creates signature 
                .compact();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }
    
    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token); 
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token) // recreates the signature if signature is match to the token signature token is valid 
                .getBody();
    }
}
