package com.example.examportal.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;


@Entity
public class Subject {
	@Id
	String subjectid;
	String Subjectname;

	public String getSubjectid() {
		return subjectid;
	}

	@Override
	public String toString() {
		return "Subject [subjectid=" + subjectid + ", Subjectname=" + Subjectname + ", allsubtopic=" + allsubtopic
				+ "]";
	}

	public void setSubjectid(String subjectid) {
		this.subjectid = subjectid;
	}

	public String getSubjectname() {
		return Subjectname;
	}

	public void setSubjectname(String subjectname) {
		Subjectname = subjectname;
	}
	@OneToMany(targetEntity = Subtopic.class,cascade=CascadeType.ALL)
	@JoinColumn(name="Subjectid",referencedColumnName ="subjectid")
	List<Subtopic> allsubtopic;

	public void setAllsubtopic(List<Subtopic> allsubtopic) {
		this.allsubtopic = allsubtopic;
	}

//	public List<Subtopic> getAllsubtopic() {
//		return allsubtopic;
//	}
//	@OneToOne(mappedBy ="s" )
	@OneToMany(targetEntity = Exam.class,cascade = CascadeType.ALL)
	@JoinColumn(name="subjectid",referencedColumnName = "subjectid")
	List<Exam> e;
	

}
