package com.AgriOne.Backend.DTO;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CropUpdateDTO {
    private String name;            // optional, update if provided
    private String description;     // optional
    private Double quantity;        // optional
    private Double pricePerUnit;    // optional

    // Updated list of image URLs (Cloudinary links)
    private List<String> imageUrls;
}
