package com.AgriOne.Backend.Controller;

import com.AgriOne.Backend.DTO.UserLoginDTO;
import com.AgriOne.Backend.DTO.UserRegisterDTO;
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

    // Registration endpoint
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserRegisterDTO dto) {
        return ResponseEntity.ok(userService.register(dto));
    }

    // Login endpoint (returns JWT + user info)
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserLoginDTO dto) {
        Map<String, Object> response = userService.login(dto);
        return ResponseEntity.ok(response);
    }
}
