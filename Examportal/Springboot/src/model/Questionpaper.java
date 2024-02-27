package com.example.examportal.model;


import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
public class Questionpaper {
	@Id
	String qpid;
	String userans;
	int mark;
	
//	@OneToOne(mappedBy = "qp")
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="examid")
	Exam e;
	
	public Exam getE() {
		return e;
	}

	public void setE(Exam e) {
		this.e = e;
	}

//	@ManyToMany
//	@JoinTable(name="qp_q",joinColumns =@JoinColumn(name="qpid"),inverseJoinColumns = @JoinColumn(name="qid"))
//	
//	List<Question> allquestions;
//
//
//	
//	public List<Question> getAllquestions() {
//		return allquestions;
//	}
//
//	public void setAllquestions(List<Question> allquestions) {
//		this.allquestions = allquestions;
//	}

	public String getQpid() {
		return qpid;
	}

	public void setQpid(String qpid) {
		this.qpid = qpid;
	}

	public String getUserans() {
		return userans;
	}

	public void setUserans(String userans) {
		this.userans = userans;
	}

	public int getMark() {
		return mark;
	}

	public void setMark(int mark) {
		this.mark = mark;
	}
	@OneToMany(targetEntity = Qpdetails.class,cascade = CascadeType.ALL)
	@JoinColumn(name="questionpaperid",referencedColumnName = "qpid")
	List<Qpdetails> qpd;
}
