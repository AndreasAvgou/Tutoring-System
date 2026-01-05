package com.tutoring.tms;

import com.tutoring.tms.model.User;
import com.tutoring.tms.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class TmsApplication {
	public static void main(String[] args) {
		SpringApplication.run(TmsApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			// ΕΛΕΓΧΟΣ: Αν υπάρχει ήδη έστω και ένας χρήστης, ΜΗΝ σβήνεις τίποτα
			if (userRepository.count() == 0) {
				System.out.println(">>> DATABASE IS EMPTY. INITIALIZING ADMIN...");

				User admin = new User();
				admin.setUsername("admin");
				admin.setPassword(passwordEncoder.encode("admin123"));
				admin.setRole("ROLE_ADMIN");
				userRepository.save(admin);

				System.out.println(">>> ADMIN CREATED: admin / admin123");
			} else {
				System.out.println(">>> DATABASE ALREADY HAS DATA. SKIPPING INITIALIZATION.");
			}
		};
	}
}