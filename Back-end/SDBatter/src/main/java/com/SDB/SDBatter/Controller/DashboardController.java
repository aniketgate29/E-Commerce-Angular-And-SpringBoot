package com.SDB.SDBatter.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SDB.SDBatter.Entity.Orders;
import com.SDB.SDBatter.Services.DashboardSevice;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/SDS")

public class DashboardController {

    @Autowired
    private DashboardSevice dashboardService;

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboardData() {
        Map<String, Object> response = new HashMap<>();
        response.put("totalUsers", dashboardService.getTotalUsers());
        response.put("totalOrders", dashboardService.getTotalOrders());
        response.put("todayOrders", dashboardService.getTodayOrders());
        response.put("todaySales", dashboardService.getTodaySales());
        response.put("totalProducts", dashboardService.getTotalProducts());
        return response;
    }
    
    @GetMapping("/orders/today")
    public List<Orders> getTodayOrdersWithProducts() {
        return dashboardService.getTodayOrdersWithProducts();
    }
}
