package com.SDB.SDBatter.Repo;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SDB.SDBatter.Entity.OrderProduct;


@Repository
public interface OrderProductRepo extends JpaRepository<OrderProduct,Long> {

}
