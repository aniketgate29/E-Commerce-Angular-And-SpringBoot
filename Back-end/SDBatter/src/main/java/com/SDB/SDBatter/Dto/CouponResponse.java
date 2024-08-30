package com.SDB.SDBatter.Dto;

import com.SDB.SDBatter.Entity.Coupon;

public class CouponResponse {
    private String message;
    private Coupon coupon;

    public CouponResponse(String message, Coupon coupon) {
        this.message = message;
        this.coupon = coupon;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Coupon getCoupon() {
        return coupon;
    }

    public void setCoupon(Coupon coupon) {
        this.coupon = coupon;
    }
}

