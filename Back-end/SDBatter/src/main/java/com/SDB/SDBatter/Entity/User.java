package com.SDB.SDBatter.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tbl_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;

    @JsonProperty
    private String first_name;
    @JsonProperty
    private String last_name;

    @JsonProperty
    private String sociaty_name;
    @JsonProperty
    private String flat_no;
    @JsonProperty
    private String wing_name;
    
   
    @JsonProperty
    private String email;
    @JsonProperty
    private long mobile;
    
    @JsonProperty
    private String password;
    
    @JsonProperty
    private String area;
    
    private String role="user";
    

	public long getUser_id() {
		return user_id;
	}

	public void setUser_id(long user_id) {
		this.user_id = user_id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getSociaty_name() {
		return sociaty_name;
	}

	public void setSociaty_name(String sociaty_name) {
		this.sociaty_name = sociaty_name;
	}

	public String getFlat_no() {
		return flat_no;
	}

	public void setFlat_no(String flat_no) {
		this.flat_no = flat_no;
	}

	public String getWing_name() {
		return wing_name;
	}

	public void setWing_name(String wing_name) {
		this.wing_name = wing_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getMobile() {
		return mobile;
	}

	public void setMobile(long mobile) {
		this.mobile = mobile;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    
	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(long user_id, String first_name, String last_name, String sociaty_name, String flat_no,
			String wing_name, String email, long mobile, String password, String area) {
		super();
		this.user_id = user_id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.sociaty_name = sociaty_name;
		this.flat_no = flat_no;
		this.wing_name = wing_name;
		this.email = email;
		this.mobile = mobile;
		this.password = password;
		this.area = area;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = "user";
	}
    
	

    
}
