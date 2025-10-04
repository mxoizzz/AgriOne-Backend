package com.AgriOne.Backend.Controller;

import com.AgriOne.Backend.DTO.*;
import com.AgriOne.Backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // ---------------- Registration ----------------
    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserRegisterDTO dto) {
        UserResponseDTO response = userService.register(dto);
        return ResponseEntity.ok(response);
    }

    // ---------------- Login ----------------
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserLoginDTO dto) {
        Map<String, Object> response = userService.login(dto);
        return ResponseEntity.ok(response);
    }

    // ---------------- Update Profile ----------------
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable Long id,
            @RequestBody UserUpdateDTO dto) {
        UserResponseDTO response = userService.updateUser(id, dto);
        return ResponseEntity.ok(response);
    }

    // ---------------- Change Password ----------------
    @PutMapping("/{id}/change-password")
    public ResponseEntity<String> changePassword(
            @PathVariable Long id,
            @RequestBody PasswordChangeDTO dto) {
        userService.changePassword(id, dto);
        return ResponseEntity.ok("Password changed successfully");
    }

    // ---------------- Get User By ID ----------------
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id) {
        UserResponseDTO response = userService.getUserById(id);
        return ResponseEntity.ok(response);
    }
}
