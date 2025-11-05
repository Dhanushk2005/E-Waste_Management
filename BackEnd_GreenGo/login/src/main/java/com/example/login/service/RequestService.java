package com.example.login.service;


import com.example.login.Request;
import com.example.login.Users;
import com.example.login.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRepository repo;

    public void sendRequestService(Request request){
        repo.save(request);
    }
    public List<Request> findAll(){
        return repo.findAll();
    }
    public Request findByUserAndDateTime(Users user , LocalDateTime dateTime){
        return repo.findByUserAndDateTime(user , dateTime);
    }
    public List<Request> findByUser(Users user){
        return repo.findAllByUser(user);
    }
    public List<Request> findByStatus(String status){
        return repo.findByStatus(status);
    }
    public List<Request> findByUserAndStatus(Users user , String Status){
        return repo.findAllByUserAndStatus(user , Status);
    }
}
