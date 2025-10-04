package com.AgriOne.Backend.DTO;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private Long id;
    private Long buyerId;
    private String buyerName;
    private List<OrderItemDTO> items;
    private Double totalAmount;
    private String status;                 // PENDING, PAID, CANCELLED, COMPLETED
    private String paymentLink;            // optional for mock payment
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
