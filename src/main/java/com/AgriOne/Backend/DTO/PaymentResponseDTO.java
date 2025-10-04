package com.AgriOne.Backend.DTO;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponseDTO {
    private Long id;
    private Long orderId;
    private Double amount;
    private String status; // SUCCESS, FAILED, PENDING
    private LocalDateTime createdAt;
}
