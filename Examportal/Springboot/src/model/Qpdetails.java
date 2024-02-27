package com.example.examportal.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="Qpdetails")
public class Qpdetails {
	@Id
	String qpdid;
	
	@ManyToOne
	@JoinColumn(name="questionid")
	Question q;
	
	@ManyToOne
	@JoinColumn(name="questionpaperid")
	Questionpaper qp;
	
	int mark;
	String userans;
	public String getQpdid() {
		return qpdid;
	}
	public void setQpdid(String qpdid) {
		this.qpdid = qpdid;
	}
	public Question getQ() {
		return q;
	}
	public void setQ(Question q) {
		this.q = q;
	}
	public Questionpaper getQp() {
		return qp;
	}
	public void setQp(Questionpaper qp) {
		this.qp = qp;
	}
	public int getMark() {
		return mark;
	}
	public void setMark(int mark) {
		this.mark = mark;
	}
	public String getUserans() {
		return userans;
	}
	public void setUserans(String userans) {
		this.userans = userans;
	}
}
