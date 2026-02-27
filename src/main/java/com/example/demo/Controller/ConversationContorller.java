package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ConversationMemberDTO;
import com.example.demo.Model.Conversation;
import com.example.demo.Service.AuthService;
import com.example.demo.Service.ConversationService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class ConversationContorller {
    
    @Autowired
    ConversationService service;

    @Autowired
    AuthService authService;

    @GetMapping("/getConversationId/{userId}")
    public List<ConversationMemberDTO> getConversationId(@PathVariable int userId) {
       return service.getConversationId(userId);
    }

    @GetMapping("/getUserConversation/{userId}/{friendId}")
    public Integer getUserConversation (@PathVariable int userId, @PathVariable int friendId) {
        return service.getUserConversation(userId, friendId);
    }

    @GetMapping("/getConversationList")
    public List<Conversation> getConversationList (HttpServletRequest request) {
        int userId = Integer.parseInt(authService.isAuthorized(request));
         
        return service.getConversationList(userId);
    }

}
