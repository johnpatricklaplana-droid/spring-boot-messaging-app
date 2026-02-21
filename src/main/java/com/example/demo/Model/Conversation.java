package com.example.demo.Model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
    private Integer id;

    private String conversationName;
    private LocalDateTime createdAt;

    @ManyToMany
    @JoinTable(
        name = "conversation_members",
        joinColumns = @JoinColumn(name = "conversation_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> members;
}
