package com.example.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    private Map<String , String> otpMap = new HashMap<>();
    private Map<String , Long> otpExpireTime = new HashMap<>();


    public void sendOtp(String ToMail , String otp) {
        SimpleMailMessage smm = new SimpleMailMessage();
        otpMap.put(ToMail,otp);
        otpExpireTime.put(ToMail , System.currentTimeMillis() + 5000 * 60);

        smm.setTo(ToMail);
        smm.setSubject("OTP Verification Code for GreenGo");
        smm.setText(
                "Dear user,\n\n" +
                        "Your One-Time Password (OTP) for registration is: " + otp + "\n\n" +
                        "This code will expire in 5 minutes.\n\n" +
                        "Regards,\nGreenGo Team"
        );



        mailSender.send(smm);
    }

    public String validateOtp(String email , String otp){
        long time = System.currentTimeMillis();
        System.out.print(otpMap);
        if(!otpMap.containsKey(email)){
            return "4";
        }
        if(time > otpExpireTime.get(email)){
            return "3";
        }
        else if(!otp.equals(otpMap.get(email))){
            return "2";
        }
        otpMap.remove(email);
        otpExpireTime.remove(email);
        return "1";
    }
}
//package com.example.login.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//import java.security.MessageDigest;
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;
//
//@Service
//public class EmailService {
//
//    @Autowired
//    private JavaMailSender mailSender;
//
//    private final Map<String, String> otpMap = new ConcurrentHashMap<>();
//    private final Map<String, Long> otpExpireTime = new ConcurrentHashMap<>();
//
//    public void sendOtp(String toMail, String otp) {
//        String hashedOtp = hashOtp(otp);
//        otpMap.put(toMail, hashedOtp);
//        otpExpireTime.put(toMail, System.currentTimeMillis() + (5 * 60 * 1000)); // 5 minutes
//
//        SimpleMailMessage smm = new SimpleMailMessage();
//        smm.setTo(toMail);
//        smm.setSubject("OTP Verification Code for GreenGo");
//        smm.setText(buildOtpEmail(otp));
//
//        mailSender.send(smm);
//    }
//
//    public OtpStatus validateOtp(String email, String otp) {
//        long currentTime = System.currentTimeMillis();
//
//        if (!otpMap.containsKey(email)) {
//            return OtpStatus.NOT_FOUND;
//        }
//        if (currentTime > otpExpireTime.get(email)) {
//            otpMap.remove(email);
//            otpExpireTime.remove(email);
//            return OtpStatus.EXPIRED;
//        }
//        if (!hashOtp(otp).equals(otpMap.get(email))) {
//            return OtpStatus.INVALID;
//        }
//
//        otpMap.remove(email);
//        otpExpireTime.remove(email);
//        return OtpStatus.SUCCESS;
//    }
//
//    private String buildOtpEmail(String otp) {
//        return String.format("""
//            Dear user,
//
//            Your One-Time Password (OTP) for registration is: %s
//
//            This code will expire in 5 minutes.
//
//            Regards,
//            GreenGo Team
//        """, otp);
//    }
//
//    private String hashOtp(String otp) {
//        try {
//            MessageDigest md = MessageDigest.getInstance("SHA-256");
//            byte[] hash = md.digest(otp.getBytes());
//            StringBuilder sb = new StringBuilder();
//            for (byte b : hash) sb.append(String.format("%02x", b));
//            return sb.toString();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    public enum OtpStatus {
//        SUCCESS,
//        INVALID,
//        EXPIRED,
//        NOT_FOUND
//    }
//}
