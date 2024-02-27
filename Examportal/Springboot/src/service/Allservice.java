package com.example.examportal.service;


import java.util.List;
import java.util.Optional;


import com.example.examportal.model.Exam;
import com.example.examportal.model.Qpdetails;
import com.example.examportal.model.Question;
import com.example.examportal.model.Questionpaper;
import com.example.examportal.model.Subject;
import com.example.examportal.model.Subtopic;
import com.example.examportal.model.User;


public interface Allservice {
	User adduser(User u);
	List<User> viewalluser();
	Optional<User> finduser(String i);
	Optional<User> updateuser(String i,User u);
	User login(User u);
	void deleteUser(String u);

	
	//Subject
	Subject addsubject(Subject s);
	List<Subject> viewallsubject();
	Optional<Subject> findsubject(String i);
	List<Subtopic> getsubtopics(Subject s);
	
	
	//Subtopic
	Subtopic addsubtopic(Subtopic t);
	List<Subtopic> viewallsubtopic();
	List<Subtopic> viewsubtopic(Subject s);
	
	//objectivequestions
	String addquestion(Question q);
	List<Question> viewallquestions();
	Question getrandomquestion();
	
	Exam addexam(Exam e);
	List<Exam> getexam(User u);
	Questionpaper generateqp(Exam e);
	List<Qpdetails> getqp(Exam e);
	
	
	List<User> pendingrequests();
	String changestatus(User u);
	
	String selectanswer(Qpdetails qpd);
	String setmark(Qpdetails qpd);
	
	String totalmark(Questionpaper qp);
	String changeexamstatus(Exam e);
	List<Qpdetails> getreview(Questionpaper qp);
	
	List<Exam> resumerequest();
	


	


}
