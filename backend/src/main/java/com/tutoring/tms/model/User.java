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

    // ΣΗΜΑΝΤΙΚΟ: length = 255 για να χωράει το hash του BCrypt
    @Column(nullable = false, length = 255)
    private String password;

    private String role;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
}