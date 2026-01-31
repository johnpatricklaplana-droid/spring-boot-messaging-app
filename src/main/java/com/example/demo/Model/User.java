package com.example.demo.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
    
    @OneToMany(mappedBy = "requestFrom")
    @JsonIgnore
    private List<Friend> sentFriendRequest;

    @OneToMany(mappedBy = "requestTo")
    @JsonIgnore
    private List<Friend> recieveFriendRequest;

}
