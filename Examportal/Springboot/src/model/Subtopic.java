package com.example.examportal.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Subtopic {
	@Id
	String stid;
	String subtopicname;

	@Override
	public String toString() {
		return "Subtopic [stid=" + stid + ", subtopicname=" + subtopicname + ", s=" + s + "]";
	}

	public String getStid() {
		return stid;
	}

	public void setStid(String stid) {
		this.stid = stid;
	}

	public String getSubtopicname() {
		return subtopicname;
	}

	public void setSubtopicname(String subtopicname) {
		this.subtopicname = subtopicname;
	}
	@ManyToOne
	@JoinColumn(name="Subjectid")
	Subject s;

	public Subject getS() {
		return s;
	}

	public void setS(Subject s) {
		this.s = s;
	}
	
	@OneToMany(targetEntity = Question.class,cascade = CascadeType.ALL)
	@JoinColumn(name="subtopicid",referencedColumnName = "stid")
	List<Question> allquestions;

	public void setAllquestions(List<Question> allquestions) {
		this.allquestions = allquestions;
	}
}
