package com.SDB.SDBatter.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SDB.SDBatter.Dto.CouponResponse;
import com.SDB.SDBatter.Entity.Coupon;
import com.SDB.SDBatter.Repo.CouponRepo;
import com.SDB.SDBatter.Repo.OrderRepo;

@Service
public class CouponService {

    @Autowired
    private CouponRepo couponRepo;

    @Autowired
    private OrderRepo orderRepo;

    public Coupon createCoupon(Coupon coupon) throws Exception {
        Coupon isExist = couponRepo.findByName(coupon.getName());
        if (isExist != null) {
            throw new Exception("Coupon Is Exist With " + coupon.getName());
        }
        return couponRepo.save(coupon);
    }

    public void deleteCoupon(long coupon_id) {
        couponRepo.deleteById(coupon_id);
    }

    public List<Coupon> getAllCoupons() {
        return couponRepo.findAll();
    }

    public CouponResponse getCoupon(String name, Long user_id) {
        Optional<Coupon> optionalCoupon = Optional.ofNullable(couponRepo.findByName(name));
        
        if (!optionalCoupon.isPresent()) {
            return new CouponResponse("Coupon not found", null);
        }
        
        Coupon coupon = optionalCoupon.get();
        int usageCount = orderRepo.countByUserIdAndCouponId(user_id, coupon.getCoupon_id());
        
        if (usageCount >= 4) {
            return new CouponResponse("Coupon has been used too many times", coupon);
        }

        return new CouponResponse("Coupon is valid", coupon);
    }

}
