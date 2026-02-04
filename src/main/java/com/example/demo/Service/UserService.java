package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.ConversationMember;
import com.example.demo.Repository.AuthRepository;
import com.example.demo.Repository.ConversationMemberRepository;

@Service
public class UserService {
    
    @Autowired
    AuthRepository userRepo;

    @Autowired
    ConversationMemberRepository convoMemberRepo;

    public int getConversationId (int userId) {
        
        ConversationMember member = convoMemberRepo.findConversationMemberByUserId(userId);

        return member.getConversationId().getId();
    }
} 
