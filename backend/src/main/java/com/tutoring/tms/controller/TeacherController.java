package com.tutoring.tms.controller;

import com.tutoring.tms.model.Teacher;
import com.tutoring.tms.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for Teacher management.
 * Provides endpoints for the React frontend to perform CRUD operations.
 */
@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*") // Enables Cross-Origin Resource Sharing for React integration
public class TeacherController {

    /**
     * Injection of the service layer to handle business operations.
     */
    @Autowired
    private TeacherService teacherService;

    /**
     * GET Endpoint: Returns a list of all tutors.
     *
     */
    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.findAllTeachers();
    }

    /**
     * POST Endpoint: Receives a JSON object to create or update a teacher.
     *
     */
    @PostMapping
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        return teacherService.saveTeacher(teacher);
    }

    /**
     * GET Endpoint: Returns details of a specific teacher by ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Long id) {
        return teacherService.findTeacherById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * DELETE Endpoint: Deletes a teacher record.
     *
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable Long id, @RequestBody Teacher teacherDetails) {
        Teacher updatedTeacher = teacherService.updateTeacher(id, teacherDetails);
        return ResponseEntity.ok(updatedTeacher);
    }
}