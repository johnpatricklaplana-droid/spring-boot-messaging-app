package com.example.demo.WebSocket.WebSocketHandler;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ChatWebSocketHandler extends TextWebSocketHandler {

    Map<Integer, Set<WebSocketSession>> conversationSession = new HashMap<>();

    final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        
        String param = session.getUri().getQuery();

        int conversation_id = Integer.parseInt(param.split("=")[1]);

        session.getAttributes().put("conversation_id", conversation_id);

        conversationSession.putIfAbsent(conversation_id, new HashSet<>());
        Set<WebSocketSession> chatRoom = conversationSession.get(conversation_id);

        chatRoom.add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        JsonNode json = mapper.readTree(message.getPayload());
        int conversatonId = (Integer) session.getAttributes().get("conversation_id");
        String text = json.get("text_message").asText();
    
        Set<WebSocketSession> chatRoom = conversationSession.get(conversatonId);

        for (WebSocketSession convo : chatRoom) {
            if(convo.isOpen()) {
                convo.sendMessage(new TextMessage(text));
            }
        }

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {       
        int conversation_id = (Integer) session.getAttributes().get("conversation_id");

        Set<WebSocketSession> chatRoom = conversationSession.get(conversation_id);

        chatRoom.remove(session);

    }
}
