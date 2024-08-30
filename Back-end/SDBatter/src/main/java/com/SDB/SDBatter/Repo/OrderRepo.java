package com.SDB.SDBatter.Repo;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.SDB.SDBatter.Entity.Orders;
import com.SDB.SDBatter.Entity.User;

@Repository
public interface OrderRepo extends JpaRepository<Orders, Long> {

	List<Orders> findByUser(User user);
    
	 @Query("SELECT COUNT(o) FROM Orders o WHERE o.orderDate BETWEEN :startOfDay AND :endOfDay")
	    long countTodayOrders(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);

	    @Query("SELECT SUM(o.totalAmount) FROM Orders o WHERE o.orderDate BETWEEN :startOfDay AND :endOfDay")
	    BigDecimal sumTodaySales(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
       
	    
	    @Query("SELECT o FROM Orders o JOIN FETCH o.orderProducts op JOIN FETCH op.product WHERE o.orderDate BETWEEN :startOfDay AND :endOfDay")
	    List<Orders> findTodayOrders(@Param("startOfDay") LocalDateTime startOfDay, @Param("endOfDay") LocalDateTime endOfDay);
	
	    @Query("SELECT COUNT(o) FROM Orders o WHERE o.user.user_id = :userId AND o.coupon.coupon_id = :couponId")
	    int countByUserIdAndCouponId(@Param("userId") Long userId, @Param("couponId") Long couponId);

}