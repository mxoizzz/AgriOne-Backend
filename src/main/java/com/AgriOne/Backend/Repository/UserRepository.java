package com.AgriOne.Backend.Repository;

import com.AgriOne.Backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find by phone number (for farmers or login)
    Optional<User> findByPhoneNumber(String phoneNumber);

    // Find by email (for agents/buyers or login)
    Optional<User> findByEmail(String email);

    // Optional: check existence for validation
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByEmail(String email);
}
