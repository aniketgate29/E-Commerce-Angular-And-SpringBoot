package com.SDB.SDBatter.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_area")
public class Area {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
 private long area_id;
 
 private String name;
	public Area() {

	}
 public Area(long area_id, String name) {
		super();
		this.area_id = area_id;
		this.name = name;
	}


public long getArea_id() {
	return area_id;
}

public void setArea_id(long area_id) {
	this.area_id = area_id;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}



 
}
