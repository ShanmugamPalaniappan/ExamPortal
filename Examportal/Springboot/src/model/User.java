package com.example.examportal.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class User {
	

	@Id
	String userid;
	String username,email,password,role,status;


	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	@OneToMany(targetEntity = Exam.class,cascade=CascadeType.ALL)
	@JoinColumn(name="Userid",referencedColumnName ="userid")
	List<Exam> exams=new ArrayList<>();

	public void setExams(List<Exam> exams) {
		this.exams = exams;
	}
	
//	@OneToMany(targetEntity = Questionpaper.class,cascade = CascadeType.ALL)
//	@JoinColumn(name="userid",referencedColumnName = "userid")
//	List<Questionpaper> allqp;

	

}
