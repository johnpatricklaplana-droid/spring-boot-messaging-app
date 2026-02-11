package com.example.demo.DTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MessagesDTO {
    
    private Integer id;
    private Integer conversationId;
    private Integer senderId;
    private LocalDateTime sentAt;
    private String textMessage;
}
