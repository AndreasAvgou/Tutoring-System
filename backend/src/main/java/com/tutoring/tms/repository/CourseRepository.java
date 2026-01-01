package com.tutoring.tms.repository;

import com.tutoring.tms.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Course data access.
 * Manages the retrieval and storage of course entities and their relationships.
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
}