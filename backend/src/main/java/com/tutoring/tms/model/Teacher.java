package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Entity class representing a Teacher in the Tutoring Management System.
 */
@Entity
@Table(name = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    private String specialty;

    private String phone;

    @Column(unique = true)
    private String email;

    @Transient
    private String username;

    @Transient
    private String password;

    private String role;

    // Relationship with courses
    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // Prevents infinite recursion during JSON serialization to React
    private List<Course> courses;
}