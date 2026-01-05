package com.tutoring.tms.repository;

import com.tutoring.tms.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate; // <--- ΠΡΟΣΘΗΚΗ ΑΥΤΗΣ ΤΗΣ ΓΡΑΜΜΗΣ
import java.util.List;      // <--- ΚΑΙ ΑΥΤΗΣ ΓΙΑ ΤΗ ΛΙΣΤΑ

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByDateAndCourseId(LocalDate date, Long courseId);// Εδώ μπορούμε αργότερα να προσθέσουμε αναζήτηση βάσει ημερομηνίας
    List<Attendance> findByStudentId(Long studentId);
}