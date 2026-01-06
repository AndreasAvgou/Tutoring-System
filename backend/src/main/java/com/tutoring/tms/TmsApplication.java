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
			// CHECK: If at least one user already exists, do NOT overwrite or delete anything.
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