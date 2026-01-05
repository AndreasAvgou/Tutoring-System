package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

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
    @JoinColumn(name = "student_id") // Το IntelliJ ίσως το βγάζει κόκκινο, αγνόησέ το
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id") // Το IntelliJ ίσως το βγάζει κόκκινο, αγνόησέ το
    private Course course;
}

