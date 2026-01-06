package com.tutoring.tms.service;

import com.tutoring.tms.model.Attendance;
import com.tutoring.tms.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    /**
     * Επιστρέφει το ιστορικό παρουσιών ενός συγκεκριμένου μαθητή.
     */
    public List<Attendance> findByStudentId(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    /**
     * Αποθηκεύει μια λίστα από παρουσίες (μαζική καταγραφή για ένα τμήμα).
     */
    @Transactional
    public void saveAll(List<Attendance> attendances) {
        attendanceRepository.saveAll(attendances);
    }

    /**
     * Διαγράφει παρουσίες βάσει ημερομηνίας και μαθήματος (αν χρειαστεί διόρθωση).
     */
    @Transactional
    public void deleteByDateAndCourseId(java.time.LocalDate date, Long courseId) {
        attendanceRepository.deleteByDateAndCourseId(date, courseId);
    }
}