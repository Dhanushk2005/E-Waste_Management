package com.example.login.controller;


import com.example.login.Request;
import com.example.login.Users;
import com.example.login.service.RequestService;
import com.example.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/request")
@CrossOrigin("*")
public class RequestController {
    @Autowired
    private RequestService requestService;
    @Autowired
    private UserService userService;

    @PostMapping("/sendRequest")
    public ResponseEntity sendRequest(
            @RequestParam("email") String email,
            @RequestParam("category") String category,
            @RequestParam("brand") String brand,
            @RequestParam("model") String model,
            @RequestParam("condition") String condition,
            @RequestParam("phone") Long phone,
            @RequestParam("address") String address,
            @RequestParam("frontImage") MultipartFile frontImage,
            @RequestParam("backImage") MultipartFile backImage
    ) throws IOException {
        Request request = new Request();
        request.setCategory(category);
        request.setBrand(brand);
        request.setModel(model);
        request.setItemCondition(condition);
        request.setPhone(phone);
        request.setAddress(address);
        request.setFront_image(frontImage.getBytes());
        request.setBack_image(backImage.getBytes());
        request.setStatus("Waiting For Admin Approval");
        request.setDateTime(LocalDateTime.now());

        Users user = userService.getUser(email);
        if(user == null){
            return ResponseEntity.status(404).body("User Not Found");
        }
        request.setUser(user);

        requestService.sendRequestService(request);
        return ResponseEntity.status(200).body("Request send Successfully");
    }

    @GetMapping("/getAll")
    public List<Request> findAllRequest(){
        return requestService.findAll();
    }

    @PostMapping("/email")
    public List<Request> findByEmail(@RequestParam Users user){
        return requestService.findByUser(user);
    }


    @PostMapping("/emailAndDate")
    public Request getByEmailAndDate(@RequestParam Users user , @RequestParam LocalDateTime dateTime){
        return requestService.findByUserAndDateTime(user , dateTime);
    }

    @PostMapping("/emailAndStatus")
    public List<Request> getByEmailAndStatus(@RequestParam Users user , @RequestParam String status){
        return requestService.findByUserAndStatus(user , status);
    }

    @PostMapping("/status" )
    public List<Request> getByStatus(@RequestParam String status){
        return requestService.findByStatus(status);
    }
}
