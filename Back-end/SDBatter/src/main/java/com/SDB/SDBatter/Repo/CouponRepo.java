package com.SDB.SDBatter.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SDB.SDBatter.Entity.Coupon;

@Repository 
public interface CouponRepo extends JpaRepository<Coupon, Long> {
   
	 public Coupon findByName(String name);
}
