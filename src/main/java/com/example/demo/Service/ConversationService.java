package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.ConversationMemberDTO;
import com.example.demo.Model.ConversationMember;
import com.example.demo.Repository.AuthRepository;
import com.example.demo.Repository.ConversationMemberRepository;


@Service
public class ConversationService {

    @Autowired
    AuthRepository userRepo;
    
    @Autowired
    ConversationMemberRepository convoMemberRepo;
    
    public List<ConversationMemberDTO> getConversationId (int userId) {
       
        List<ConversationMember> member = convoMemberRepo.findConversationMemberByUserId(userId);
        
        if(member == null) {
            throw new RuntimeException("You have no friend? AHHAHAHAHA");
        }
      
        List<ConversationMemberDTO> memberList = new ArrayList<>();

        for (ConversationMember cm : member) {
            ConversationMemberDTO dto = new ConversationMemberDTO();

            dto.setId(cm.getId());
            dto.setJoinedAt(cm.getJoinedAt());
            dto.setConversationId(cm.getConversationId().getId());
            dto.setUserId(cm.getUserId().getId());

            memberList.add(dto);
        }

        return memberList;
    }

}
