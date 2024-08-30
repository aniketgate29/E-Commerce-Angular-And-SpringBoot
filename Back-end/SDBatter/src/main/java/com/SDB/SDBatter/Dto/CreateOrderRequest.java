package com.SDB.SDBatter.Dto;

import java.util.List;

import com.SDB.SDBatter.Entity.Coupon;
import com.SDB.SDBatter.Entity.User;

import lombok.Data;

public class CreateOrderRequest {
	private User user;
    private List<OrderItemDto> orderItems;
    private Coupon coupan;
    
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public List<OrderItemDto> getOrderItems() {
		return orderItems;
	}
	public void setOrderItems(List<OrderItemDto> orderItems) {
		this.orderItems = orderItems;
	}
	public Coupon getCoupan() {
		return coupan;
	}
	public void setCoupan(Coupon coupan) {
		this.coupan = coupan;
	}
	
	
    
    
}
