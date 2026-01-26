package com.example.demo.Model;

import java.time.LocalDateTime;

import com.example.demo.Enum.FriendStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name = "friends")
public class Friend {

    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private Integer id;
    
    private int requestFrom;
    private int requestTo;

    private LocalDateTime requestedAt;
    private LocalDateTime acceptedAt;
    private FriendStatus status;
}
