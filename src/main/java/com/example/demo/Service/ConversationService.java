package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.ConversationMemberDTO;
import com.example.demo.Model.Conversation;
import com.example.demo.Model.ConversationMember;
import com.example.demo.Model.User;
import com.example.demo.Repository.ConversationMemberRepository;
import com.example.demo.Repository.ConversationRepository;
import com.example.demo.Repository.MessagesRepository;

import jakarta.persistence.EntityManager;


@Service
public class ConversationService {
    
    @Autowired
    ConversationMemberRepository convoMemberRepo;

    @Autowired
    EntityManager entityManager;

    @Autowired
    MessagesRepository messagesRepo;

    @Autowired
    ConversationRepository convoRepo;
    
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
            dto.setConversationId(cm.getConversationId());
            dto.setUserId(cm.getUserId());

            memberList.add(dto);
        }

        return memberList;
    }

    public Integer getUserConversation(int userId, int friendId) {
        
        List<ConversationMember> conversationIdList = convoMemberRepo.findConversationMemberByUserId(userId);

        User proxyfriendId = entityManager.getReference(User.class, friendId);

        for (ConversationMember cm: conversationIdList) {
            
            boolean friendExist = convoMemberRepo.existsByConversationIdAndUserId(cm.getConversationId(), proxyfriendId);

            if(friendExist) {
                return cm.getConversationId().getId();
            }
        }
        return null;
    }

    public List<Conversation> getConversationList(int userId) {
        
        List<Conversation> conversationWithItsMembers = new ArrayList<>();

        //get user conversation ids using userId
        List<ConversationMember> convomember = convoMemberRepo.findByUserId(
            entityManager.getReference(User.class, userId)
        );
        
        for (ConversationMember convo: convomember) {
            conversationWithItsMembers.add(
                convoRepo.findById(convo.getConversationId().getId())
                .orElseThrow(() -> new RuntimeException("conversation not found"))
            );
        }
        
        return conversationWithItsMembers;
    }
}
