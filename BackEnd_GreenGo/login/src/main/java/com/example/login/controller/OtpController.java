package com.example.login.controller;


import com.example.login.OptOperations.EmailValidation;
import com.example.login.OptOperations.OtpGenerator;
import com.example.login.service.EmailService;
import com.example.login.service.UserService;
import jakarta.transaction.UserTransaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Email")
@CrossOrigin("*")
public class OtpController {
    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;

    @PostMapping("/sendOtp")
    public String sendOtp(@RequestParam String email){
        if(!EmailValidation.isProperMail(email)){
            return "Give Valid Mail Id";
        }

        if(userService.checkUserExistance(email)){
            return "User Already Exists";
        }
        emailService.sendOtp(email, OtpGenerator.createOtp(6));
        return "Opt Sent Sucessfully";
    }


    @PostMapping("/validateOtp")
    public String validateOtp(@RequestParam String email , @RequestParam String otp){
        return emailService.validateOtp(email , otp);
    }
}
