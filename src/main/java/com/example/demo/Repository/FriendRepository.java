package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.Friend;

public interface FriendRepository extends JpaRepository<Friend, Integer> {
    
    // List<Friend> get
}
