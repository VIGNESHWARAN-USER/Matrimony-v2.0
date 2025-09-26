package com.project.backend.Models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.Date;


@Document(collection = "profiledetails")
@NoArgsConstructor
@AllArgsConstructor
public class Profiledetails {
    private String User_id;
    private String name;
    private String mother_tongue;
    private String marital_status;

    public String getUser_id() {
        return User_id;
    }

    @Override
    public String toString() {
        return "Profiledetails{" +
                "User_id='" + User_id + '\'' +
                ", name='" + name + '\'' +
                ", mother_tongue='" + mother_tongue + '\'' +
                ", marital_status='" + marital_status + '\'' +
                ", dob=" + dob +
                ", image=" + Arrays.toString(image) +
                ", gender='" + gender + '\'' +
                ", donor='" + donor + '\'' +
                ", refer='" + refer + '\'' +
                ", option_val='" + option_val + '\'' +
                '}';
    }

    public void setUser_id(String user_id) {
        User_id = user_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMother_tongue() {
        return mother_tongue;
    }

    public void setMother_tongue(String mother_tongue) {
        this.mother_tongue = mother_tongue;
    }

    public String getMarital_status() {
        return marital_status;
    }

    public void setMarital_status(String marital_status) {
        this.marital_status = marital_status;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDonor() {
        return donor;
    }

    public void setDonor(String donor) {
        this.donor = donor;
    }

    public String getRefer() {
        return refer;
    }

    public void setRefer(String refer) {
        this.refer = refer;
    }

    public String getOption_val() {
        return option_val;
    }

    public void setOption_val(String option_val) {
        this.option_val = option_val;
    }

    private Date dob;
    private byte[] image;  // for storing image data
    private String gender;
    private String donor;
    private String refer;
    private String option_val;
}
