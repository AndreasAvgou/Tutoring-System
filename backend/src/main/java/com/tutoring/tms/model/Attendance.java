package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 * Entity tracking student attendance for specific course sessions.
 * Enabled Cascade Delete to allow removing students or courses without constraint errors.
 */
@Entity
@Table(name = "attendance")
@Data
@NoArgsConstructor
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private boolean present;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @OnDelete(action = OnDeleteAction.CASCADE) // Critical for student deletion
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    @OnDelete(action = OnDeleteAction.CASCADE) // Critical for course deletion
    private Course course;
}