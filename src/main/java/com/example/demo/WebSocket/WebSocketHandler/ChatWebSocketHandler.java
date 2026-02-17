package com.example.demo.WebSocket.WebSocketHandler;

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
import com.example.demo.Service.SendMessageLive;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityManager;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    Map<Integer, Set<WebSocketSession>> conversationSession = new ConcurrentHashMap<>();

    final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    ConversationService service;

    @Autowired
    EntityManager entityManager;

    @Autowired
    SendMessageLive sendMessageLive;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        
        String param = session.getUri().getQuery();

        int userId = Integer.parseInt(param.split("=")[1]);

        List<ConversationMemberDTO> conversationMember = service.getConversationId(userId);



        for (ConversationMemberDTO d : conversationMember) {
            conversationSession.putIfAbsent(d.getConversationId().getId(), ConcurrentHashMap.newKeySet());
            Set<WebSocketSession> chatRoom = conversationSession.get(d.getConversationId().getId());

            chatRoom.add(session);
        }      
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        
        JsonNode messageObject = mapper.readTree(message.getPayload());

        String type = messageObject.get("type").asText();

        switch (type) {
            case "text_message":
                sendMessageLive.handleTextMessageType(messageObject, message, conversationSession);
                break;
            case "seen_message":
                sendMessageLive.handleSeenMessageLive(messageObject, message);
                break;
            case "who_seen_message":
                sendMessageLive.whoSeenTheMessageLive();
                break;
            default:
                // Handle unknown message type if necessary
                break;
        }

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {       
        
        conversationSession.values().forEach(chatRoom -> chatRoom.remove(session));
    }
}
