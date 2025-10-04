package com.AgriOne.Backend.Mapper;

import com.AgriOne.Backend.DTO.CropRequestDTO;
import com.AgriOne.Backend.DTO.CropResponseDTO;
import com.AgriOne.Backend.DTO.CropUpdateDTO;
import com.AgriOne.Backend.Entity.Crop;
import com.AgriOne.Backend.Entity.User;
import org.springframework.stereotype.Component;

@Component
public class CropMapper {

    // Entity → ResponseDTO
    public static CropResponseDTO toDTO(Crop crop) {
        if (crop == null) return null;

        return new CropResponseDTO(
                crop.getId(),
                crop.getName(),
                crop.getDescription(),
                crop.getQuantity(),
                crop.getPricePerUnit(),
                crop.getImageUrls(),
                crop.getCreatedAt(),
                crop.getUpdatedAt(),
                crop.getFarmer().getId(),
                crop.getFarmer().getName()
        );
    }

    // RequestDTO → Entity
    public static Crop toEntity(CropRequestDTO dto, User farmer) {
        if (dto == null) return null;

        Crop crop = new Crop();
        crop.setName(dto.getName());
        crop.setDescription(dto.getDescription());
        crop.setQuantity(dto.getQuantity());
        crop.setPricePerUnit(dto.getPricePerUnit());
        crop.setImageUrls(dto.getImageUrls()); // Will replace with Cloudinary URLs in service
        crop.setFarmer(farmer);
        return crop;
    }

    // Update existing entity with UpdateDTO
    public static void updateEntity(Crop crop, CropUpdateDTO dto) {
        if (dto.getName() != null) crop.setName(dto.getName());
        if (dto.getDescription() != null) crop.setDescription(dto.getDescription());
        if (dto.getQuantity() != null) crop.setQuantity(dto.getQuantity());
        if (dto.getPricePerUnit() != null) crop.setPricePerUnit(dto.getPricePerUnit());
        if (dto.getImageUrls() != null) crop.setImageUrls(dto.getImageUrls()); // Will replace with Cloudinary URLs in service
    }
}
