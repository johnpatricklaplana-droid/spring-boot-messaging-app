package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Conversation;
import com.example.demo.Model.Messages;
import com.example.demo.Model.User;
import com.example.demo.Repository.MessagesRepository;

import jakarta.persistence.EntityManager;

@Service
public class MessagesService  {

    @Autowired
    MessagesRepository messagesRepo;

    @Autowired
    EntityManager entityManager;

    public List<Messages> getMessages(int sentBy, int conversationId) {
        
        
        User sent_by_user = entityManager.getReference(User.class, sentBy);
        Conversation conversation_id = entityManager.getReference(Conversation.class, conversationId);
       
        return messagesRepo.findBysenderIdAndConversationId(sent_by_user, conversation_id);

    }
    
}
