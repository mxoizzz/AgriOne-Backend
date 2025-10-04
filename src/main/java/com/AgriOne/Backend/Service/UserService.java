package com.AgriOne.Backend.Service;

import com.AgriOne.Backend.DTO.*;
import com.AgriOne.Backend.Entity.User;
import com.AgriOne.Backend.Mapper.UserMapper;
import com.AgriOne.Backend.Repository.UserRepository;
import com.AgriOne.Backend.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ---------------- Registration ----------------
    public UserResponseDTO register(UserRegisterDTO dto) {
        if (userRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
            throw new RuntimeException("Phone number already registered");
        }
        if (dto.getEmail() != null && userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        dto.setPassword(passwordEncoder.encode(dto.getPassword()));
        User user = userMapper.toEntity(dto);
        User savedUser = userRepository.save(user);

        return userMapper.toResponseDTO(savedUser);
    }

    // ---------------- Login ----------------
    public Map<String, Object> login(UserLoginDTO dto) {
        String identifier = dto.getIdentifier();
        Optional<User> userOptional;

        if (identifier.matches("\\d{10}")) {
            userOptional = userRepository.findByPhoneNumber(identifier);
        } else {
            userOptional = userRepository.findByEmail(identifier);
        }

        User user = userOptional.orElseThrow(() ->
                new RuntimeException("Invalid phone/email or password"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid phone/email or password");
        }

        String token = jwtUtil.generateToken(user);

        Map<String, Object> response = new HashMap<>();
        response.put("user", userMapper.toResponseDTO(user));
        response.put("token", token);

        return response;
    }

    // ---------------- Update User Profile ----------------
    public UserResponseDTO updateUser(Long id, UserUpdateDTO dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update basic info
        userMapper.updateEntityFromDTO(dto, user);

        // Update payout info if farmer
        if (user.getRole() == User.Role.FARMER) {
            if (dto.getBankAccountNumber() != null) user.setBankAccountNumber(dto.getBankAccountNumber());
            if (dto.getIfscCode() != null) user.setIfscCode(dto.getIfscCode());
            if (dto.getUpiId() != null) user.setUpiId(dto.getUpiId());
        }

        User updated = userRepository.save(user);
        return userMapper.toResponseDTO(updated);
    }

    // ---------------- Change Password ----------------
    public void changePassword(Long userId, PasswordChangeDTO dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
    }

    // ---------------- Get User By ID ----------------
    public UserResponseDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toResponseDTO(user);
    }
}
