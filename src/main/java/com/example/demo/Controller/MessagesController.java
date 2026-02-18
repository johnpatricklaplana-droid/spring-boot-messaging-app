package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Messages;
import com.example.demo.Service.MessagesService;

@RestController
public class MessagesController {

    @Autowired
    MessagesService messageService;
    
    @GetMapping("getMessages/{conversationId}")
    public List<Messages> getMessages (@PathVariable int conversationId) {
        return  messageService.getMessages(conversationId);
    }

    @PostMapping("seenMessagesLive/{userId}/{conversationId}")
    public void seenMessagesLive (@PathVariable Integer userId, @PathVariable Integer conversationId) {
        messageService.seenMessages(userId, conversationId);
    }

}
