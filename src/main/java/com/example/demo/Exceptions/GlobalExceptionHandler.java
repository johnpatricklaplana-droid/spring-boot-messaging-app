package com.example.demo.Exceptions;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MessageNotFoundException.class)
    public ResponseEntity<?> handleMessageNotFound(MessageNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatusCode.valueOf(404))
            .body("message does not exist bodys");
    }
}
