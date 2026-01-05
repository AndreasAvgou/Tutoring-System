package com.tutoring.tms.repository;

import com.tutoring.tms.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Εδώ η Spring Data JPA φτιάχνει αυτόματα όλες τις βασικές λειτουργίες (save, delete, κλπ)
}