package com.example.login.controller;

import com.example.login.SendData;
import com.example.login.Users;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.login.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:3000" , "http://localhost:5173"})

public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public boolean registerUser(@RequestBody Users user){
        return userService.saveTheUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity loginUser(@RequestParam String email , @RequestParam String password){
        if(!userService.checkUserExistance(email)){
            return ResponseEntity.status(404).body("User Doesn't Exists");
        }
        if(!userService.checkPasswordForuser(email , password)) {
            return ResponseEntity.status(401).body("user_name and Password doesn't match");
        }
        return ResponseEntity.status(200).body(userService.isUser(email));
    }

    @PostMapping("getUser")
    public SendData getUser(String email){
        return userService.getSendDataUser(email);
    }

}
