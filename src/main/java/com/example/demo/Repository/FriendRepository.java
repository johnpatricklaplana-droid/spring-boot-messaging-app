package com.example.demo.Repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.Friend;

public interface FriendRepository extends JpaRepository<Friend, Integer> {
    
    @Query("""
    SELECT f
    FROM Friend f
    JOIN FETCH f.requestFrom 
    WHERE f.requestTo.id = :requestToId
    AND f.status = 'pending'
    """)
    List<Friend> getFriendRequests(@Param("requestToId") Integer requestToId);

    @Modifying
    @Query("""
    UPDATE Friend f
    SET f.status = 'accepted', f.acceptedAt = :acceptedAt
    WHERE f.requestTo.id = :requestToId
    AND f.requestFrom.id = :requestFromId
    """)
    int acceptUpdate(@Param("requestFromId") Integer requestFromId,
                     @Param("requestToId") Integer requestToId,
                     @Param("acceptedAt") LocalDateTime datetime);

    @Query("""
    TODO: bukas
    """)
    List<Friend> FriendsList(@Param("userId") int userId);
}
