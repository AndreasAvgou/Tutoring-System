package com.tutoring.tms.controller;

import com.tutoring.tms.model.Course;
import com.tutoring.tms.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for Course management.
 */
@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*") // Allows React integration
public class CourseController {

    @Autowired
    private CourseService courseService;

    // READ: Get all courses
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.findAllCourses();
    }

    // CREATE: Save a new course
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.saveCourse(course);
    }

    // READ: Get course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        return courseService.findCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE: Remove course data
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok().build();
    }
}