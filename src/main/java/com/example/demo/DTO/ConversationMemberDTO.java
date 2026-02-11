package com.example.demo.DTO;

import java.time.LocalDateTime;

import com.example.demo.Model.Conversation;
import com.example.demo.Model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConversationMemberDTO {
  
    private Integer id;
    private LocalDateTime joinedAt;

    private Conversation conversationId;

    private User userId;
}
