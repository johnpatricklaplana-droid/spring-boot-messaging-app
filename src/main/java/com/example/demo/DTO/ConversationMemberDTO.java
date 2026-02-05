package com.example.demo.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConversationMemberDTO {
  
    private Integer id;
    private LocalDateTime joinedAt;

    private int conversationId;

    private int userId;
}
