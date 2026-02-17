package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Model.ReadMessages;
import com.example.demo.Service.ReadMessagesService;


@RestController
public class MessagesReadController {

    @Autowired
    ReadMessagesService readMessagesService;
   
    @GetMapping("/getPeopleWhoSeenTheMessage/{conversaionId}")
    public List<ReadMessages> getPeopleWhoSeenTheMessage(@PathVariable int conversaionId) {
        return readMessagesService.getPeopleWhoSeenTheMessage(conversaionId);
    }

}
