package com.SDB.SDBatter.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SDB.SDBatter.Entity.Orders;
import com.SDB.SDBatter.Repo.OrderRepo;
import com.SDB.SDBatter.Repo.ProductRepo;
import com.SDB.SDBatter.Repo.UserRepo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class DashboardSevice {

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private OrderRepo orderRepository;

    @Autowired
    private ProductRepo productRepository;

    public long getTotalUsers() {
        return userRepository.count();
    }

    public long getTotalOrders() {
        return orderRepository.count();
    }

    public long getTodayOrders() {
        LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);
        return orderRepository.countTodayOrders(startOfDay, endOfDay);
    }

    public BigDecimal getTodaySales() {
        LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);
        return Optional.ofNullable(orderRepository.sumTodaySales(startOfDay, endOfDay)).orElse(BigDecimal.ZERO);
    }

    public long getTotalProducts() {
        return productRepository.count();
    }
    
    public List<Orders> getTodayOrdersWithProducts() {
        LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);
        return orderRepository.findTodayOrders(startOfDay, endOfDay);
    }
}
