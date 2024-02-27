package com.example.examportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.examportal.model.Subtopic;

public interface Subtopicrepo extends JpaRepository<Subtopic, String>{
	@Query(value = "SELECT stid FROM Subtopic ORDER BY CAST(SUBSTRING(stid, 2) AS SIGNED) DESC LIMIT 1", nativeQuery = true)
	public String getid();

}
