package com.AgriOne.Backend.DTO;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private Long id;           // DB generated
    private Long cropId;       // linked crop
    private String cropName;
    private Integer quantity;
    private Double pricePerUnit;
    private Double totalPrice; // quantity * pricePerUnit
    private Long farmerId;
    private String farmerName;
}
