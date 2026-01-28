package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.FriendDTO;
import com.example.demo.Model.Friend;
import com.example.demo.Model.User;
import com.example.demo.Repository.AuthRepository;
import com.example.demo.Repository.FriendRepository;

@Service
public class FriendService {

    @Autowired
    FriendRepository friendRepo;

    @Autowired
    AuthRepository authRepo;

    public void addFriend(FriendDTO friendDTO) {

        User userFrom = authRepo.findById(friendDTO.getRequestFrom())
            .orElseThrow(() -> new RuntimeException());

        User userTo = authRepo.findById(friendDTO.getRequestTo())
            .orElseThrow(() -> new RuntimeException());

        Friend friend = new Friend();
        friend.setStatus("pending");
        friend.setRequestFrom(userFrom);
        friend.setRequestTo(userTo);

        friendRepo.save(friend);
    }

    public List<Friend> getFriendRequest(Integer requestToId) {
        return friendRepo.getFriendRequests(requestToId);
    }
    
}
