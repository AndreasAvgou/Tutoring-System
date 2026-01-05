package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "courses")
@Data
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "lesson_time")
    private String lessonTime;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    // 1. ΣΧΕΣΗ ΜΕ ΜΑΘΗΤΕΣ (ManyToMany)
    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    private List<Student> students = new ArrayList<>();

    // 2. ΣΧΕΣΗ ΜΕ ΠΑΡΟΥΣΙΕΣ (Cascade ALL για να σβήνονται αυτόματα)
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Attendance> attendances = new ArrayList<>();

    /**
     * ΑΠΑΡΑΙΤΗΤΗ ΠΡΟΣΘΗΚΗ:
     * Αυτή η μέθοδος εκτελείται αυτόματα ΠΡΙΝ τη διαγραφή του Course.
     * Σπάει τους δεσμούς με τους μαθητές στον πίνακα student_courses.
     */
    @PreRemove
    private void removeAssociations() {
        if (students != null) {
            for (Student student : students) {
                student.getCourses().remove(this);
            }
        }
    }

    // Διατήρηση της μεθόδου αν τη χρειάζεσαι για το seeding
    public void setDescription(String description) {
    }
}