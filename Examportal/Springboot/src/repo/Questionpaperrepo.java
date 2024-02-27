package com.example.examportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.examportal.model.Questionpaper;

public interface Questionpaperrepo extends JpaRepository<Questionpaper, String>{
	@Query(value = "SELECT qpid FROM Questionpaper ORDER BY CAST(SUBSTRING(qpid, 3) AS SIGNED) DESC LIMIT 1", nativeQuery = true)
	public String getid();
}
