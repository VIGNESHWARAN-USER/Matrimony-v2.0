package com.project.backend.Models;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "lifestylefamilies")
@AllArgsConstructor
@NoArgsConstructor
public class Lifestylefamilies {
    @Override
    public String toString() {
        return "Lifestylefamilies{" +
                ", User_id='" + User_id + '\'' +
                ", family_type='" + family_type + '\'' +
                ", father_occupation='" + father_occupation + '\'' +
                ", mother_occupation='" + mother_occupation + '\'' +
                ", brother='" + brother + '\'' +
                ", sister='" + sister + '\'' +
                ", family_living_location='" + family_living_location + '\'' +
                ", contact_address='" + contact_address + '\'' +
                ", about_family='" + about_family + '\'' +
                ", status='" + status + '\'' +
                ", last_updated=" + last_updated +
                '}';
    }


    public String getUser_id() {
        return User_id;
    }

    public void setUser_id(String user_id) {
        this.User_id = user_id;
    }

    public String getFamily_type() {
        return family_type;
    }

    public void setFamily_type(String family_type) {
        this.family_type = family_type;
    }

    public String getFather_occupation() {
        return father_occupation;
    }

    public void setFather_occupation(String father_occupation) {
        this.father_occupation = father_occupation;
    }

    public String getMother_occupation() {
        return mother_occupation;
    }

    public void setMother_occupation(String mother_occupation) {
        this.mother_occupation = mother_occupation;
    }

    public String getBrother() {
        return brother;
    }

    public void setBrother(String brother) {
        this.brother = brother;
    }

    public String getSister() {
        return sister;
    }

    public void setSister(String sister) {
        this.sister = sister;
    }

    public String getFamily_living_location() {
        return family_living_location;
    }

    public void setFamily_living_location(String family_living_location) {
        this.family_living_location = family_living_location;
    }

    public String getContact_address() {
        return contact_address;
    }

    public void setContact_address(String contact_address) {
        this.contact_address = contact_address;
    }

    public String getAbout_family() {
        return about_family;
    }

    public void setAbout_family(String about_family) {
        this.about_family = about_family;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getLast_updated() {
        return last_updated;
    }

    public void setLast_updated(LocalDateTime last_updated) {
        this.last_updated = last_updated;
    }

    private String User_id;
    private String family_type;
    private String father_occupation;
    private String mother_occupation;
    private String brother;
    private String sister;
    private String family_living_location;
    private String contact_address;
    private String about_family;
    private String status;
    private LocalDateTime last_updated;
}
