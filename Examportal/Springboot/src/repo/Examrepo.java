package com.example.examportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.examportal.model.Exam;

public interface Examrepo extends JpaRepository<Exam, String> {
	@Query(value = "SELECT examid FROM exam ORDER BY CAST(SUBSTRING(examid, 2) AS SIGNED) DESC LIMIT 1", nativeQuery = true)
	public String getid();

}
