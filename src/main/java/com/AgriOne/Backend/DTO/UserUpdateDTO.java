package com.AgriOne.Backend.DTO;

import lombok.Data;

@Data
public class UserUpdateDTO {
    private String name;
    private String phoneNumber;  // must remain unique
    private String email;        // optional
    private String password;     // optional, only if user wants to change

    // Farmer payout details (optional for other roles, required if role == FARMER)
    private String bankAccountNumber;
    private String ifscCode;
    private String upiId;
}
