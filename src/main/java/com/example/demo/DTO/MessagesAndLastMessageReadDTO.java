package com.example.demo.DTO;

import java.time.LocalDateTime;
import java.util.Map;

import com.example.demo.Model.Conversation;
import com.example.demo.Model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessagesAndLastMessageReadDTO {
    //Message
    private int MessageId;
    private User senderId;
    private LocalDateTime sentAt;
    private String textMessage;

    //LastMessageRead
    private User user;
    private LocalDateTime readAt;
    private Conversation conversation;

    //Read Status
    private Map<Integer, String> status;
} 
