package com.example.demo.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.Model.ReadMessages;
import com.example.demo.Repository.ReadMessagesRepository;

@Service
public class ReadMessagesService {
    
    @Autowired
    ReadMessagesRepository readMessagesRepository;

    public List<ReadMessages> getPeopleWhoSeenTheMessage(int conversaionId) {
        List<ReadMessages> readMessages = readMessagesRepository.findByConversationId(conversaionId);

        for (ReadMessages readMessages2 : readMessages) {
            System.out.println(readMessages2.getLastMessageRead()); 
            System.out.println(readMessages2.getUser().getId());
        }
        return readMessages;
    }



}
