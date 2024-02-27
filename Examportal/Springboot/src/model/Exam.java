package com.example.examportal.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;


@Entity
public class Exam {
	@Id
	String examid;
	
	public String getExamid() {
		return examid;
	}

	public void setExamid(String examid) {
		this.examid = examid;
	}

	public User getU() {
		return u;
	}

	public void setU(User u) {
		this.u = u;
	}

	@ManyToOne
	@JoinColumn(name="Userid")
	User u;
	String date;

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	@ManyToOne
	@JoinColumn(name="subjectid")
	Subject s;

	public Subject getS() {
		return s;
	}

	public void setS(Subject s) {
		this.s = s;
	}
	int noq;
	String Status;

	public int getNoq() {
		return noq;
	}

	public void setNoq(int noq) {
		this.noq = noq;
	}

	public String getStatus() {
		return Status;
	}

	public void setStatus(String status) {
		Status = status;
	}
	
//	@OneToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name="qpid")
	@OneToOne(mappedBy = "e")
	Questionpaper qp;

//	public Questionpaper getQp() {
//		return qp;
//	}
//
//	public void setQp(Questionpaper qp) {
//		this.qp = qp;
//	}
}
