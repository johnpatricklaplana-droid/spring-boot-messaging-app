package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.MessagesService;

@RestController
public class MessagesReadController {

    @Autowired
    MessagesService messagesService;
    
    @PutMapping("/getReadMessages/{userId}/{conversationId}")
    public String seenMessage(@PathVariable Integer userId, @PathVariable Integer conversationId) {
         messagesService.seenMessages(userId, conversationId);
         return "{ \"response\": \"good one\" }";
    }

}
