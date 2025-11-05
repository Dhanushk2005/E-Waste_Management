package com.example.login;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer request_token;
    private String category;
    private String brand;
    private String model;
    private String itemCondition;
    private Long phone;
    private String address;
    private LocalDateTime dateTime;
    private String status;

    @JsonIgnoreProperties("requestList")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_email" )
    private Users user;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] front_image;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] back_image;

    public Request(){}

    public Integer getRequest_token() {
        return request_token;
    }

    public void setRequest_token(Integer request_token) {
        this.request_token = request_token;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getItemCondition() {
        return itemCondition;
    }

    public void setItemCondition(String itemCondition) {
        this.itemCondition = itemCondition;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public byte[] getFront_image() {
        return front_image;
    }

    public void setFront_image(byte[] front_image) {
        this.front_image = front_image;
    }

    public byte[] getBack_image() {
        return back_image;
    }

    public void setBack_image(byte[] back_image) {
        this.back_image = back_image;
    }
}
