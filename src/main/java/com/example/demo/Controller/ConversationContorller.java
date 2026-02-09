package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ConversationMemberDTO;
import com.example.demo.Service.ConversationService;

@RestController
public class ConversationContorller {
    
    @Autowired
    ConversationService service;

    @GetMapping("/getConversationId/{userId}")
    public List<ConversationMemberDTO> getConversationId(@PathVariable int userId) {
       return service.getConversationId(userId);
    }

    @GetMapping("/getUserConversation/{userId}/{friendId}")
    public Integer getUserConversation (@PathVariable int userId, @PathVariable int friendId) {
        return service.getUserConversation(userId, friendId);
    }

}
