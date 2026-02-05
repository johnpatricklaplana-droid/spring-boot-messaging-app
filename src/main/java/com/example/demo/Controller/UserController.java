package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ConversationMemberDTO;
import com.example.demo.Service.UserService;

@Controller
@RestController
public class UserController {

    @Autowired
    UserService service;
    
    @GetMapping("getConversationId/{userId}")
    public ConversationMemberDTO getConversationId (@PathVariable int userId) {
        return service.getConversationId(userId);
    }

}
