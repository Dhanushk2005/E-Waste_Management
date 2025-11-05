package com.example.login.service;

import com.example.login.SendData;
import com.example.login.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.login.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public boolean saveTheUser(Users user){
        String email = user.getEmail();
        if(userRepo.existsByEmail(email)){
            return false;
        }
        userRepo.save(user);
        return true;
    }
    public Users getUser(String email){
        return userRepo.findByEmail(email);
    }
    public SendData getSendDataUser(String email){
        Users user = getUser((email));
        SendData sendData = new SendData();
        sendData.setEmail(user.getEmail());
        sendData.setUser_type(user.getUser_type());
        sendData.setFullName(user.getFullName());
        return sendData;
    }
    public boolean checkUserExistance(String email){
        if(userRepo.existsByEmail(email)){
            return true;
        }
        return false;
    }

    public boolean isUser(String Email){
        Users user = userRepo.findByEmail(Email);
        if(user.getUser_type().equals("user")){
            return true;
        }
        return false;
    }

    public boolean checkPasswordForuser(String email , String pass){
        Users user = userRepo.findByEmail(email);
        if(user.getPassword().equals(pass)){
            return true;
        }
        return false;
    }
}
