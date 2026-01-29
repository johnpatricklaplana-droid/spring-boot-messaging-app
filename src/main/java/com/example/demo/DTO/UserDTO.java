package com.example.demo.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private Integer id;
    private String username;
    private String email;

    public UserDTO (Integer id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
    
}
