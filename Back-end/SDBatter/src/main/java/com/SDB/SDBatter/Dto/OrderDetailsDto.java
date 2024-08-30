package com.SDB.SDBatter.Dto;

import java.util.List;

public class OrderDetailsDto {
    private Long orderId;
    private String userName;
    private String sociatyName;
    private String flatNo;
    private String wingName;
    private String area;
    private List<OrderProductDto> orderProducts;
    private String status;

    // Getters and setters
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getSociatyName() { return sociatyName; }
    public void setSociatyName(String sociatyName) { this.sociatyName = sociatyName; }

    public String getFlatNo() { return flatNo; }
    public void setFlatNo(String flatNo) { this.flatNo = flatNo; }

    public String getWingName() { return wingName; }
    public void setWingName(String wingName) { this.wingName = wingName; }
    
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
    

    public List<OrderProductDto> getOrderProducts() { return orderProducts; }
    public void setOrderProducts(List<OrderProductDto> orderProducts) { this.orderProducts = orderProducts; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}

