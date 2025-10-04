package com.AgriOne.Backend.DTO;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CropRequestDTO {
    private String name;
    private String description;
    private Double quantity;
    private Double pricePerUnit;
    private List<String> imageUrls;   // multiple image URLs

    private Long farmerId;  // optional, required if agent is creating crop
}
