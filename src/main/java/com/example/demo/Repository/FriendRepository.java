package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.Friend;

public interface FriendRepository extends JpaRepository<Friend, Integer> {
    
    @Query("""
    SELECT f
    FROM Friend f
    JOIN FETCH f.requestFrom 
    WHERE f.requestTo.id = :requestToId
    """)
    List<Friend> getFriendRequests(@Param("requestToId") Integer requestToId);

}
