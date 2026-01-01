package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * Entity class representing an individual Lesson or Appointment.
 * This acts as a junction entity linking Course and Student,
 * fulfilling the requirement for a complex relational schema.
 */
@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id; // Unique ID for each scheduled lesson session.

    @Column(nullable = false)
    private LocalDateTime scheduledTime; // Date and time when the lesson is set to occur.

    private Integer durationMinutes; // The total time allocated for the session in minutes.

    private String status; // Current state of the lesson (e.g., SCHEDULED, COMPLETED, CANCELLED).

    /**
     * Relationship: Links the session to a specific course entry.
     */
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course; // The specific subject/course being taught during this lesson.

    /**
     * Relationship: Links the session to the student attending it.
     */
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student; // The student enrolled in this specific lesson session.
}