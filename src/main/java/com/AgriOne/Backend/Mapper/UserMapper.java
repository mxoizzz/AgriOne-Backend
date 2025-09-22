package com.AgriOne.Backend.Mapper;

import com.AgriOne.Backend.DTO.UserRegisterDTO;
import com.AgriOne.Backend.DTO.UserResponseDTO;
import com.AgriOne.Backend.DTO.UserUpdateDTO;
import com.AgriOne.Backend.Entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    // Entity → ResponseDTO
    public UserResponseDTO toResponseDTO(User user) {
        if (user == null) return null;

        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());

        return dto;
    }

    // RegisterDTO → Entity
    public User toEntity(UserRegisterDTO dto) {
        if (dto == null) return null;

        User user = new User();
        user.setName(dto.getName());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); // Later: hash password
        user.setRole(dto.getRole());

        return user;
    }

    // UpdateDTO → Entity (partial update)
    public void updateEntityFromDTO(UserUpdateDTO dto, User user) {
        if (dto.getName() != null) user.setName(dto.getName());
        if (dto.getPhoneNumber() != null) user.setPhoneNumber(dto.getPhoneNumber());
        if (dto.getEmail() != null) user.setEmail(dto.getEmail());
        if (dto.getPassword() != null) user.setPassword(dto.getPassword());
    }
}
