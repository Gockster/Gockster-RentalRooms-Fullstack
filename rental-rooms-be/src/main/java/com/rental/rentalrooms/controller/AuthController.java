package com.rental.rentalrooms.controller;

import com.rental.rentalrooms.model.User;
import com.rental.rentalrooms.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        return authService.signUp(user);
    }

    @PostMapping("/auth/signin")
    public ResponseEntity<?> signIn(@RequestBody User user) {
        return authService.signIn(user);
    }
}
