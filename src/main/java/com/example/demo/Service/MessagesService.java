package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Conversation;
import com.example.demo.Model.Messages;
import com.example.demo.Model.ReadMessages;
import com.example.demo.Model.User;
import com.example.demo.Repository.MessagesRepository;
import com.example.demo.Repository.ReadMessagesRepository;

import jakarta.persistence.EntityManager;

@Service
public class MessagesService  {

    @Autowired
    MessagesRepository messagesRepo;

    @Autowired
    ReadMessagesRepository readMessagesRepo;

    @Autowired
    EntityManager entityManager;
    
    //TODO: I FORGOT WHERE I USE THIS ONE I THINK I DON'T NEED IT ANYMORE?
    public List<Messages> getMessages(int sentBy, int conversationId) {
        
        
        User sent_by_user = entityManager.getReference(User.class, sentBy);
        Conversation conversation_id = entityManager.getReference(Conversation.class, conversationId);
       
        return messagesRepo.findBysenderIdAndConversationId(sent_by_user, conversation_id);

    }

    public ReadMessages seenMessages(Integer userId, Integer conversationId) {

        Pageable pageable = PageRequest.of(0, 1);
        List<Messages> lastMessage = messagesRepo.findByConversationId(
            entityManager.getReference(Conversation.class, conversationId), 
            pageable
        );

        ReadMessages readM = new ReadMessages();
    
        try {
            readM.setLastMessageRead(lastMessage.get(0).getId());
            readM.setUser(entityManager.getReference(User.class, userId));
            readM.setConversation(entityManager.getReference(Conversation.class, conversationId));
            readM.setReadAt(LocalDateTime.now());
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        try {
            readMessagesRepo.save(readM);
            return readM;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    public List<Messages> getMessages(int conversationId) {
       
        return messagesRepo.findByConversationId(
            entityManager.getReference(Conversation.class, conversationId)
        );
        
    }
    
}
