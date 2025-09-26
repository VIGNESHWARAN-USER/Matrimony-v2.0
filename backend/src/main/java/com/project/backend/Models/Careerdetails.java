package com.project.backend.Models;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "careerdetails")
public class Careerdetails {
    private String User_id;

    @Override
    public String toString() {
        return "Careerdetails{" +
                "User_id='" + User_id + '\'' +
                ", highest_degree='" + highest_degree + '\'' +
                ", employed_in='" + employed_in + '\'' +
                ", annual_income=" + annual_income +
                ", express_yourself='" + express_yourself + '\'' +
                '}';
    }

    public String getUser_id() {
        return User_id;
    }

    public void setUser_id(String user_id) {
        User_id = user_id;
    }

    public String getHighest_degree() {
        return highest_degree;
    }

    public void setHighest_degree(String highest_degree) {
        this.highest_degree = highest_degree;
    }

    public String getEmployed_in() {
        return employed_in;
    }

    public void setEmployed_in(String employed_in) {
        this.employed_in = employed_in;
    }

    public int getAnnual_income() {
        return annual_income;
    }

    public void setAnnual_income(int annual_income) {
        this.annual_income = annual_income;
    }

    public String getExpress_yourself() {
        return express_yourself;
    }

    public void setExpress_yourself(String express_yourself) {
        this.express_yourself = express_yourself;
    }

    private String highest_degree;
    private String employed_in;
    private int annual_income;
    private String express_yourself;

}
