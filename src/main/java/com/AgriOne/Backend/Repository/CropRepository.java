package com.AgriOne.Backend.Repository;

import com.AgriOne.Backend.Entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CropRepository extends JpaRepository<Crop, Long> {
    List<Crop> findByFarmerId(Long farmerId);
    List<Crop> findByNameContainingIgnoreCase(String keyword);
}
