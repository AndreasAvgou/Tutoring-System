package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Entity class representing a Teacher in the Tutoring Management System.
 * It follows the Domain Model design pattern.
 */
@Entity
@Table(name = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key for the teacher, using auto-increment strategy.

    @Column(name = "full_name", nullable = false)
    private String fullName; // Stores the full name of the tutor; mandatory field.

    private String specialty; // The academic field or subject the teacher specializes in.

    @Column(unique = true)
    private String email; // Unique contact email, used as an identifier for the tutor.
}