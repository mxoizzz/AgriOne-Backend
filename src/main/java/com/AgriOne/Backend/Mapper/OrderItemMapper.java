package com.AgriOne.Backend.Mapper;

import com.AgriOne.Backend.DTO.OrderItemDTO;
import com.AgriOne.Backend.Entity.Crop;
import com.AgriOne.Backend.Entity.Order;
import com.AgriOne.Backend.Entity.OrderItem;

public class OrderItemMapper {

    public static OrderItemDTO toDTO(OrderItem item) {
        if (item == null) return null;

        return new OrderItemDTO(
                item.getId(),
                item.getCrop().getId(),
                item.getCrop().getName(),
                item.getQuantity(),
                item.getPricePerUnit(),
                item.getTotalPrice(),
                item.getCrop().getFarmer().getId(),
                item.getCrop().getFarmer().getName()
        );
    }

    public static OrderItem toEntity(OrderItemDTO dto, Crop crop, Order order) {
        if (dto == null) return null;

        OrderItem item = new OrderItem();
        item.setCrop(crop);
        item.setOrder(order);
        item.setQuantity(dto.getQuantity());
        item.setPricePerUnit(crop.getPricePerUnit());
        item.setTotalPrice(crop.getPricePerUnit() * dto.getQuantity());
        return item;
    }
}
