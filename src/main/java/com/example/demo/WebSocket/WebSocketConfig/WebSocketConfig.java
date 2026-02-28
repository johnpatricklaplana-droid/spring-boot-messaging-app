package com.example.demo.WebSocket.WebSocketConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.example.demo.WebSocket.WebSocketHandler.ChatWebSocketHandler;

@Configuration
@EnableWebSocket
@Component
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    ChatWebSocketHandler chat;

    @Autowired
    AuthHandShakeInterceptor authHandshake;
    
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {


        registry.addHandler(chat, "/chat")
                .addInterceptors(authHandshake)
                .setAllowedOrigins("*");
    }
}
