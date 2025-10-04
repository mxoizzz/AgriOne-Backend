package com.AgriOne.Backend.DTO;

import com.AgriOne.Backend.Entity.User.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private Long id;
    private String name;
    private String phoneNumber;
    private String email;
    private Role role;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Essential extra fields
    private Double wallet;        // Farmer's earnings
    private boolean hasBankInfo; // true if bankAccountNumber and ifscCode are set
}
