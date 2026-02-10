package com.example.demo.WebSocket.WebSocketHandler;

import java.time.LocalDateTime;
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
import com.example.demo.Model.Conversation;
import com.example.demo.Model.Messages;
import com.example.demo.Model.User;
import com.example.demo.Repository.MessagesRepository;
import com.example.demo.Service.ConversationService;
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
    MessagesRepository messageRepo;

    @Autowired
    EntityManager entityManager;

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

        int conversation_id = messageObject.get("conversation_id").asInt();
        String TextMessage = messageObject.get("text_message").asText();
        int sender = messageObject.get("sender").asInt();

        Messages messages = new Messages();
        messages.setConversationId(entityManager.getReference(Conversation.class, conversation_id));
        messages.setTextMessage(TextMessage);
        messages.setSenderId(entityManager.getReference(User.class, sender));
        messages.setSentAt(LocalDateTime.now());

        Set<WebSocketSession> chat = conversationSession.get(conversation_id); 

         messageRepo.save(messages);
        
        for (WebSocketSession c : chat) {
            if(c.isOpen()) {
                session.sendMessage(message);
            }
        }

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {       
        

    }
}
