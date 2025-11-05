package com.example.login.OptOperations;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidation {
    private static final String Email_pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    private static final Pattern pattern = Pattern.compile(Email_pattern);

    public static boolean isProperMail(String Mail){
        if (Mail == null) {
            return false;
        }
        Matcher matcher = pattern.matcher(Mail);
        return matcher.matches();
    }
}