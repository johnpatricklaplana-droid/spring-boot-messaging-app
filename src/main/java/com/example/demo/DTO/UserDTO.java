package com.example.demo.DTO;

public class UserDTO {

    private Integer id;
    private String username;
    private String email;

    public UserDTO (Integer id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public Integer getId() {
        return id;
    }

    public String getUsername () {
        return username;
    }

    public String getEmail () {
        return email;
    }
}
