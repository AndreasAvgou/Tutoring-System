package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

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
    private String title; // π.χ. "Ενημέρωση Γονέων"

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "start_date_time", nullable = false)
    private LocalDateTime startDateTime;

    @Column(name = "end_date_time")
    private LocalDateTime endDateTime;

    @Enumerated(EnumType.STRING)
    private AppointmentStatus status = AppointmentStatus.PENDING;

    // Σύνδεση με Μαθητή
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    // Σύνδεση με Καθηγητή (ή Διευθυντή)
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
}