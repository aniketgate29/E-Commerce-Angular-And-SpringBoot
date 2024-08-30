package com.SDB.SDBatter.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SDB.SDBatter.Entity.Area;

@Repository
public interface AreaRepo extends JpaRepository<Area, Long> {
 
	public Area findByName(String area_name);
}
