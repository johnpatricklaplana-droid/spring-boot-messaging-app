package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.example.demo.Model.Conversation;
import com.example.demo.Model.Messages;
import com.example.demo.Model.ReadMessages;
import com.example.demo.Model.User;
import com.example.demo.Repository.MessagesRepository;
import com.fasterxml.jackson.databind.node.ObjectNode;

import io.jsonwebtoken.io.IOException;
import jakarta.persistence.EntityManager;

@Service
public class SendMessageLive {

        @Autowired
        EntityManager entityManager;

        @Autowired
        MessagesRepository messageRepo;

        @Autowired
        MessagesService messagesService;
    
        public void handleTextMessageType(ObjectNode messageObject, TextMessage message, Map<Integer, Set<WebSocketSession>> conversationSession) throws IOException, java.io.IOException {
        
        int conversation_id = messageObject.get("conversation_id").asInt();
        String TextMessage = messageObject.get("text_message").asText();
        int sender = messageObject.get("sender").asInt();
        
        Messages messages = new Messages();
        messages.setConversationId(entityManager.getReference(Conversation.class, conversation_id));
        messages.setTextMessage(TextMessage);
        messages.setSenderId(entityManager.getReference(User.class, sender));
        messages.setSentAt(LocalDateTime.now());

        Set<WebSocketSession> chat = conversationSession.get(conversation_id); 

        try {
            messageRepo.save(messages);

            messageObject.put("message_id", messages.getId());
            messageObject.put("type", "text_message");
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        for (WebSocketSession c : chat) {
            if(c.isOpen()) {
                c.sendMessage(new TextMessage(messageObject.toString()));
            }
        }
    }
                                           
    public void handleSeenMessageLive (ObjectNode messageObject,
                                               TextMessage message,
                                               Map<Integer, Set<WebSocketSession>> conversationSession) throws java.io.IOException {
        int conversation_id = messageObject.get("conversationId").asInt();
        int user_id = messageObject.get("userId").asInt();
        Set<WebSocketSession> chat = conversationSession.get(conversation_id);

        try {
            ReadMessages readM = messagesService.seenMessages(user_id, conversation_id);
        
            messageObject.put("lastMessageRead", readM.getLastMessageRead());
            messageObject.put("type", "seen_message");
            messageObject.put("lastMessageRead", readM.getLastMessageRead());
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (WebSocketSession client : chat) {
            if(client.isOpen()) {
                client.sendMessage(new TextMessage(messageObject.toString()));
            }
        }
    }

}
