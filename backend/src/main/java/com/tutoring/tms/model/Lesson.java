package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import org.hibernate.annotations.OnDelete; //
import org.hibernate.annotations.OnDeleteAction; //

/**
 * Entity class representing an individual Lesson or Appointment session.
 */
@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false)
    private LocalDateTime scheduledTime;

    private Integer durationMinutes;

    private String status; // SCHEDULED, COMPLETED, CANCELLED

    /**
     * Relationship: Links the session to a specific course entry.
     * Added OnDelete CASCADE to prevent deletion blocks.
     */
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) //
    private Course course;

    /**
     * Relationship: Links the session to the student attending it.
     * Added OnDelete CASCADE to fix the Status 500 error during student deletion.
     */
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE) //
    private Student student;
}