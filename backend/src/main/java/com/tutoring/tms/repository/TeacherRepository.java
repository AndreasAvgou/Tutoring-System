package com.tutoring.tms.repository;

import com.tutoring.tms.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Teacher data access.
 * Inherits CRUD operations from JpaRepository to facilitate data management.
 */
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}