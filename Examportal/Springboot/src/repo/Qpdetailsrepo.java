package com.example.examportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.examportal.model.Qpdetails;

public interface Qpdetailsrepo extends JpaRepository<Qpdetails, String> {
	@Query(value = "SELECT qpdid FROM Qpdetails ORDER BY CAST(SUBSTRING(qpdid, 2) AS SIGNED) DESC LIMIT 1", nativeQuery = true)
	public String getid();
}
