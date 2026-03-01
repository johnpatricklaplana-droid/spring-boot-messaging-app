package com.example.demo.Repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Model.Friend;
import com.example.demo.Model.User;

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
    int acceptFriendRequest(@Param("requestFromId") Integer requestFromId,
                     @Param("requestToId") Integer requestToId,
                     @Param("acceptedAt") LocalDateTime datetime);

    @Query("""
    SELECT f
    FROM Friend f
    JOIN FETCH f.requestTo
    JOIN FETCH f.requestFrom
    WHERE (f.requestFrom.id = :userId OR f.requestTo.id = :userId)
    AND f.status = 'accepted'
    """)
    List<Friend> FriendsList(@Param("userId") int userId);

    @Query("""
    SELECT f
    FROM Friend f
    WHERE (
        ( f.requestTo = :currentUserId AND f.requestFrom = :userId )
          OR 
        ( f.requestFrom = :currentUserId AND f.requestTo = :userId ) 
    )
    AND 
    status = 'accepted'
    """)
    Friend checkIfFriends(@Param("currentUserId") User currentUserId, @Param("userId") User userId);

}
