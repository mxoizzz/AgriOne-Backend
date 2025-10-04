package com.AgriOne.Backend.Service;

import com.AgriOne.Backend.DTO.CropRequestDTO;
import com.AgriOne.Backend.DTO.CropResponseDTO;
import com.AgriOne.Backend.DTO.CropUpdateDTO;
import com.AgriOne.Backend.Entity.Crop;
import com.AgriOne.Backend.Entity.User;
import com.AgriOne.Backend.Mapper.CropMapper;
import com.AgriOne.Backend.Repository.CropRepository;
import com.AgriOne.Backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CropService {

    @Autowired
    private CropRepository cropRepository;

    @Autowired
    private UserRepository userRepository;

    // -------------------------
    // Create crop (frontend sends image URLs)
    // -------------------------
    public CropResponseDTO createCrop(CropRequestDTO dto) {
        User farmer = userRepository.findById(dto.getFarmerId())
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        Crop crop = CropMapper.toEntity(dto, farmer); // dto already contains image URLs
        Crop saved = cropRepository.save(crop);
        return CropMapper.toDTO(saved);
    }

    // -------------------------
    // Get single crop by ID
    // -------------------------
    public CropResponseDTO getCrop(Long cropId) {
        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));
        return CropMapper.toDTO(crop);
    }

    // -------------------------
    // Get all crops
    // -------------------------
    public List<CropResponseDTO> getAllCrops() {
        return cropRepository.findAll().stream()
                .map(CropMapper::toDTO)
                .collect(Collectors.toList());
    }

    // -------------------------
    // Get crops of a specific farmer
    // -------------------------
    public List<CropResponseDTO> getCropsByFarmer(Long farmerId) {
        return cropRepository.findByFarmerId(farmerId).stream()
                .map(CropMapper::toDTO)
                .collect(Collectors.toList());
    }

    // -------------------------
    // Search crops by name
    // -------------------------
    public List<CropResponseDTO> searchCrops(String keyword) {
        return cropRepository.findByNameContainingIgnoreCase(keyword).stream()
                .map(CropMapper::toDTO)
                .collect(Collectors.toList());
    }

    // -------------------------
    // Update crop (frontend sends new image URLs if any)
    // -------------------------
    public CropResponseDTO updateCrop(Long cropId, CropUpdateDTO dto) {
        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));

        CropMapper.updateEntity(crop, dto); // dto contains updated image URLs
        Crop updated = cropRepository.save(crop);
        return CropMapper.toDTO(updated);
    }

    // -------------------------
    // Delete crop
    // -------------------------
    public void deleteCrop(Long cropId) {
        Crop crop = cropRepository.findById(cropId)
                .orElseThrow(() -> new RuntimeException("Crop not found"));
        cropRepository.delete(crop);
    }
}
