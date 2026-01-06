package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    // IMPORTANT: Length 255 to accommodate BCrypt hash strings
    @Column(nullable = false, length = 255)
    private String password;

    private String role;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
}