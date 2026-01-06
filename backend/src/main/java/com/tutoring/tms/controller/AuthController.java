package com.tutoring.tms.controller;

import com.tutoring.tms.model.User;
import com.tutoring.tms.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

/**
 * Controller handling Authentication, Login and Password management.
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        return userRepository.findByUsername(username)
                .map(user -> {
                    if (passwordEncoder.matches(password, user.getPassword())) {
                        Map<String, Object> response = new HashMap<>();
                        response.put("username", user.getUsername());
                        response.put("role", user.getRole());
                        response.put("status", "success");
                        response.put("password", password);

                        if (user.getTeacher() != null) {
                            response.put("id", user.getTeacher().getId());
                        } else {
                            response.put("id", 0);
                        }

                        return ResponseEntity.ok((Object) response);
                    } else {
                        Map<String, String> error = new HashMap<>();
                        error.put("message", "Invalid password.");
                        return ResponseEntity.status(401).body((Object) error);
                    }
                })
                .orElseGet(() -> {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "User not found.");
                    return ResponseEntity.status(401).body(error);
                });
    }

    /**
     * Password reset functionality initiated by Admin.
     */
    @PostMapping("/reset-password")
    @Transactional
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, Object> request) {
        try {
            Long teacherId = Long.valueOf(request.get("teacherId").toString());
            String newPassword = (String) request.get("password");

            if (newPassword == null || newPassword.length() < 4) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Password must be at least 4 characters long.");
                return ResponseEntity.badRequest().body(error);
            }

            return userRepository.findByTeacherId(teacherId)
                    .map(user -> {
                        user.setPassword(passwordEncoder.encode(newPassword));
                        userRepository.save(user);

                        Map<String, String> response = new HashMap<>();
                        response.put("message", "Password for user " + user.getUsername() + " has been updated!");
                        return ResponseEntity.ok((Object) response);
                    })
                    .orElseGet(() -> {
                        Map<String, String> error = new HashMap<>();
                        error.put("message", "No account found for this teacher.");
                        return ResponseEntity.status(404).body(error);
                    });
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error while updating password: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * ADDITION: Password Reset Request.
     * Checks if username exists and returns success confirmation.
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String username = request.get("username");

        return userRepository.findByUsername(username)
                .map(user -> {
                    // In a real application, a reset email would be sent here.
                    // For now, we simply confirm the user exists.
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Request received for user: " + username);
                    return ResponseEntity.ok((Object) response);
                })
                .orElseGet(() -> {
                    // Returns 404 so the React frontend can display the appropriate error.
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "Username not found in the system.");
                    return ResponseEntity.status(404).body(error);
                });
    }
}