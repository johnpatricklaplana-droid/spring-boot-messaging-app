package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.MessagesAndLastMessageReadDTO;
import com.example.demo.Exceptions.MessageNotFoundException;
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

    public List<MessagesAndLastMessageReadDTO> getMessages(int conversationId) {

        List<MessagesAndLastMessageReadDTO> DTO = new ArrayList<>();
       
        List<Messages> messages = messagesRepo.findByConversationId(
            entityManager.getReference(Conversation.class, conversationId)
        );

        List<ReadMessages> lastMessageRead = readMessagesRepo.findByConversationId(conversationId);

        for (Messages m: messages) {
            MessagesAndLastMessageReadDTO dto = new MessagesAndLastMessageReadDTO();

            Map<Integer, String> peopleWhoSeenTheMessage = new HashMap<>();

            dto.setMessageId(m.getId());
            dto.setSenderId(m.getSenderId());
            dto.setSentAt(m.getSentAt());
            dto.setTextMessage(m.getTextMessage());

            for (ReadMessages readM : lastMessageRead) {
                if(readM.getLastMessageRead() >= m.getId()) {
                    peopleWhoSeenTheMessage.put(readM.getUser().getId(), "read");
                } else {
                    peopleWhoSeenTheMessage.put(readM.getUser().getId(), "not_read");
                }
            }
            dto.setPeopleWhoSeenTheMessage(peopleWhoSeenTheMessage);
            dto.setConversation(m.getConversationId());
            
            DTO.add(dto);
        }        
        
        return DTO;
    }

    public MessagesAndLastMessageReadDTO getLastMessage(int conversationId) {

        Pageable pageable = PageRequest.of(0, 1);
        List<Messages> lastMessage = messagesRepo.findByConversationId(
            entityManager.getReference(Conversation.class, conversationId),
            pageable
        );

        Messages realOne = lastMessage.get(0);

        MessagesAndLastMessageReadDTO dto = new MessagesAndLastMessageReadDTO();
        dto.setMessageId(realOne.getId());
        dto.setConversation(realOne.getConversationId());
        dto.setSenderId(realOne.getSenderId());
        dto.setSentAt(realOne.getSentAt());
        dto.setTextMessage(realOne.getTextMessage());

        Map<Integer, String> idk = new HashMap<>();
        
        List<ReadMessages> lastMessageRead = readMessagesRepo.findByConversationId(conversationId);
        for (ReadMessages readMessages : lastMessageRead) {
            if(readMessages.getLastMessageRead() >= realOne.getId()) {
                idk.put(readMessages.getUser().getId(), "read");
            } else {
                idk.put(readMessages.getUser().getId(), "not_read");
            }
        }

        dto.setPeopleWhoSeenTheMessage(idk);

        return dto;
    }

    public void deleteMessage(int messageId) {
        messagesRepo.deleteById(messageId);
    }

    public void editMessage(int messageId, String textMessage) {
        messagesRepo.findById(messageId)
            .orElseThrow(() -> new MessageNotFoundException("{ \"response\": \"message not found\" } "));

        messagesRepo.editMessage(messageId, textMessage);
    }
    
}