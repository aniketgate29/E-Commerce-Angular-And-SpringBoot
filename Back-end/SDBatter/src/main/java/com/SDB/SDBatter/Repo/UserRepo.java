package com.SDB.SDBatter.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SDB.SDBatter.Entity.User;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    public User findByMobile(long mobile);
}
