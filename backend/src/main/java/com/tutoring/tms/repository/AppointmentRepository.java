package com.tutoring.tms.repository;

import com.tutoring.tms.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Appointment data access.
 * Spring Data JPA automatically provides basic CRUD operations (save, delete, etc.).
 */
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}