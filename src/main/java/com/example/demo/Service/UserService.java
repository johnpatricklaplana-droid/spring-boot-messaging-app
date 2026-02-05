package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.ConversationMemberDTO;
import com.example.demo.Model.ConversationMember;
import com.example.demo.Repository.AuthRepository;
import com.example.demo.Repository.ConversationMemberRepository;

@Service
public class UserService {
    
    @Autowired
    AuthRepository userRepo;

    @Autowired
    ConversationMemberRepository convoMemberRepo;

    public ConversationMemberDTO getConversationId (int userId) {
        
        ConversationMember member = convoMemberRepo.findConversationMemberByUserId(userId);

        if(member == null) {
            throw new RuntimeException("You have no friend? AHHAHAHAHA");
        }

        ConversationMemberDTO dto = new ConversationMemberDTO();

        dto.setId(member.getId());
        dto.setJoinedAt(member.getJoinedAt());
        dto.setConversationId(member.getConversationId().getId());
        dto.setUserId(member.getUserId().getId());

        return dto;
    }
} 
