package com.AgriOne.Backend.Controller;

import com.AgriOne.Backend.DTO.OrderRequestDTO;
import com.AgriOne.Backend.DTO.OrderResponseDTO;
import com.AgriOne.Backend.Service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // Place a new order
    @PostMapping
    public ResponseEntity<OrderResponseDTO> placeOrder(
            @RequestBody OrderRequestDTO dto,
            Authentication auth) {
        return ResponseEntity.ok(orderService.placeOrder(dto, auth));
    }

    // Get logged-in user's orders
    @GetMapping("/my")
    public ResponseEntity<List<OrderResponseDTO>> getMyOrders(Authentication auth) {
        return ResponseEntity.ok(orderService.getMyOrders(auth));
    }

    // Get single order details
    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrder(id));
    }

    // Update order status (admin/agent)
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponseDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam("status") String status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
