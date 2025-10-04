package com.AgriOne.Backend.Service;

import com.AgriOne.Backend.DTO.*;
import com.AgriOne.Backend.Entity.*;
import com.AgriOne.Backend.Mapper.OrderMapper;
import com.AgriOne.Backend.Repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final CropRepository cropRepository;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        UserRepository userRepository,
                        CropRepository cropRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.cropRepository = cropRepository;
    }

    // Place new order
public OrderResponseDTO placeOrder(OrderRequestDTO dto, Authentication auth) {
    User buyer = userRepository.findByPhoneNumber(auth.getName())
            .orElseThrow(() -> new RuntimeException("Buyer not found"));

    // Create Order
    Order order = new Order();
    order.setBuyer(buyer);
    order.setStatus(Order.OrderStatus.PENDING);

    // Build items
    List<OrderItem> items = dto.getItems().stream().map(itemDto -> {
        Crop crop = cropRepository.findById(itemDto.getCropId())
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        OrderItem item = new OrderItem();
        item.setCrop(crop);
        item.setFarmer(crop.getFarmer());
        item.setQuantity(itemDto.getQuantity());

        // Use DTO pricePerUnit if provided, otherwise crop price
        double pricePerUnit = (itemDto.getPricePerUnit() != null)
                ? itemDto.getPricePerUnit()
                : crop.getPricePerUnit();

        double totalPrice = pricePerUnit * itemDto.getQuantity();

        item.setPricePerUnit(pricePerUnit);
        item.setTotalPrice(totalPrice);
        item.setOrder(order);

        return item;
    }).collect(Collectors.toList());

    // ✅ Calculate total outside the stream
    double total = items.stream()
            .mapToDouble(OrderItem::getTotalPrice)
            .sum();

    order.setItems(items);
    order.setTotalAmount(total);

    Order saved = orderRepository.save(order);
    return OrderMapper.toDTO(saved);
}


    // Get orders of logged-in buyer
    public List<OrderResponseDTO> getMyOrders(Authentication auth) {
        User buyer = userRepository.findByPhoneNumber(auth.getName())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        return orderRepository.findByBuyer(buyer).stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Get single order
    public OrderResponseDTO getOrder(Long id) {
        return orderRepository.findById(id)
                .map(OrderMapper::toDTO)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // Add this method to OrderService

public OrderResponseDTO updateOrderStatus(Long id, String status) {
    Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));

    try {
        Order.OrderStatus newStatus = Order.OrderStatus.valueOf(status.toUpperCase());
        order.setStatus(newStatus);
    } catch (IllegalArgumentException e) {
        throw new RuntimeException("Invalid order status: " + status);
    }

    Order updated = orderRepository.save(order);
    return OrderMapper.toDTO(updated);
}

}
