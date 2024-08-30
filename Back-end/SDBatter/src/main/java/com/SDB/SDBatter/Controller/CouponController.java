package com.SDB.SDBatter.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SDB.SDBatter.Dto.CouponResponse;
import com.SDB.SDBatter.Entity.Coupon;
import com.SDB.SDBatter.Services.CouponService;

@RestController
@RequestMapping("/SDS/coupon")
public class CouponController {
	
    @Autowired
    private CouponService couponService;

    @PostMapping("/create")
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon) {
        try {
            Coupon createdCoupon = couponService.createCoupon(coupon);
            return ResponseEntity.ok(createdCoupon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCoupon(@PathVariable("id") long coupon_id) {
        couponService.deleteCoupon(coupon_id);
        return ResponseEntity.ok("Coupon Deleted Successfully");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        List<Coupon> coupons = couponService.getAllCoupons();
        return ResponseEntity.ok(coupons);
    }

    @GetMapping("/{name}/user/{user_id}")
    public ResponseEntity<CouponResponse> getCoupon(
        @PathVariable("name") String name,
        @PathVariable("user_id") Long user_id
    ) {
        CouponResponse response = couponService.getCoupon(name, user_id);

        if ("Coupon not found".equals(response.getMessage())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else if ("Coupon has been used too many times".equals(response.getMessage())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            return ResponseEntity.ok(response);
        }
    }
}
