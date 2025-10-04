package com.AgriOne.Backend.Mapper;

import com.AgriOne.Backend.DTO.OrderResponseDTO;
import com.AgriOne.Backend.DTO.OrderRequestDTO;
import com.AgriOne.Backend.Entity.Order;
import com.AgriOne.Backend.Entity.User;

import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderResponseDTO toDTO(Order order) {
        if (order == null) return null;

        return new OrderResponseDTO(
                order.getId(),
                order.getBuyer().getId(),
                order.getBuyer().getName(),
                order.getItems().stream()
                        .map(OrderItemMapper::toDTO)
                        .collect(Collectors.toList()),
                order.getTotalAmount(),
                order.getStatus().name(),
                order.getPaymentLink(),
                order.getCreatedAt(),
                order.getUpdatedAt()
        );
    }

    public static Order toEntity(OrderRequestDTO dto, User buyer) {
        if (dto == null) return null;

        Order order = new Order();
        order.setBuyer(buyer);
        order.setStatus(Order.OrderStatus.PENDING);
        order.setTotalAmount(0.0); // will calculate later in service
        return order;
    }
}
