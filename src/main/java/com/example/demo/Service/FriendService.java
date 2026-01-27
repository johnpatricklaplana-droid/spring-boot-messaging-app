package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Model.Friend;
import com.example.demo.Repository.FriendRepository;

@Service
public class FriendService {

    @Autowired
    FriendRepository friendRepo;

    public void addFriend(Friend friend) {
        friend.setStatus("pending");
        friendRepo.save(friend);
    }

    public void getFriendRequest(int peopleYouManyKnowId) {
          
    }
    
}
