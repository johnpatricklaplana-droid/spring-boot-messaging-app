package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.FriendDTO;
import com.example.demo.Model.User;
import com.example.demo.Service.FriendService;

@RestController
public class FriendController {

    @Autowired
    FriendService service;
    
    @PostMapping("/addFriend/{requestTo}/{requestFrom}")
    public String AddFriend (@PathVariable int requestTo, @PathVariable int requestFrom) {
        service.addFriend(requestTo, requestFrom);
        return "{ \"response\": \"good one\" }";
    }

    @GetMapping("/getFriendRequest/{requestTo}")
    public List<FriendDTO> GetFriendRequest (@PathVariable int requestTo) {
        return service.getFriendRequest(requestTo);
    }

    @PutMapping("acceptFriendRequest/{idFromFriendRequest}/{currentUserId}")
    public String accept (@PathVariable int idFromFriendRequest, @PathVariable int currentUserId) {
        service.acceptFriendRequest(idFromFriendRequest, currentUserId);
        return "{ \"response\": \"you are now friend with ?\"}";
    }

    @GetMapping("/getfriends/{currentUserId}")
    public List<User> getFriends (@PathVariable int currentUserId) {
        service.getFriends(currentUserId);
        return null;
    }

}
