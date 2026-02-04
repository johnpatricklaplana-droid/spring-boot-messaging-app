package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Conversation;

public interface ConversationRepository extends JpaRepository<Conversation, Integer> {
    
}
