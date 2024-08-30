package com.SDB.SDBatter.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.SDB.SDBatter.Entity.Category;

public interface CategoryRepo extends JpaRepository<Category, Long>{

	public Category findByName(String name);

}
