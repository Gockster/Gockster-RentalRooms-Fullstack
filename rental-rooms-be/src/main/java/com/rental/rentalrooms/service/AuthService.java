package com.rental.rentalrooms.service;

import com.rental.rentalrooms.model.User;
import com.rental.rentalrooms.repository.UserRepository;
import com.rental.rentalrooms.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public ResponseEntity<?> signUp(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    public ResponseEntity<?> signIn(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail())
                .orElse(null);
        if (existingUser == null || !passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        String token = jwtUtil.generateToken(existingUser.getEmail());
        // Return user info and token as JSON
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", existingUser.getEmail());
        response.put("userFirstName", existingUser.getUserFirstName());
        response.put("userLastName", existingUser.getUserLastName());
        response.put("phoneNumber", existingUser.getPhoneNumber());
        response.put("roles", existingUser.getRoles());
        response.put("id", existingUser.getId());
        return ResponseEntity.ok(response);
    }
}