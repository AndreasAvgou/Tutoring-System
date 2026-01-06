package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 * Entity for managing appointments.
 * Cascade delete is enabled to prevent deletion blocks from parents.
 */
@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "start_date_time", nullable = false)
    private LocalDateTime startDateTime;

    @Column(name = "end_date_time")
    private LocalDateTime endDateTime;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @OnDelete(action = OnDeleteAction.CASCADE) // Fixes student deletion
    private Student student;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    @OnDelete(action = OnDeleteAction.CASCADE) // Fixes teacher deletion
    private Teacher teacher;
}