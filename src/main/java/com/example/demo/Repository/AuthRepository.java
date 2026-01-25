package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Model.User;

public interface  AuthRepository extends  JpaRepository<User, Integer> {
    
    boolean existsByEmail(String email);

    Optional<User> findUserByEmail(String email);

    List<User> findByusernameIgnoreCaseContaining(String name);
}
