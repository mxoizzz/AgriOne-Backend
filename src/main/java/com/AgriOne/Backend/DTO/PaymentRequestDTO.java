package com.AgriOne.Backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDTO {
    private Long orderId;
    private Double amount;
    private String paymentMethod; // CASH, MOCK, UPI, CARD etc.
}
