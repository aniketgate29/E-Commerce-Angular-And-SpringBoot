package com.SDB.SDBatter.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SDB.SDBatter.Entity.product;

@Repository
public interface ProductRepo extends JpaRepository<product, Long> {
    public product findByName(String name);
}
