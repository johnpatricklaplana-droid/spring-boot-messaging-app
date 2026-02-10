package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Conversation;
import com.example.demo.Model.Messages;
import com.example.demo.Model.User;

public interface MessagesRepository extends JpaRepository<Messages, Integer> {

    public List<Messages> findBysenderIdAndConversationId(User sentBy, Conversation conversationId);

    public List<Messages> findByConversationId(Conversation id);
    
}
