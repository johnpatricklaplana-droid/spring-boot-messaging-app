package com.example.demo.WebSocket.WebSocketConfig;

import java.util.Map;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import com.example.demo.Service.AuthService;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class AuthHandShakeInterceptor implements HandshakeInterceptor {

    @Autowired
    AuthService authService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
        
                ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
                
                HttpServletRequest httpRequest = servletRequest.getServletRequest();

                int userId = Integer.parseInt(authService.isAuthorized(httpRequest));

                attributes.put("userId", userId);
 
                return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            @Nullable Exception exception) {
        // FORGET ABOUT IT
    }
    
}
