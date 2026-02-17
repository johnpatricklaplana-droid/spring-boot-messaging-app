package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.ReadMessages;

public interface ReadMessagesRepository extends JpaRepository<ReadMessages, Integer> {

    @Query(
    value = """
    SELECT DISTINCT ON (user_id) *
    FROM message_reads
    WHERE conversation_id = :conversationId
    ORDER BY user_id, last_message_read DESC
    """
    )
List<ReadMessages> findByConversationId(@Param("conversationId") int conversationId, Pageable pageable);

    
}
