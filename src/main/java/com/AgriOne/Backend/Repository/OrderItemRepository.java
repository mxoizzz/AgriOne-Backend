package com.AgriOne.Backend.Repository;

import com.AgriOne.Backend.Entity.OrderItem;
import com.AgriOne.Backend.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrder(Order order);
}
