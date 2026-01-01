package com.tutoring.tms.repository;

import com.tutoring.tms.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Lesson (Appointment) data access.
 * Central to the scheduling functionality of the Tutoring Management System.
 */
@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
}