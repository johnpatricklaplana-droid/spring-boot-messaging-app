package com.example.demo.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.FriendDTO;
import com.example.demo.Model.Conversation;
import com.example.demo.Model.ConversationMember;
import com.example.demo.Model.Friend;
import com.example.demo.Model.User;
import com.example.demo.Repository.AuthRepository;
import com.example.demo.Repository.ConversationMemberRepository;
import com.example.demo.Repository.ConversationRepository;
import com.example.demo.Repository.FriendRepository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class FriendService {

    @Autowired
    FriendRepository friendRepo;

    @Autowired
    AuthRepository authRepo;

    @Autowired
    ConversationRepository conversationRepo;

    @Autowired
    EntityManager entityManager;

    @Autowired
    ConversationMemberRepository conversationMemberRepo;

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
        
        friendRepo.acceptFriendRequest(idFromFriendRequest, currentUserId, LocalDateTime.now());

        Conversation conversation = new Conversation();
        conversation.setConversationName("default");
        conversation.setCreatedAt(LocalDateTime.now());

        conversationRepo.save(conversation);

        User current = entityManager.getReference(User.class, currentUserId);
        User friend = entityManager.getReference(User.class, idFromFriendRequest);

        ConversationMember currentUser = new ConversationMember();
        currentUser.setJoinedAt(LocalDateTime.now());
        currentUser.setConversationId(conversation);
        currentUser.setUserId(current);

        ConversationMember friendRequest = new ConversationMember();
        friendRequest.setJoinedAt(LocalDateTime.now());
        friendRequest.setConversationId(conversation);
        friendRequest.setUserId(friend);
        
        conversationMemberRepo.save(currentUser);
        conversationMemberRepo.save(friendRequest);

    }

    public List<FriendDTO> getFriends(int currentUserId) {

        List<Friend> friends = friendRepo.FriendsList(currentUserId);

        List<FriendDTO> friendDTO = new ArrayList<>();

        for (Friend f : friends) {
            FriendDTO dto = new FriendDTO();
            dto.setAcceptedAt(f.getAcceptedAt());
            dto.setId(f.getId());
            if(f.getRequestFrom().getId() == currentUserId) {
                dto.setRequestTo(f.getRequestTo());
            } else {
                dto.setRequestFrom(f.getRequestFrom());
            }
            dto.setStatus(f.getStatus());
            friendDTO.add(dto);
        }

        return friendDTO;
    }
    
}
