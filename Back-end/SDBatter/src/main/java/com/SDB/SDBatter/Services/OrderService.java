package com.SDB.SDBatter.Services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.SDB.SDBatter.Dto.OrderDetailsDto;
import com.SDB.SDBatter.Dto.OrderItemDto;
import com.SDB.SDBatter.Dto.OrderProductDto;
import com.SDB.SDBatter.Entity.Coupon;
import com.SDB.SDBatter.Entity.OrderProduct;
import com.SDB.SDBatter.Entity.Orders;
import com.SDB.SDBatter.Entity.User;
import com.SDB.SDBatter.Entity.product;
import com.SDB.SDBatter.Repo.CouponRepo;
import com.SDB.SDBatter.Repo.OrderProductRepo;
import com.SDB.SDBatter.Repo.OrderRepo;
import com.SDB.SDBatter.Repo.ProductRepo;
import com.SDB.SDBatter.Repo.UserRepo;

@Service
public class OrderService {

    @Autowired
    private OrderProductRepo orderProductRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private OrderRepo orderRepo;
    
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private CouponRepo couponRepo;
    @Transactional
    public Orders createOrder(User user, List<OrderItemDto> orderItemDtos,Coupon coupon) {
        // Fetch the user from the database to ensure it is managed
        User managedUser = userRepo.findById(user.getUser_id())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Orders order = new Orders();
        order.setUser(managedUser);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("NEW");
        order.setArea(user.getArea());
        order.setFlat_no(user.getFlat_no());
        order.setSociaty_name(user.getSociaty_name());
        order.setWing_name(user.getWing_name());
        

        List<OrderProduct> orderProducts = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemDto dto : orderItemDtos) {
            product product = productRepo.findById(dto.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
 
         // Check if the product has enough quantity
            if (product.getQuantities() < dto.getQuantity()) {
                throw new IllegalArgumentException("Not enough quantity for product: " + product.getName());
            }

            // Subtract the ordered quantity from the product's stock
            product.setQuantities(product.getQuantities() - dto.getQuantity());
            productRepo.save(product);
            
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrder(order);
            orderProduct.setProduct(product);
            orderProduct.setQuantity(dto.getQuantity());
            orderProduct.setPrice(product.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity())));
            orderProducts.add(orderProduct);

             total = total.add(orderProduct.getPrice());
        }
        
        if(coupon!=null) {
        Coupon coupan= couponRepo.findById(coupon.getCoupon_id())
        		.orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        if (coupan.getDiscount() > 0) {
            BigDecimal discountAmount = total.multiply(BigDecimal.valueOf(coupan.getDiscount())).divide(BigDecimal.valueOf(100));
            total = total.subtract(discountAmount);
            order.setCoupon(coupan);
        }
        }

        order.setOrderProducts(orderProducts);
        order.setTotalAmount(total);

        Orders savedOrder = orderRepo.save(order);
        for (OrderProduct orderProduct : orderProducts) {
            orderProductRepo.save(orderProduct);
        }

        return savedOrder;
    }

    
    @Transactional
    public void deleteOrder(Long orderId) {
        Orders order = orderRepo.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        
        for (OrderProduct orderProduct : order.getOrderProducts()) {
            orderProductRepo.delete(orderProduct);
        }
        
        orderRepo.delete(order);
    }
    @Transactional
    public Orders updateOrder( long order_id,Orders orders, List<OrderItemDto> orderItemDtos) {
        Orders order = orderRepo.findById(order_id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        // Restore quantities of products in the original order
        for (OrderProduct originalOrderProduct : order.getOrderProducts()) {
            product originalProduct = originalOrderProduct.getProduct();
            originalProduct.setQuantities(originalProduct.getQuantities() + originalOrderProduct.getQuantity());
            productRepo.save(originalProduct);
        }

        // Clear existing order products
        orderProductRepo.deleteAll(order.getOrderProducts());
        order.getOrderProducts().clear();

        List<OrderProduct> orderProducts = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemDto dto : orderItemDtos) {
            product product = productRepo.findById(dto.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            // Check if the product has enough quantity
            if (product.getQuantities() < dto.getQuantity()) {
                throw new IllegalArgumentException("Not enough quantity for product: " + product.getName());
            }

            // Subtract the ordered quantity from the product's stock
            product.setQuantities(product.getQuantities() - dto.getQuantity());
            productRepo.save(product);

            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrder(order);
            orderProduct.setProduct(product);
            orderProduct.setQuantity(dto.getQuantity());
            orderProduct.setPrice(product.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity())));
            orderProducts.add(orderProduct);

            total = total.add(orderProduct.getPrice());
        }

        order.setOrderProducts(orderProducts);
        order.setTotalAmount(total);

        Orders updatedOrder = orderRepo.save(order);
        for (OrderProduct orderProduct : orderProducts) {
            orderProductRepo.save(orderProduct);
        }

        return updatedOrder;
    }

    

    public List<Orders> getAllOrderDetails() {
        List<Orders> orders = orderRepo.findAll();
       

        return orders;
    }
    
    public List<OrderDetailsDto> getOrdersByUser(String mobileNumber) {
        // Find the user by mobile number
    	long mobile=Long.parseLong(mobileNumber);
        User user = userRepo.findByMobile(mobile);
        List<Orders> orders = orderRepo.findByUser(user);

        // Map orders to DTOs
        return mapToOrderDetailsDto(orders);
    }

    private List<OrderDetailsDto> mapToOrderDetailsDto(List<Orders> orders) {
        List<OrderDetailsDto> orderDetailsDtos = new ArrayList<>();

        for (Orders order : orders) {
            OrderDetailsDto dto = new OrderDetailsDto();
            dto.setOrderId(order.getOrder_id());
            dto.setUserName((order.getUser().getFirst_name())+" "+order.getUser().getLast_name());
            dto.setSociatyName(order.getSociaty_name());
            dto.setFlatNo(order.getFlat_no());
            dto.setWingName(order.getWing_name());
            dto.setArea(order.getArea());
           
            dto.setStatus(order.getStatus());

            List<OrderProductDto> orderProductDtos = new ArrayList<>();
            for (OrderProduct orderProduct : order.getOrderProducts()) {
                OrderProductDto orderProductDto = new OrderProductDto();
                orderProductDto.setProductName(orderProduct.getProduct().getName());
                orderProductDto.setQuantity(orderProduct.getQuantity());
                orderProductDtos.add(orderProductDto);
            }
            dto.setOrderProducts(orderProductDtos);

            orderDetailsDtos.add(dto);
        }

        return orderDetailsDtos;
    }

}

 class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    
    
}
