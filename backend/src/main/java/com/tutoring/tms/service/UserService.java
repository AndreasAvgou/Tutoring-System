package com.tutoring.tms.service;

import com.tutoring.tms.model.User;
import com.tutoring.tms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Εύρεση χρήστη βάσει username (χρησιμοποιείται στο Login).
     */
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Επαναφορά κωδικού (Reset Password).
     */
    @Transactional
    public void updatePassword(Long userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    /**
     * Έλεγχος αν υπάρχει ήδη το username στη βάση.
     */
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}