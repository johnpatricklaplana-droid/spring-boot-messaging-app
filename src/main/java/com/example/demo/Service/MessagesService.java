package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    
    //TODO: I FORGOT WHERE I USE THIS ONE I THINK I DON'T NEED IT ANYMORE?
    public List<Messages> getMessages(int sentBy, int conversationId) {
        
        
        User sent_by_user = entityManager.getReference(User.class, sentBy);
        Conversation conversation_id = entityManager.getReference(Conversation.class, conversationId);
       
        return messagesRepo.findBysenderIdAndConversationId(sent_by_user, conversation_id);

    }

    public void seenMessages(Integer userId, Integer conversationId) {

        Pageable pageable = PageRequest.of(0, 1);
        List<Messages> lastMessage = messagesRepo.findByConversationIdAndUserId(
            entityManager.getReference(Conversation.class, conversationId), 
            entityManager.getReference(User.class, userId),
            pageable
        );

        for (Messages m : lastMessage) {
            System.out.println(m.getId());
            System.out.println(m.getSenderId());
            System.out.println(m.getConversationId());
        }

    }

    public List<Messages> getMessages(int conversationId) {
       
        return messagesRepo.findByConversationId(
            entityManager.getReference(Conversation.class, conversationId)
        );
        
    }
    
}
