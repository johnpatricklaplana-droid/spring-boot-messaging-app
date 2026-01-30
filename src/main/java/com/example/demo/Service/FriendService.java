package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.type.descriptor.java.LocalDateTimeJavaType;
import org.hibernate.type.descriptor.jdbc.LocalDateTimeJdbcType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.FriendDTO;
import com.example.demo.Model.Friend;
import com.example.demo.Model.User;
import com.example.demo.Repository.AuthRepository;
import com.example.demo.Repository.FriendRepository;

import jakarta.transaction.Transactional;

@Service
public class FriendService {

    @Autowired
    FriendRepository friendRepo;

    @Autowired
    AuthRepository authRepo;

    public void addFriend(int requestTo, int requestFrom) {
    
        User requestToUser = authRepo.findById(requestTo)
            .orElseThrow(() -> new RuntimeException());

        User requestFromUser = authRepo.findById(requestFrom)
            .orElseThrow(() -> new RuntimeException());

        Friend friend = new Friend();
        friend.setRequestedAt(LocalDateTime.now());
        friend.setRequestFrom(requestFromUser);
        friend.setRequestTo(requestToUser);
        friend.setStatus("pending");

        friendRepo.save(friend);
        
    }

    public List<FriendDTO> getFriendRequest(Integer requestToId) {

        List<FriendDTO> dto = new ArrayList<>();

        List<Friend> friends = friendRepo.getFriendRequests(requestToId);

        for (Friend f : friends) {
            FriendDTO fDTO = new FriendDTO();
            fDTO.setId(f.getId());
            fDTO.setRequestFrom(f.getRequestFrom());
            fDTO.setStatus(f.getStatus());
            dto.add(fDTO);
        }

        return dto;

    }

    @Transactional
    public void acceptFriendRequest(int idFromFriendRequest, int currentUserId) {
        
        friendRepo.acceptUpdate(idFromFriendRequest, currentUserId, LocalDateTime.now());
    }

    public List<User> getFriends(int currentUserId) {
        // authRepo.
        return null;
    }
    
}
