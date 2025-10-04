package com.AgriOne.Backend.Repository;

import com.AgriOne.Backend.Entity.Payment;
import com.AgriOne.Backend.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByOrder(Order order);
    List<Payment> findByStatus(Payment.PaymentStatus status);
}
