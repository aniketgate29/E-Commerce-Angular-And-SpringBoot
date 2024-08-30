package com.SDB.SDBatter.Dto;

import com.SDB.SDBatter.Entity.Orders;

public class OrderResponse {
	
	private String message;
	private Orders order;
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Orders getOrder() {
		return order;
	}
	public void setOrder(Orders order) {
		this.order = order;
	}
	
	

}
