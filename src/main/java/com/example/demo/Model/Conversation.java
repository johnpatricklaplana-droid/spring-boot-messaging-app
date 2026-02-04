package com.example.demo.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "conversations")
@NoArgsConstructor
@Getter
@Setter
public class Conversation {
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    Integer id;

    String conversationName;
    LocalDateTime createdAt;

}
