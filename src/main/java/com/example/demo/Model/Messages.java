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
    Integer id;
    
    @ManyToOne
    @JoinColumn(name = "sender_id")
    User userId;
 
    @ManyToOne
    Conversation conversationId;

    LocalDateTime sentAt;
}
