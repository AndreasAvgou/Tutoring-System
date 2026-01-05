package com.tutoring.tms.controller;

import com.tutoring.tms.model.Student;
import com.tutoring.tms.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for Student API.
 * Provides endpoints for React.js frontend integration.
 */
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*") // Required for frontend-backend communication
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.findAllStudents(); // Read operation
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student); // Create/Save operation
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentService.findStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id); // Delete operation
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        // Κάλεσε ΜΟΝΟ το service. Αυτό ξέρει να κάνει τη δουλειά.
        Student updated = studentService.updateStudent(id, studentDetails);
        return ResponseEntity.ok(updated);
    }



}