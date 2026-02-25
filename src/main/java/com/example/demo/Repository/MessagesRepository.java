package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.Conversation;
import com.example.demo.Model.Messages;
import com.example.demo.Model.User;

import jakarta.transaction.Transactional;

public interface MessagesRepository extends JpaRepository<Messages, Integer> {

    public List<Messages> findBysenderIdAndConversationId(User sentBy, Conversation conversationId);

    public List<Messages> findByConversationId(Conversation id);
    
    @Query("""
            SELECT m FROM Messages m
            WHERE m.conversationId = :conversationId
            ORDER BY m.id DESC
            """)
    List<Messages> findByConversationId(
        @Param("conversationId") Conversation conversationId,
        Pageable pageable);

    @Transactional
    @Modifying
    @Query(
        """
        UPDATE Messages m
        SET m.textMessage = :textMessage
        WHERE m.id = :messageId  
        """)
    public void editMessage(@Param("messageId") int messageId, @Param("textMessage") String textMessage);
    
}
