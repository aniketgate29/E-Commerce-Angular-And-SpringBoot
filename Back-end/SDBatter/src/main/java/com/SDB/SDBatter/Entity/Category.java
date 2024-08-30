package com.SDB.SDBatter.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_category")
public class Category {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private long category_id;
	 
	 private String name;
	 
	 private String discription;
	 
		public Category() {
			super();
			// TODO Auto-generated constructor stub
		}
		public Category(long category_id, String name, String discription) {
			super();
			this.category_id = category_id;
			this.name = name;
			this.discription = discription;
		}

 

	public long getCategory_id() {
		return category_id;
	}

	public void setCategory_id(long category_id) {
		this.category_id = category_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDiscription() {
		return discription;
	}

	public void setDiscription(String discription) {
		this.discription = discription;
	}


}
