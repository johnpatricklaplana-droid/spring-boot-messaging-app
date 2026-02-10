package com.example.demo.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Setter
@Getter
@Table
public class Messages {
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User senderId;
 
    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversationId;

    private String textMessage;

    private LocalDateTime sentAt;
}
