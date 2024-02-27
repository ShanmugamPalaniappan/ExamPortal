package com.example.examportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.examportal.model.Subject;

public interface Subjectrepo extends JpaRepository<Subject, String>{
	@Query(value = "SELECT subjectid FROM Subject ORDER BY CAST(SUBSTRING(subjectid, 2) AS SIGNED) DESC LIMIT 1", nativeQuery = true)
	public String getid();

}
