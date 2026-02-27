package com.example.demo.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.AuthService;
import com.example.demo.Service.ConversationMemberService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class ConversationMemberController {

    @Autowired
    ConversationMemberService convoService;

    @Autowired
    AuthService authService;
    
    @PostMapping("/conversation-member")
    public ResponseEntity<?> createGroupChat (
        @RequestBody Map<String, Object> requestBody,
        HttpServletRequest request
    ) {
        authService.isAuthorized(request);

        @SuppressWarnings("unchecked")
        List<Integer> members_id = (List<Integer>) requestBody.get("members");
        String group_name = (String) requestBody.get("group_name");

        convoService.createGroupChat(members_id, group_name); 
        
        return ResponseEntity
            .status(201)
            .body("{ \"response\": \"good one\"}");
    }

}
