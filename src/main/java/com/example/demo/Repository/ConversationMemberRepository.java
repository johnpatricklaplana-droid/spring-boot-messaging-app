package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.ConversationMember;

public interface ConversationMemberRepository extends JpaRepository<ConversationMember, Integer> {

    @Query("""
            SELECT m
            FROM ConversationMember m
            WHERE m.userId.id = :userId
           """)
    ConversationMember findConversationMemberByUserId(@Param("userId") int userId);
    
}
