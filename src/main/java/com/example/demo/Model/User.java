package com.example.demo.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor  
@Getter
@Setter
@Table(name="Users")
public class User {
    
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private Integer id;
    private String username;
    private String email;
    private String password;
    private String emailVerificationToken;

}
