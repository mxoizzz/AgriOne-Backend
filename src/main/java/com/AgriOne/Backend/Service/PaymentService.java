package com.AgriOne.Backend.Service;

import com.AgriOne.Backend.DTO.PaymentRequestDTO;
import com.AgriOne.Backend.DTO.PaymentResponseDTO;
import com.AgriOne.Backend.Entity.*;
import com.AgriOne.Backend.Mapper.PaymentMapper;
import com.AgriOne.Backend.Repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository,
                          UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    // ✅ For backward compatibility (Controller may call initiatePayment)
    public PaymentResponseDTO initiatePayment(PaymentRequestDTO dto) {
        return createPayment(dto);
    }

    // ✅ Mock Payment (simulate Cashfree / Razorpay)
    public PaymentResponseDTO createPayment(PaymentRequestDTO dto) {
        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(dto.getAmount());
        payment.setStatus(Payment.PaymentStatus.PENDING);
        payment.setCreatedAt(LocalDateTime.now());

        Payment saved = paymentRepository.save(payment);

        // Simulate success
        saved.setStatus(Payment.PaymentStatus.SUCCESS);
        order.setStatus(Order.OrderStatus.PAID);

        // Deduct 2% platform fee → Add to farmer wallet
        double platformFee = dto.getAmount() * 0.02;
        double farmerEarning = dto.getAmount() - platformFee;

        order.getItems().forEach(item -> {
            User farmer = item.getCrop().getFarmer();
            farmer.setWallet(farmer.getWallet() + farmerEarning);
            userRepository.save(farmer);
        });

        paymentRepository.save(saved);
        orderRepository.save(order);

        return PaymentMapper.toDTO(saved);
    }

    // Get all payments for an order
public List<PaymentResponseDTO> getPaymentsByOrder(Long orderId) {
    Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));

    return paymentRepository.findByOrder(order).stream()
            .map(PaymentMapper::toDTO)
            .collect(Collectors.toList());
}


    // ✅ Get single payment
    public PaymentResponseDTO getPayment(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return PaymentMapper.toDTO(payment);
    }

    // ✅ Update payment status
    public PaymentResponseDTO updatePaymentStatus(Long id, String status) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        try {
            Payment.PaymentStatus newStatus = Payment.PaymentStatus.valueOf(status.toUpperCase());
            payment.setStatus(newStatus);

            // Sync order status if payment succeeded
            if (newStatus == Payment.PaymentStatus.SUCCESS) {
                Order order = payment.getOrder();
                order.setStatus(Order.OrderStatus.PAID);
                orderRepository.save(order);
            }

        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid payment status: " + status);
        }

        Payment updated = paymentRepository.save(payment);
        return PaymentMapper.toDTO(updated);
    }
}
