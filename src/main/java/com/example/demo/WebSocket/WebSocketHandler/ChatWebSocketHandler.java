

package com.example.demo.WebSocket.WebSocketHandler;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


public class ChatWebSocketHandler extends TextWebSocketHandler {

    private static final Set<WebSocketSession> sessions =
        ConcurrentHashMap.newKeySet();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("[OPEN] sessionId=" + session.getId());
        sessions.add(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
        throws Exception {

        System.out.println("[RECEIVE] from=" + session.getId()
                + " payload=" + message.getPayload());

        System.out.println("[BROADCAST] to " + sessions.size() + " sessions");
        
        for (WebSocketSession s : sessions) {
            System.out.println(
                "[SEND] to=" + s.getId() +
                " open=" + s.isOpen()
            );
            if(s.isOpen()) {
                s.sendMessage(message);
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
        throws Exception {

        System.out.println(
            "[CLOSE] sessionId=" + session.getId() +
            " status=" + status
        );
        
        sessions.remove(session);
    }

}
