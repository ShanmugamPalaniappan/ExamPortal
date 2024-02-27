package com.example.examportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.examportal.model.Question;

public interface Questionrepo extends JpaRepository<Question, String> {
	@Query(value = "SELECT qid FROM Question ORDER BY CAST(SUBSTRING(qid, 2) AS SIGNED) DESC LIMIT 1", nativeQuery = true)
	public String getid();
}
