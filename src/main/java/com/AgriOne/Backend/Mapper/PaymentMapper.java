package com.AgriOne.Backend.Mapper;

import com.AgriOne.Backend.DTO.PaymentRequestDTO;
import com.AgriOne.Backend.DTO.PaymentResponseDTO;
import com.AgriOne.Backend.Entity.Order;
import com.AgriOne.Backend.Entity.Payment;

public class PaymentMapper {

    public static PaymentResponseDTO toDTO(Payment payment) {
        if (payment == null) return null;

        return new PaymentResponseDTO(
                payment.getId(),
                payment.getOrder().getId(),
                payment.getAmount(),
                payment.getStatus().name(),
                payment.getCreatedAt()
        );
    }

    public static Payment toEntity(PaymentRequestDTO dto, Order order) {
        if (dto == null) return null;

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(dto.getAmount());
        payment.setPaymentMethod(dto.getPaymentMethod());
        payment.setStatus(Payment.PaymentStatus.PENDING);
        return payment;
    }
}
