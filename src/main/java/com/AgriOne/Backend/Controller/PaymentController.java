package com.AgriOne.Backend.Controller;

import com.AgriOne.Backend.DTO.PaymentRequestDTO;
import com.AgriOne.Backend.DTO.PaymentResponseDTO;
import com.AgriOne.Backend.Service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    // Initiate a payment (mock / Razorpay integration)
    @PostMapping
    public ResponseEntity<PaymentResponseDTO> initiatePayment(@RequestBody PaymentRequestDTO dto) {
        return ResponseEntity.ok(paymentService.initiatePayment(dto));
    }

    // Get all payments for an order
    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<PaymentResponseDTO>> getPaymentsByOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(paymentService.getPaymentsByOrder(orderId));
    }

    // Get single payment details
    @GetMapping("/{id}")
    public ResponseEntity<PaymentResponseDTO> getPayment(@PathVariable Long id) {
        return ResponseEntity.ok(paymentService.getPayment(id));
    }

    // Update payment status (callback or manual)
    @PutMapping("/{id}/status")
    public ResponseEntity<PaymentResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam("status") String status) {
        return ResponseEntity.ok(paymentService.updatePaymentStatus(id, status));
    }
}
