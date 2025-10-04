package com.AgriOne.Backend.Entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    public enum Role {
        FARMER,
        AGENT,
        BUYER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true)
    private String email; // optional

    @Column(nullable = false, unique = true)
    private String phoneNumber; // primary login identifier

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Farmer payout info
    private String bankAccountNumber; // for payouts
    private String ifscCode;          // for payouts
    private String upiId;             // optional alternative

    // Platform mapping / mock payment
    private String beneficiaryId;

    // Platform wallet (mock earnings)
    private Double wallet = 0.0;

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
