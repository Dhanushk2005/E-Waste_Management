package com.example.login.repository;

import com.example.login.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {

    public boolean existsByEmail(String user_name);
    public Users findByEmail(String user_name);
}
