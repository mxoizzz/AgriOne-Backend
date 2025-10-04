package com.AgriOne.Backend.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "crops")
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // Optional: Category
    private String category;

    @Column(nullable = false)
    private Double pricePerUnit;

    @Column(nullable = false)
    private String unit; // e.g., kg, quintal

    @Column(nullable = false)
    private Double quantity;

    private String description;

    // Cloudinary URLs for images
    @ElementCollection
    private List<String> imageUrls;

    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private User farmer;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
