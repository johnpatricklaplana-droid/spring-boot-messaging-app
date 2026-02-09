package com.example.demo.WebSocket.WebSocketHandler;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.demo.DTO.ConversationMemberDTO;
import com.example.demo.Service.ConversationService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    Map<Integer, Set<WebSocketSession>> conversationSession = new ConcurrentHashMap<>();

    final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    ConversationService service;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        
        String param = session.getUri().getQuery();

        int userId = Integer.parseInt(param.split("=")[1]);

        List<ConversationMemberDTO> conversationMember = service.getConversationId(userId);



        for (ConversationMemberDTO d : conversationMember) {
            conversationSession.putIfAbsent(d.getConversationId(), ConcurrentHashMap.newKeySet());
            Set<WebSocketSession> chatRoom = conversationSession.get(d.getConversationId());

            chatRoom.add(session);
        }    
        
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        
        JsonNode messageObject = mapper.readTree(message.getPayload());

        Set<WebSocketSession> chat = conversationSession.get(0); 
        
        System.out.println(messageObject.get("sender") + ": " + messageObject.get("text_message"));
        System.out.println("sent to: " + messageObject.get("sent_to"));
        System.out.println(messageObject.get("conversation_id"));

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {       
        

    }
}
