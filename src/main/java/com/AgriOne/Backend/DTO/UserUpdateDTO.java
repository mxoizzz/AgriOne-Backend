package com.AgriOne.Backend.DTO;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private String name;
    private String phoneNumber;  // still unique
    private String email;        // optional
    private String password;     // optional for change
}
