package com.SDB.SDBatter.Dto;

import java.util.List;

import com.SDB.SDBatter.Entity.Orders;

import lombok.Data;

@Data
public class updateOrderRequest {


	private Orders orders;
    private List<OrderItemDto> orderItems;
    
    
    
	public Orders getOrders() {
		return orders;
	}
	public void setOrders(Orders orders) {
		this.orders = orders;
	}
	public List<OrderItemDto> getOrderItems() {
		return orderItems;
	}
	public void setOrderItems(List<OrderItemDto> orderItems) {
		this.orderItems = orderItems;
	}
    
    
}
