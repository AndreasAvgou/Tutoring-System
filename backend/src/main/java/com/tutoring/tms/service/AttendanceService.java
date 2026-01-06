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
     * Returns the attendance history for a specific student.
     */
    public List<Attendance> findByStudentId(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    /**
     * Saves a list of attendances (batch logging for a class session).
     */
    @Transactional
    public void saveAll(List<Attendance> attendances) {
        attendanceRepository.saveAll(attendances);
    }

    /**
     * Deletes attendance records based on date and course ID (for corrections).
     */
    @Transactional
    public void deleteByDateAndCourseId(java.time.LocalDate date, Long courseId) {
        attendanceRepository.deleteByDateAndCourseId(date, courseId);
    }
}