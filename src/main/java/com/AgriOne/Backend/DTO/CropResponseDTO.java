package com.AgriOne.Backend.DTO;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CropResponseDTO {

    private Long id;
    private String name;
    private String description;
    private Double quantity;
    private Double pricePerUnit;

    // URLs of images stored in Cloudinary
    private List<String> imageUrls;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Farmer info
    private Long farmerId;
    private String farmerName;
}
