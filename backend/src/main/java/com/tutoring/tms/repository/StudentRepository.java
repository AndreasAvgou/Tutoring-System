package com.tutoring.tms.repository;

import com.tutoring.tms.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Student data access.
 * Enables persistence operations for student records.
 */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}