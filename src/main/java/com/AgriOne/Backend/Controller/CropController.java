package com.AgriOne.Backend.Controller;

import com.AgriOne.Backend.DTO.CropRequestDTO;
import com.AgriOne.Backend.DTO.CropResponseDTO;
import com.AgriOne.Backend.DTO.CropUpdateDTO;
import com.AgriOne.Backend.Entity.User;
import com.AgriOne.Backend.Service.CropService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crops")
public class CropController {

    private final CropService cropService;

    public CropController(CropService cropService) {
        this.cropService = cropService;
    }

    // -------------------------
    // Create crop
    // Frontend sends image URLs in DTO
    // -------------------------
    @PostMapping
    public ResponseEntity<CropResponseDTO> addCrop(
            @RequestBody CropRequestDTO dto,
            Authentication auth
    ) {
        User user = (User) auth.getPrincipal();
        dto.setFarmerId(user.getId()); // ensure current user is the farmer
        return ResponseEntity.ok(cropService.createCrop(dto));
    }

    // -------------------------
    // Get all crops
    // -------------------------
    @GetMapping
    public ResponseEntity<List<CropResponseDTO>> getAllCrops() {
        return ResponseEntity.ok(cropService.getAllCrops());
    }

    // -------------------------
    // Get crops of current farmer
    // -------------------------
    @GetMapping("/my")
    public ResponseEntity<List<CropResponseDTO>> getMyCrops(Authentication auth) {
        User user = (User) auth.getPrincipal();
        return ResponseEntity.ok(cropService.getCropsByFarmer(user.getId()));
    }

    // -------------------------
    // Update crop
    // Frontend sends new image URLs in DTO if updated
    // -------------------------
    @PutMapping("/{id}")
    public ResponseEntity<CropResponseDTO> updateCrop(
            @PathVariable Long id,
            @RequestBody CropUpdateDTO dto,
            Authentication auth
    ) {
        User user = (User) auth.getPrincipal();
        // optional: validate crop ownership before updating
        return ResponseEntity.ok(cropService.updateCrop(id, dto));
    }

    // -------------------------
    // Delete crop
    // -------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCrop(@PathVariable Long id, Authentication auth) {
        User user = (User) auth.getPrincipal();
        // optional: validate crop ownership before deleting
        cropService.deleteCrop(id);
        return ResponseEntity.noContent().build();
    }
}
