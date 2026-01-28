package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.Friend;
import com.example.demo.Service.FriendService;

@RestController
public class FriendController {

    @Autowired
    FriendService service;
    
    @PostMapping("/addFriend")
    public String AddFriend (@RequestBody Friend friend) {
        service.addFriend(friend);
        return "{ \"response\": \"good one\" }";
    }

    @GetMapping("/getFriendRequest/{peopleYouManyKnowId}")
    public String GetFriendRequest (@PathVariable int peopleYouManyKnowId) {
        service.getFriendRequest(peopleYouManyKnowId);
        return null;
    }

}
