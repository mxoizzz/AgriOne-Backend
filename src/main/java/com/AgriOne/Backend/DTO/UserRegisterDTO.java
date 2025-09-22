package com.AgriOne.Backend.DTO;

import com.AgriOne.Backend.Entity.User.Role;
import lombok.Data;

@Data
public class UserRegisterDTO {
    private String name;
    private String phoneNumber;   // required
    private String email;         // optional
    private String password;
    private Role role;
}
