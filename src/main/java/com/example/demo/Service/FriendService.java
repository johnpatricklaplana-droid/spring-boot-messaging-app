package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.type.descriptor.java.LocalDateTimeJavaType;
import org.hibernate.type.descriptor.jdbc.LocalDateTimeJdbcType;
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

        User userFrom = authRepo.findById(friendDTO.getRequestFrom().getId())
            .orElseThrow(() -> new RuntimeException());

        User userTo = authRepo.findById(friendDTO.getRequestTo().getId())
            .orElseThrow(() -> new RuntimeException());

        Friend friend = new Friend();
        friend.setRequestedAt(LocalDateTime.now());
        friend.setStatus("pending");
        friend.setRequestFrom(userFrom);
        friend.setRequestTo(userTo);

        friendRepo.save(friend);
    }

    public List<FriendDTO> getFriendRequest(Integer requestToId) {

        List<FriendDTO> dto = new ArrayList<>();

        List<Friend> friends = friendRepo.getFriendRequests(requestToId);

        for (Friend f : friends) {
            FriendDTO fDTO = new FriendDTO();
            fDTO.setId(f.getId());
            fDTO.setRequestFrom(f.getRequestFrom());
            dto.add(fDTO);
        }

        return dto;

    }
    
}
