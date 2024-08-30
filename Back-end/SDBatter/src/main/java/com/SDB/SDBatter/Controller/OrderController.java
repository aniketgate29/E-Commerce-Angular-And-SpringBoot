package com.SDB.SDBatter.Controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SDB.SDBatter.Dto.CreateOrderRequest;
import com.SDB.SDBatter.Dto.OrderDetailsDto;
import com.SDB.SDBatter.Dto.OrderItemDto;
import com.SDB.SDBatter.Dto.OrderResponse;
import com.SDB.SDBatter.Dto.updateOrderRequest;
import com.SDB.SDBatter.Entity.Orders;
import com.SDB.SDBatter.Entity.User;
import com.SDB.SDBatter.Repo.OrderRepo;
import com.SDB.SDBatter.Services.OrderService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/SDS/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    /*public Orders createOrder(@RequestBody OrderItemDto orderItemDto, HttpServletRequest request) {
       
        HttpSession session = request.getSession();
        User user = (User) session.getAttribute("user");
        

        if (user != null) {
            return orderService.createOrder(user, Collections.singletonList(orderItemDto));
        } else {
            throw new RuntimeException("User details not found. Please log in.");
        }
    }
*/
    public ResponseEntity<OrderResponse> createOrder(@RequestBody CreateOrderRequest request) {
    	OrderResponse orderResponse=new OrderResponse();
        try {
            Orders order = orderService.createOrder(request.getUser(), request.getOrderItems(),request.getCoupan());
             orderResponse.setOrder(order);
             orderResponse.setMessage("Order Paced");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(orderResponse);
        } catch (ResourceNotFoundException  e) {
        	 orderResponse.setMessage("Order is not Placed" +e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orderResponse);
        } catch (Exception e) {
       	 orderResponse.setMessage("Order is not Placed" +e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(orderResponse);
        }
    }


    @DeleteMapping("/delete/{id}")
    public void deleteOrder(@PathVariable("id") Long orderId) {
        orderService.deleteOrder(orderId);
    }

    @PutMapping("/update/{id}")
    public Orders updateOrder(@PathVariable("id") Long orderId, @RequestBody updateOrderRequest request) {
        return orderService.updateOrder(orderId,request.getOrders(),request.getOrderItems() );
    }

    @GetMapping("/all")
    public List<Orders> getAllOrderDetails() {
        return orderService.getAllOrderDetails();
    }

    @GetMapping("/user/{mobileNumber}")
    public List<OrderDetailsDto> getOrdersByUser(@PathVariable("mobileNumber") String mobileNumber) {
        return orderService.getOrdersByUser(mobileNumber);
    }
}

class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    
    
}
