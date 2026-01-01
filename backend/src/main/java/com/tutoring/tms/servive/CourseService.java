package com.tutoring.tms.service;

import com.tutoring.tms.model.Course;
import com.tutoring.tms.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Service class for Course management.
  */
@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository; // Injected data access layer

    public List<Course> findAllCourses() {
        return courseRepository.findAll(); // Fetches all course records
    }

    public Optional<Course> findCourseById(Long id) {
        return courseRepository.findById(id); // Fetches course records by ID
    }

    public Course saveCourse(Course course) {

        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id); // Deletes course by unique ID
    }
}