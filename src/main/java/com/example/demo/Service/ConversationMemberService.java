package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Conversation;
import com.example.demo.Model.User;
import com.example.demo.Repository.ConversationRepository;

import jakarta.persistence.EntityManager;

@Service
public class ConversationMemberService {

    @Autowired
    ConversationRepository convoRepo;

    @Autowired
    EntityManager entityManager;

    public void createGroupChat(List<Integer> members_id, String group_name) {
        
        Conversation groupChat = new Conversation();
        groupChat.setConversationName(group_name);
        groupChat.setCreatedAt(LocalDateTime.now());

        List<User> chatMember = new ArrayList<>();

        for (int userId : members_id) {
            chatMember.add(entityManager.getReference(User.class, userId));
        }

        groupChat.setMembers(chatMember);

        convoRepo.save(groupChat);

    }
    
}
