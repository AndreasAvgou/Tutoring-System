package com.tutoring.tms.controller;

import com.tutoring.tms.model.Attendance;
import com.tutoring.tms.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @PostMapping("/batch")
    public ResponseEntity<?> saveAttendance(@RequestBody List<Attendance> attendanceList) {
        try {
            attendanceRepository.saveAll(attendanceList);
            return ResponseEntity.ok("Επιτυχής αποθήκευση παρουσιών!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Σφάλμα: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    public List<Attendance> getAttendanceHistory(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam Long courseId) {
        return attendanceRepository.findByDateAndCourseId(date, courseId);
    }

    @GetMapping("/student/{studentId}")
    public List<Attendance> getStudentHistory(@PathVariable Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }
}
