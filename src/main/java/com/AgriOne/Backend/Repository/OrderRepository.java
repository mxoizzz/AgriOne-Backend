package com.AgriOne.Backend.Repository;

import com.AgriOne.Backend.Entity.Order;
import com.AgriOne.Backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByBuyer(User buyer);
    List<Order> findByStatus(Order.OrderStatus status);
}
