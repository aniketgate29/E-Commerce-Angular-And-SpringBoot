package com.SDB.SDBatter.Entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "tbl_orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long order_id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private LocalDateTime orderDate;
    private BigDecimal totalAmount;
    private String status;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<OrderProduct> orderProducts;

    //Address
    @JsonProperty
    private String sociaty_name;
    @JsonProperty
    private String flat_no;
    @JsonProperty
    private String wing_name;
    @JsonProperty
    private String area;
    @OneToOne
    @JoinColumn(name = "coupon_id")
    private Coupon coupon;
    
    // Getters and Setters
    
   

    public User getUser() {
        return user;
    }

    public long getOrder_id() {
		return order_id;
	}

	public void setOrder_id(long order_id) {
		this.order_id = order_id;
	}

	public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal d) {
        this.totalAmount = d;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(List<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }

	public String getSociaty_name() {
		return sociaty_name;
	}

	public void setSociaty_name(String sociaty_name) {
		this.sociaty_name = sociaty_name;
	}

	public String getFlat_no() {
		return flat_no;
	}

	public void setFlat_no(String flat_no) {
		this.flat_no = flat_no;
	}

	public String getWing_name() {
		return wing_name;
	}

	public void setWing_name(String wing_name) {
		this.wing_name = wing_name;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public Coupon getCoupon() {
		return coupon;
	}

	public void setCoupon(Coupon coupon) {
		this.coupon = coupon;
	}
	
	
    
    
}
