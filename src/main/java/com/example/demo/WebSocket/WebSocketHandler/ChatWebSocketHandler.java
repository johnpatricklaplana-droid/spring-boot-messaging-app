package com.example.demo.WebSocket.WebSocketHandler;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ChatWebSocketHandler extends TextWebSocketHandler {

    // Key = conversationId, Value = sessions of participants in that conversation
    private static final ConcurrentMap<Long, Set<WebSocketSession>> conversationSessions = new ConcurrentHashMap<>();

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("[OPEN] sessionId=" + session.getId());
        // nothing yet, will assign session to conversation after first message or handshake with conversationId
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {

        System.out.println("[RECEIVE] from=" + session.getId() +
                " payload=" + message.getPayload());

        // parse incoming JSON
        JsonNode jsonNode = objectMapper.readTree(message.getPayload());
        long conversationId = jsonNode.get("conversationId").asLong();
        String text = jsonNode.get("text").asText();

        // get or create the set of sessions for this conversation
        conversationSessions.putIfAbsent(conversationId, ConcurrentHashMap.newKeySet());
        Set<WebSocketSession> sessions = conversationSessions.get(conversationId);

        // add this session to the conversation (if not already present)
        sessions.add(session);

        System.out.println("[BROADCAST] to " + sessions.size() + " sessions in conversation " + conversationId);

        // broadcast message only to sessions in this conversation
        for (WebSocketSession s : sessions) {
            System.out.println("[SEND] to=" + s.getId() + " open=" + s.isOpen());
            if (s.isOpen()) {
                s.sendMessage(new TextMessage(text));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {

        System.out.println("[CLOSE] sessionId=" + session.getId() + " status=" + status);

        // remove session from all conversation sets
        conversationSessions.forEach((conversationId, sessions) -> sessions.remove(session));
    }
}
