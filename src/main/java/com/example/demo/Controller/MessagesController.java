package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.MessagesAndLastMessageReadDTO;
import com.example.demo.Service.MessagesService;

@RestController
public class MessagesController {

    @Autowired
    MessagesService messageService;
    
    @GetMapping("getMessages/{conversationId}")
    public ResponseEntity<List<MessagesAndLastMessageReadDTO>> getMessages (@PathVariable int conversationId) {
        List<MessagesAndLastMessageReadDTO> response = messageService.getMessages(conversationId);
        return ResponseEntity.status(200).body(response);
    }

    @PostMapping("seenMessagesLive/{userId}/{conversationId}")
    public ResponseEntity<?> seenMessagesLive (@PathVariable Integer userId, @PathVariable Integer conversationId) {
        messageService.seenMessages(userId, conversationId);
        return ResponseEntity.status(201).body(null);
    }

    @GetMapping("getLastMessages/{conversationId}")
    public ResponseEntity<MessagesAndLastMessageReadDTO> getLastMessage (@PathVariable int conversationId) {
        MessagesAndLastMessageReadDTO response = messageService.getLastMessage(conversationId);
        return ResponseEntity.status(200).body(response);
    }
                       
}
