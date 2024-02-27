package com.example.examportal.service;

import java.text.SimpleDateFormat;
//import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Random;
import java.util.List;
import java.util.Optional;

//import org.aspectj.weaver.patterns.TypePatternQuestions.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.examportal.model.Exam;
import com.example.examportal.model.Qpdetails;
//import com.example.examportal.model.Exam;
import com.example.examportal.model.Question;
import com.example.examportal.model.Questionpaper;
import com.example.examportal.model.Subject;
import com.example.examportal.model.Subtopic;
import com.example.examportal.model.User;
import com.example.examportal.repo.Examrepo;
import com.example.examportal.repo.Qpdetailsrepo;
import com.example.examportal.repo.Questionpaperrepo;
import com.example.examportal.repo.Questionrepo;
import com.example.examportal.repo.Subjectrepo;
import com.example.examportal.repo.Subtopicrepo;
import com.example.examportal.repo.Userrepo;


@Service
public class Allimplementation implements Allservice{
	@Autowired
	Userrepo urepo;
	@Autowired
	Subjectrepo srepo;
	@Autowired
	Subtopicrepo trepo;
	@Autowired
	Questionrepo qrepo;
	@Autowired
	Examrepo erepo;
	@Autowired 
	Questionpaperrepo qprepo;
	@Autowired
	Qpdetailsrepo qpdrepo;


	@Override
	public User adduser(User u) {
		// TODO Auto-generated method stub
		try {
			
			String y=urepo.getid();
			String formattedId = null;

			if(y!=null)
			{
				int x = Integer.parseInt(y.substring(1)) + 1;
		        formattedId = String.format("u%04d",x);
		        System.out.println(formattedId +"tedhbhk");

		        u.setUserid(formattedId);
		       
			}
			else
			{
				u.setUserid("u0001");
				System.out.println(u.getUserid());
				System.out.println(formattedId);

			}
	        u.setRole("user");
	        u.setStatus("pending");
	        System.out.println(u.toString());
	        return urepo.save(u);
			
		}
		catch(Exception e)
		{
			
			return u;
		}

	}

	@Override
	public List<User> viewalluser() {
		// TODO Auto-generated method stub
		return urepo.findAll();
	}

	@Override
	public Optional<User> finduser(String i) {
		// TODO Auto-generated method stub
		return urepo.findById(i);
	}

	@Override
	public Optional<User> updateuser(String i,User u) {
	Optional<User>u1=urepo.findById(i);
	User u2=u1.get();
	u2.setUsername(u.getUsername());
	u2.setPassword(u.getPassword());
	u2.setEmail(u.getEmail());
	urepo.save(u2);
	return urepo.findById(i);
}

	@Override
	public User login(User u) {
		// TODO Auto-generated method stub
		User r=new User();
		for(User x:urepo.findAll())
		{
			if(x.getUsername().equals(u.getUsername())&& x.getPassword().equals(u.getPassword()))
			{
				r.setUserid(x.getUserid());
				r.setUsername(x.getUsername());
				r.setPassword(x.getPassword());
				r.setRole(x.getRole());
				r.setStatus(x.getStatus());
				break;
			}		
		}
		return r;
	}

	@Override
	public void deleteUser(String u) {
		// TODO Auto-generated method stub
		urepo.deleteById(u);
		
	}

	@Override
	public Subject addsubject(Subject s) {
		// TODO Auto-generated method stub
		try {

			String y=srepo.getid();
			if(y!=null)
			{
				int x = Integer.parseInt(y.substring(1)) + 1;
		        String formattedId = String.format("s%04d", x);
		        s.setSubjectid(formattedId);
			}
			else
			{
				s.setSubjectid("s0001");
			}
			return srepo.save(s);
		}	
		catch(Exception e)
		{
			System.out.println(e);
			return null;
		}

	}

	@Override
	public List<Subject> viewallsubject() {
		// TODO Auto-generated method stub
		return srepo.findAll();
	}
	@Override
	public Optional<Subject> findsubject(String i) {
		// TODO Auto-generated method stub
		return srepo.findById(i);
	}

	@Override
	public Subtopic addsubtopic(Subtopic t) {
		// TODO Auto-generated method stub
		try
		{
			String y=trepo.getid();
			if(y!=null) {
			int x=Integer.parseInt(y.substring(1))+1;
			String formattedId = String.format("t%04d", x);
			t.setStid(formattedId);
			}
			else
			{
				t.setStid("t0001");
				
			}
				for(Subject s:srepo.findAll())
				{
					if(s.getSubjectname().equals(t.getS().getSubjectname()))
					{
						System.out.println("entered");
						t.setS(s);
					}
				}
			trepo.save(t);
			return t;
		}
		catch(Exception e)
		{
			System.out.println(e);
			return t;
		}
	}
	@Override
	public List<Subtopic> viewallsubtopic() {
		// TODO Auto-generated method stub
		return trepo.findAll();
	}

	@Override
	public List<Subtopic> viewsubtopic(Subject s) {
		// TODO Auto-generated method stub
		List<Subtopic> allst=new ArrayList<Subtopic>();
		for(Subtopic st :trepo.findAll())
		{
			if(st.getS().getSubjectname().equals(s.getSubjectname()))
			{
				allst.add(st);
			}
		}
		return allst;
	}

	@Override
	public String addquestion(Question q) {
		// TODO Auto-generated method stub
		try {
			String y=qrepo.getid();
			if(y!=null)
			{
				int x = Integer.parseInt(y.substring(1)) + 1;
		        String formattedId = String.format("Q%04d", x);
		        q.setQid(formattedId);

			}
			else
			{
				q.setQid("Q0001");
			}
			if(q.getSt().getSubtopicname()!=null)
			{
				for(Subtopic st:trepo.findAll())
				{
					if(st.getSubtopicname().equals(q.getSt().getSubtopicname()))
					{
						q.setSt(st);
					}
				}
			}
			qrepo.save(q);
			return "success";
			
		}catch (Exception e){
			System.out.println(e);
			return null;
		}
        
	}

	@Override
	public List<Question> viewallquestions() {
		// TODO Auto-generated method stub
		return qrepo.findAll();
	}

	@Override
	public Question getrandomquestion() {
		// TODO Auto-generated method stub
		List<Question> allquestion=qrepo.findAll();
		if(allquestion.isEmpty())
		{
			return null;
		}
		Random random=new Random();
		int randomIndex=random.nextInt(allquestion.size());
		
		return allquestion.get(randomIndex);
	}

	@Override
	public Exam addexam(Exam e) {
		// TODO Auto-generated method stub
		try {
			
			String y=erepo.getid();
			if(y!=null)
			{
				int x = Integer.parseInt(y.substring(1)) + 1;
		        String formattedId = String.format("E%04d", x);
		        e.setExamid(formattedId);

			}
			else
			{
				e.setExamid("E0001");
			}
			for(User x:urepo.findAll())
			{
				if(x.getUsername().equals(e.getU().getUsername()))
				{
					e.setU(x);
				}
			}
			for(Subject s:srepo.findAll())
			{
				
				if(s.getSubjectname().equals(e.getS().getSubjectname()))
				{
					e.setS(s);
				}
			}
			e.setStatus("scheduled");
		erepo.save(e);
		return e;
		}catch(Exception ex)
		{
			System.out.println(ex);
			return null;
		}
		
	}

	
	@Override
	public List<Exam> getexam(User u) {
		// TODO Auto-generated method stub
		List<Exam> allexams=new ArrayList<Exam>();
		Date currentDate = new Date();
		System.out.println("Current date: " + currentDate);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String formattedDate = dateFormat.format(currentDate);
		System.out.println("Formatted date: " + formattedDate);
		for(Exam x:erepo.findAll())
		{
			if(x.getU().getUserid().equals(u.getUserid())&&(x.getStatus().equals("scheduled")||x.getStatus().equals("started")||x.getStatus().equals("resume")||x.getStatus().equals("closed"))&&x.getDate().equals(formattedDate))
			{
				allexams.add(x);
			}
		}
		return allexams;
	}

	@Override
	public Questionpaper generateqp(Exam e) {
		// TODO Auto-generated method stub
		try {
			Questionpaper qp=new Questionpaper();
			List<Question> returnquestions=new ArrayList<Question>();
			String y=qprepo.getid();
			if(y!=null)
			{
				int x = Integer.parseInt(y.substring(2)) + 1;
		        String formattedId = String.format("QP%04d", x);
		        qp.setQpid(formattedId);

			}
			else
			{
				qp.setQpid("QP0001");
			}
			List<Question> allquestions=new ArrayList<Question>();
			List<Subtopic> allsubtopics=new ArrayList<Subtopic>();
			for(Subtopic st:trepo.findAll())
			{
				if(e.getS().getSubjectname().equals(st.getS().getSubjectname()))
				{
					allsubtopics.add(st);
				}
			}
			for(Question q:qrepo.findAll())
			{
				for(Subtopic st1:allsubtopics)
				{
					if(st1.getStid().equals(q.getSt().getStid()))
					{
						allquestions.add(q);
						break;
					}
				}
			}
			int noq=e.getNoq(),xr=0;
			for(;xr<noq;xr++)
			{

					Random random=new Random();
					int randomIndex=random.nextInt(allquestions.size());
					System.out.println(allquestions.size());
					returnquestions.add(allquestions.get(randomIndex));
					allquestions.remove(randomIndex);
					System.out.println(randomIndex);
			}
			for(Exam e1:erepo.findAll())
			{
				if(e1.getExamid().equals(e.getExamid()))
				{
					qp.setE(e1);
				}
			}
			qprepo.save(qp);
			for(Question z:returnquestions)
			{
				Qpdetails n=new Qpdetails();
				String y1=qpdrepo.getid();
				if(y1!=null)
				{
					int x = Integer.parseInt(y1.substring(1)) + 1;
					String formattedId = String.format("D%04d", x);
					n.setQpdid(formattedId);
				}
				else
				{
					n.setQpdid("D0001");
				}
				n.setQ(z);
				n.setQp(qp);
				qpdrepo.save(n);
			}
			return qp;
		}
		catch(Exception e1){
			System.out.println(e1);
		}
		return null;
		
	}

	@Override
	public List<Qpdetails> getqp(Exam e) {
		// TODO Auto-generated method stub
		Questionpaper q=new Questionpaper();
		List<Qpdetails> all=new ArrayList<Qpdetails>();
		List<Question> allqid=new ArrayList<Question>();
		for(Questionpaper qp:qprepo.findAll())
		{
			if(qp.getE()!=null)
			{
				if(qp.getE().getExamid().equals(e.getExamid()))
				{
					q=qp;
				}
			}
		}
		for(Qpdetails qpd:qpdrepo.findAll())
		{
			if(qpd.getQp().getQpid().equals(q.getQpid()))
			{
				all.add(qpd);
				allqid.add(qpd.getQ());
			}
		}
		
		return all;
	}

	@Override
	public List<User> pendingrequests() {
		// TODO Auto-generated method stub
		List<User> x=new ArrayList<User>();
		for(User y:urepo.findAll())
		{
			if(y.getStatus().equals("pending"))
			{
				x.add(y);
			}
		}
		return x;
	}

	@Override
	public String changestatus(User u) {
		// TODO Auto-generated method stub
		for(User x:urepo.findAll())
		{
			if(x.getUserid().equals(u.getUserid()))
			{
				x.setStatus(u.getStatus());
				urepo.save(x);
				return "success";
			}
		}
		return "failed";
	}

	@Override
	public List<Subtopic> getsubtopics(Subject s) {
		// TODO Auto-generated method stub
		List<Subtopic> allst=new ArrayList<Subtopic>();
		for(Subtopic x1:trepo.findAll())
		{
			if(x1.getS().getSubjectname().equals(s.getSubjectname()))
			{
				allst.add(x1);
			}
		}
		return allst;
	}

	@Override
	public String selectanswer(Qpdetails qpd) {
		// TODO Auto-generated method stub
		for(Qpdetails q:qpdrepo.findAll())
		{
			if(q.getQp().getQpid().equals(qpd.getQp().getQpid())&&q.getQ().getQid().equals(qpd.getQ().getQid()))
			{
				q.setUserans(qpd.getUserans());
				qpdrepo.save(q);
				return "success";
			}
		}
		return "failed";
	}

	@Override
	public String setmark(Qpdetails qpd) {
		// TODO Auto-generated method stub
		for(Qpdetails q:qpdrepo.findAll())
		{
			if(q.getQp().getQpid().equals(qpd.getQp().getQpid())&&q.getQ().getQid().equals(qpd.getQ().getQid()))
			{
				q.setMark(qpd.getMark());
				qpdrepo.save(q);
				return "success";
			}
		}
		return "failed";
	}

	@Override
	public String totalmark(Questionpaper qp) {
		// TODO Auto-generated method stub
		for(Questionpaper qp1:qprepo.findAll())
		{
			if(qp1.getQpid().equals(qp.getQpid()))
			{
				qp1.setMark(qp.getMark());
				qprepo.save(qp1);
				return "success";
			}
		}
		return "failed";
	}

	@Override
	public String changeexamstatus(Exam e) {
		// TODO Auto-generated method stub
		for(Exam e1:erepo.findAll())
		{
			if(e1.getExamid().equals(e.getExamid()))
			{
				e1.setStatus(e.getStatus());
				erepo.save(e1);
				return "success";
			}
		}
		return "failed";
	}

	@Override
	public List<Qpdetails> getreview(Questionpaper qp) {
		// TODO Auto-generated method stub
		List<Qpdetails> r=new ArrayList<Qpdetails>();
		for(Qpdetails qpd:qpdrepo.findAll())
		{
			if(qpd.getQp().getQpid().equals(qp.getQpid()))
			{
				r.add(qpd);
			}
		}
		return r;
	}

	@Override
	public List<Exam> resumerequest() {
		// TODO Auto-generated method stub
		List<Exam> allexams=new ArrayList<Exam>();
		for(Exam e:erepo.findAll())
		{
			if(e.getStatus().equals("closed"))
			{
				allexams.add(e);
			}
		}
		return allexams;
	}
}

	
	


