package com.example.demo.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    private LocalDateTime requestedAt;
    private LocalDateTime acceptedAt;
    private String status;

    @ManyToOne
    @JoinColumn(name = "requestTo")
    private User requestTo;

    @ManyToOne
    @JoinColumn(name = "requestFrom")
    private User requestFrom;
    
}
