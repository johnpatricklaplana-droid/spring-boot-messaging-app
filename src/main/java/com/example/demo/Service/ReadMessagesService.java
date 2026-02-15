package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Repository.ReadMessagesRepository;

@Service
public class ReadMessagesService {
    
    @Autowired
    ReadMessagesRepository readMessagesRepository;



}
