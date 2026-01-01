package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Entity class representing a Student.
 * One of the core entities required for managing tutoring data.
 */
@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique internal identifier for the student.

    @Column(name = "full_name", nullable = false)
    private String fullName; // Mandatory field for the student's legal name.

    @Column(unique = true)
    private String email; // Unique email for communication and identification.

    private String phone; // Contact phone number for administrative purposes.
}