package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

/**
 * Entity class representing a Course or Subject.
 * This class establishes a relationship between subjects and the teachers who teach them.
 */
@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key for the course record.

    @Column(nullable = false)
    private String title; // The name of the course (e.g., Mathematics, Java Programming).

    private String description; // A detailed description of the course's scope.

    /**
     * Many-to-One Relationship: Multiple courses can be associated with a single teacher.
     */
    @ManyToOne
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher; // Reference to the Teacher entity who provides this course.
}