package com.project.backend.Models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.awt.*;
import java.sql.Blob;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "payments")
public class Payments {
    private String User_id;
    private String transaction_id;
    private int id;

    @Override
    public String toString() {
        return "Payments{" +
                "User_id='" + User_id + '\'' +
                ", transaction_id='" + transaction_id + '\'' +
                ", id=" + id +
                ", screenshot=" + screenshot +
                '}';
    }

    public String getUser_id() {
        return User_id;
    }

    public void setUser_id(String user_id) {
        User_id = user_id;
    }

    public String getTransaction_id() {
        return transaction_id;
    }

    public void setTransaction_id(String transaction_id) {
        this.transaction_id = transaction_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Blob getScreenshot() {
        return screenshot;
    }

    public void setScreenshot(Blob screenshot) {
        this.screenshot = screenshot;
    }

    public Blob screenshot;
}
