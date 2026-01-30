package com.example.login.repository;

import com.example.login.Request;
import com.example.login.Users;
import org.eclipse.angus.mail.imap.protocol.INTERNALDATE;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface RequestRepository extends JpaRepository<Request , Integer> {

    public List<Request> findAllByOrderByDateTimeDesc();
    public List<Request> findAllByUser(Users user);
    public Request findByUserAndDateTime(Users user , LocalDateTime dateTime);
    public List<Request> findByStatusOrderByDateTimeDesc(String status);
    public List<Request> findAllByUserAndStatus(Users user , String status);
}
