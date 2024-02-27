package com.example.examportal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.examportal.model.Exam;
import com.example.examportal.model.Qpdetails;
import com.example.examportal.model.Question;
import com.example.examportal.model.Questionpaper;
import com.example.examportal.model.Subject;
import com.example.examportal.model.Subtopic;
import com.example.examportal.model.User;
import com.example.examportal.service.Allimplementation;


@RestController
@CrossOrigin
public class Maincontroller {
	@Autowired
	Allimplementation imp;
	//USER
	@PostMapping("/adduser")
	User adduser(@RequestBody User u)
	{
		return imp.adduser(u);
	}
	@PostMapping("/")
	User login(@RequestBody User u)
	{
		return imp.login(u);
	}
	@GetMapping("/viewalluser")
	List<User> viewalluser()
	{
		return imp.viewalluser();
	}
	@GetMapping("/finduser/{i}")
	Optional<User> finduser(@PathVariable String i)
	{
		return imp.finduser(i);
	}
	@PutMapping("/updateuser/{i}")
	Optional<User> updateuser(@PathVariable String i,@RequestBody User u){
		return imp.updateuser(i,u);
	}
	 @PostMapping("/delete/{u}")
	 public void deleteUser(@PathVariable String u) {
	        // Convert the string id to Long
	        imp.deleteUser(u);
	  }
//	 @GetMapping("/pending-approval")
//	    public ResponseEntity<List<User>> getPendingApprovalUsers() {
//	        List<User> pendingApprovalUsers = imp.getPendingApprovalUsers();
//	        return ResponseEntity.ok(pendingApprovalUsers);
//	    }
//
//	    @PostMapping("/approve/{userId}")
//	    public ResponseEntity<String> approveUser(@PathVariable String userId) {
//	        imp.approveUser(userId);
//	        return ResponseEntity.ok("User approved successfully.");
//	    }
	//SUBJECT
	 @PostMapping("/addsubject")
		Subject addsubject(@RequestBody Subject s)
		{
			return imp.addsubject(s);
		}
	 @GetMapping("/viewallsubject")
		List<Subject> viewallsubject()
		{
			return imp.viewallsubject();
		}
	 @GetMapping("/findsubject/{i}")
		Optional<Subject> findsubject(@PathVariable String i)
		{
			return imp.findsubject(i);
		}
	 //SUBTOPIC
	 @PostMapping("/addsubtopic")
		Subtopic addsubtopic(@RequestBody Subtopic t)
		{
			return imp.addsubtopic(t);
		}
	 @GetMapping("/viewallsubtopic")
		List<Subtopic> viewallsubtopic()
		{
			return imp.viewallsubtopic();
		}
	 @PostMapping("/addquestion")
	 String addquestion(@RequestBody Question q)
	 {
		 return imp.addquestion(q);
		
	 }
	 @GetMapping("/viewallquestion")
		List<Question> viewallquestions()
		{
			return imp.viewallquestions();
		}
	 @GetMapping("/randomquestion")
	 Question getrandomquestion()
	 {
		 return imp.getrandomquestion();
	 }
	 @PostMapping("/addexam")
	 Exam addexam(@RequestBody Exam e)
	 {
		 return imp.addexam(e);
	 }
	 @PostMapping("/getexam")
	 List<Exam> getexam(@RequestBody User u)
	 {
		 return imp.getexam(u);
	 }
	@PostMapping("/generateqp")
	Questionpaper generateqp(@RequestBody Exam e)
	{
		return imp.generateqp(e);
	}
	@PostMapping("/getqp")
	List<Qpdetails> getqp(@RequestBody Exam e)
	{
		return imp.getqp(e);
	}
	@GetMapping("/pendingrequests")
	List<User> pendingrequests()
	{
		return imp.pendingrequests();
	}
	@PostMapping("/changestatus")
	String changestatus(@RequestBody User u)
	{
		return imp.changestatus(u);
	}
	@PostMapping("/getsubtopics")
	List<Subtopic> getsubtopics(@RequestBody Subject s)
	{
		return imp.getsubtopics(s);
	}
	@PostMapping("/selectanswer")
	String selectanswer(@RequestBody Qpdetails qpd)
	{
		return imp.selectanswer(qpd);
	}
	@PostMapping("/setmark")
	String setmark(@RequestBody Qpdetails qpd)
	{
		return imp.setmark(qpd);
	}
	@PostMapping("/totalmark")
	String totalmark(@RequestBody Questionpaper qp)
	{
		return imp.totalmark(qp);
	}
	@PostMapping("/changeexamstatus")
	String changeexamstatus(@RequestBody Exam e)
	{
		return imp.changeexamstatus(e);
	}
	@PostMapping("/getreview")
	List<Qpdetails> getreview(@RequestBody Questionpaper qp)
	{
		return imp.getreview(qp);
	}
	@GetMapping("/resumerequest")
	List<Exam> resumerequest()
	{
		return imp.resumerequest();
	}
}
