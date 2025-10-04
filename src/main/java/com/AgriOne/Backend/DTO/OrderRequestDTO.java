package com.AgriOne.Backend.DTO;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {
    private Long buyerId;                  // optional, can use auth
    private List<OrderItemDTO> items;      // list of items being ordered
}
