package com.tutoring.tms.repository;

import com.tutoring.tms.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

/**
 * Repository interface for managing Attendance records.
 * Handles database operations for student presence logs.
 */
@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    /**
     * Retrieves attendance records filtered by date and course ID.
     */
    List<Attendance> findByDateAndCourseId(LocalDate date, Long courseId);

    /**
     * Fetches the full attendance history for a specific student.
     */
    List<Attendance> findByStudentId(Long studentId);

    /**
     * Deletes records for a specific class session to allow for re-logging.
     * Modifying is required for delete queries in Spring Data JPA.
     */
    @Modifying
    @Transactional
    void deleteByDateAndCourseId(LocalDate date, Long courseId);
}