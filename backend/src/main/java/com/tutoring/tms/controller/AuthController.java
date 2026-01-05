package com.tutoring.tms.controller;

import com.tutoring.tms.model.User;
import com.tutoring.tms.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

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
                        error.put("message", "Λάθος κωδικός πρόσβασης.");
                        return ResponseEntity.status(401).body((Object) error);
                    }
                })
                .orElseGet(() -> {
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "Ο χρήστης δεν βρέθηκε.");
                    return ResponseEntity.status(401).body(error);
                });
    }

    /**
     * Επαναφορά κωδικού από τον Admin.
     */
    @PostMapping("/reset-password")
    @Transactional
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, Object> request) {
        try {
            Long teacherId = Long.valueOf(request.get("teacherId").toString());
            String newPassword = (String) request.get("password");

            if (newPassword == null || newPassword.length() < 4) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Ο κωδικός πρέπει να είναι τουλάχιστον 4 χαρακτήρες.");
                return ResponseEntity.badRequest().body(error);
            }

            return userRepository.findByTeacherId(teacherId)
                    .map(user -> {
                        user.setPassword(passwordEncoder.encode(newPassword));
                        userRepository.save(user);

                        Map<String, String> response = new HashMap<>();
                        response.put("message", "Ο κωδικός για τον χρήστη " + user.getUsername() + " ενημερώθηκε!");
                        return ResponseEntity.ok((Object) response);
                    })
                    .orElseGet(() -> {
                        Map<String, String> error = new HashMap<>();
                        error.put("message", "Δεν βρέθηκε λογαριασμός για αυτόν τον καθηγητή.");
                        return ResponseEntity.status(404).body(error);
                    });
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Σφάλμα κατά την αλλαγή κωδικού: " + e.getMessage());
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * --- ΠΡΟΣΘΗΚΗ: Αίτημα Επαναφοράς Κωδικού ---
     * Αυτή η μέθοδος ελέγχει αν υπάρχει το username και επιστρέφει επιτυχία.
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String username = request.get("username");

        return userRepository.findByUsername(username)
                .map(user -> {
                    // Εδώ σε μια πραγματική εφαρμογή θα στέλναμε email.
                    // Τώρα απλώς επιβεβαιώνουμε ότι ο χρήστης υπάρχει.
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Το αίτημα παραλήφθηκε για τον χρήστη: " + username);
                    return ResponseEntity.ok((Object) response);
                })
                .orElseGet(() -> {
                    // Αν δεν βρεθεί, στέλνουμε 404 ώστε η React να δείξει το error message
                    Map<String, String> error = new HashMap<>();
                    error.put("message", "Το όνομα χρήστη δεν βρέθηκε στο σύστημα.");
                    return ResponseEntity.status(404).body(error);
                });
    }
}