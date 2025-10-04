package com.AgriOne.Backend.Service;

import com.AgriOne.Backend.Entity.Order;
import com.AgriOne.Backend.Entity.OrderItem;
import com.AgriOne.Backend.Repository.OrderItemRepository;
import com.AgriOne.Backend.Repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private final OrderRepository orderRepository;

    public OrderItemService(OrderItemRepository orderItemRepository, OrderRepository orderRepository) {
        this.orderItemRepository = orderItemRepository;
        this.orderRepository = orderRepository;
    }

    public List<OrderItem> getItemsByOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return orderItemRepository.findByOrder(order);
    }
}
