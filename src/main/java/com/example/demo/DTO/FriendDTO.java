package com.example.demo.DTO;

import java.time.LocalDateTime;

import com.example.demo.Model.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendDTO {


    private Integer id;

    private LocalDateTime requestedAt;
    private LocalDateTime acceptedAt;
    private String status;

    private User requestTo;

    private User requestFrom;

}
