package com.tutoring.tms.service;

import com.tutoring.tms.model.Course;
import com.tutoring.tms.model.Student;
import com.tutoring.tms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service class for managing student-related operations and their course associations.
 */
@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    // Additional repositories injected to handle manual cascade deletion
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private LessonRepository lessonRepository;

    /**
     * Retrieves all student records from the database.
     */
    public List<Student> findAllStudents() {
        return studentRepository.findAll();
    }

    /**
     * Finds a specific student by their unique ID.
     */
    public Optional<Student> findStudentById(Long id) {
        return studentRepository.findById(id);
    }

    /** * Saves a new student and handles their initial course enrollments.
     * Forces the ID to null to ensure a database INSERT operation rather than an update.
     */
    @Transactional
    public Student saveStudent(Student student) {
        if (student.getId() != null) {
            student.setId(null);
        }
        if (student.getCourses() != null) {
            List<Long> ids = student.getCourses().stream().map(Course::getId).collect(Collectors.toList());
            student.setCourses(courseRepository.findAllById(ids));
        }
        return studentRepository.save(student);
    }

    /** * Updates an existing student's profile and synchronizes their Many-to-Many course list.
     */
    @Transactional
    public Student updateStudent(Long id, Student details) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        student.setFullName(details.getFullName());
        student.setEmail(details.getEmail());
        student.setPhone(details.getPhone());

        // Refresh and update course associations
        if (details.getCourses() != null) {
            List<Long> newIds = details.getCourses().stream().map(Course::getId).collect(Collectors.toList());
            student.getCourses().clear();
            student.getCourses().addAll(courseRepository.findAllById(newIds));
        }
        return studentRepository.saveAndFlush(student);
    }

    /**
     * Deletes a student record.
     * LOGIC FIX: Manually removes associated records (Attendance, Appointments, Lessons)
     * before deleting the student to prevent Foreign Key constraint violations (Status 500).
     */
    @Transactional
    public void deleteStudent(Long id) {
        // 1. Remove associated attendance logs
        attendanceRepository.findByStudentId(id).forEach(attendance -> {
            attendanceRepository.delete(attendance);
        });

        // 2. Remove associated appointments
        appointmentRepository.findAll().stream()
                .filter(app -> app.getStudent() != null && app.getStudent().getId().equals(id))
                .forEach(app -> appointmentRepository.delete(app));

        // 3. Remove associated lessons (if applicable)
        lessonRepository.findAll().stream()
                .filter(lesson -> lesson.getStudent() != null && lesson.getStudent().getId().equals(id))
                .forEach(lesson -> lessonRepository.delete(lesson));

        // 4. Finally, delete the student record
        studentRepository.deleteById(id);
    }
}