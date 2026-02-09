package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.Conversation;
import com.example.demo.Model.ConversationMember;
import com.example.demo.Model.User;

public interface ConversationMemberRepository extends JpaRepository<ConversationMember, Integer> {

    @Query("""
            SELECT m
            FROM ConversationMember m
            WHERE m.userId.id = :userId
           """)
    List<ConversationMember> findConversationMemberByUserId(@Param("userId") int userId);

    boolean existsByConversationIdAndUserId(Conversation conversationId, User friendId);
    
}
