package com.example.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.ReadMessages;

public interface ReadMessagesRepository extends JpaRepository<ReadMessages, Integer> {

    
}
