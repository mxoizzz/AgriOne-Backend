package com.AgriOne.Backend.Service;

import com.AgriOne.Backend.DTO.UserLoginDTO;
import com.AgriOne.Backend.DTO.UserRegisterDTO;
import com.AgriOne.Backend.DTO.UserResponseDTO;
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

    // Registration
    public UserResponseDTO register(UserRegisterDTO dto) {
        // Validate unique phone/email
        if (userRepository.existsByPhoneNumber(dto.getPhoneNumber())) {
            throw new RuntimeException("Phone number already registered");
        }
        if (dto.getEmail() != null && userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // Hash password
        dto.setPassword(passwordEncoder.encode(dto.getPassword()));

        User user = userMapper.toEntity(dto);
        User savedUser = userRepository.save(user);

        return userMapper.toResponseDTO(savedUser);
    }

    // Login using identifier (phone or email) and return JWT
    public Map<String, Object> login(UserLoginDTO dto) {
        String identifier = dto.getIdentifier();

        Optional<User> userOptional;
        if (identifier.matches("\\d{10}")) { // phone
            userOptional = userRepository.findByPhoneNumber(identifier);
        } else { // email
            userOptional = userRepository.findByEmail(identifier);
        }

        User user = userOptional.orElseThrow(() -> new RuntimeException("Invalid phone/email or password"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid phone/email or password");
        }

        // Generate JWT
        String token = jwtUtil.generateToken(user);

        // Prepare response
        Map<String, Object> response = new HashMap<>();
        response.put("user", userMapper.toResponseDTO(user));
        response.put("token", token);

        return response;
    }
}
