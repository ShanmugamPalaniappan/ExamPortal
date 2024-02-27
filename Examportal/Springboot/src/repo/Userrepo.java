package com.example.examportal.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.examportal.model.User;

public interface Userrepo extends JpaRepository<User, String> {

	@Query(value = "SELECT userid FROM user ORDER BY CAST(SUBSTRING(userid, 2) AS SIGNED) DESC LIMIT 1", nativeQuery = true)
	public String getid();
}
