package com.example.demo.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "conversation_members")
public class ConversationMember {
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    Integer id;
    LocalDateTime joinedAt;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    Conversation conversationId;

    @OneToOne
    @JoinColumn(name = "user_id")
    User userId;
}
