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

    // 1. RELATIONSHIP WITH STUDENTS (ManyToMany)
    @ManyToMany(mappedBy = "courses")
    @JsonIgnore
    private List<Student> students = new ArrayList<>();

    // 2. RELATIONSHIP WITH ATTENDANCE (Cascade ALL for automatic deletion)
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Attendance> attendances = new ArrayList<>();

    /**
     * Triggered automatically BEFORE the deletion of a Course.
     * Breaks associations with students in the student_courses junction table.
     */
    @PreRemove
    private void removeAssociations() {
        if (students != null) {
            for (Student student : students) {
                student.getCourses().remove(this);
            }
        }
    }

    // Retained for seeding purposes if needed
    public void setDescription(String description) {
    }
}