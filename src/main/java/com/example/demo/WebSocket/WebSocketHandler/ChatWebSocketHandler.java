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
import com.example.demo.Service.MessagesService;
import com.example.demo.Service.SendMessageLive;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Component
public class ChatWebSocketHandler extends TextWebSocketHandler {

    Map<Integer, Set<WebSocketSession>> conversationSession = new ConcurrentHashMap<>();

    final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    ConversationService service;

    @Autowired
    SendMessageLive sendMessageLive;

    @Autowired
    MessagesService messageService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        Map<String, Object> info = session.getAttributes();

        int userId = (Integer) info.get("userId");

        List<ConversationMemberDTO> conversationMember = service.getConversationId(userId);

        for (ConversationMemberDTO d : conversationMember) {
            conversationSession.putIfAbsent(d.getConversationId().getId(), ConcurrentHashMap.newKeySet());
            Set<WebSocketSession> chatRoom = conversationSession.get(d.getConversationId().getId());

            chatRoom.add(session);
        }      
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        
        ObjectNode messageObject = (ObjectNode) mapper.readTree(message.getPayload());
        
        String type = messageObject.get("type").asText();

        switch (type) {
            case "text_message" -> sendMessageLive.handleTextMessageType(messageObject, message, conversationSession);
            case "seen_message" -> sendMessageLive.handleSeenMessageLive(messageObject, message, conversationSession);
            case "typing" -> sendMessageLive.showTypingEndicator(messageObject, conversationSession);
            case "edit_message" -> { 
                int conversation_id = messageObject.get("conversation_id").asInt();
                int messageId = messageObject.get("id").asInt();
                String textMessage = messageObject.get("textMessage").asText();
                messageService.editMessage(messageId, textMessage);

                Set<WebSocketSession> chat = conversationSession.get(conversation_id);

                for (WebSocketSession member: chat) {
                    if(member.isOpen()) {
                        member.sendMessage(message);
                    }
                }
            }
            case "delete_message" -> {
                int messageId = messageObject.get("message_id").asInt();
                int conversationId = messageObject.get("conversation_id").asInt();
                int userId = messageObject.get("userId").asInt();

                Set<WebSocketSession> chat = conversationSession.get(conversationId);

                messageService.deleteMessage(messageId, userId);

                for (WebSocketSession member : chat) {
                    if(member.isOpen()) {
                        member.sendMessage(message);
                    }
                }
                
            }
            default -> {
                // Handle unknown message type if necessary
            }
        }
        
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {       
        conversationSession.values().forEach(chatRoom -> chatRoom.remove(session));
    }
}
