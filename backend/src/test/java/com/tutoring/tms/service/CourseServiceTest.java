package com.tutoring.tms.service; // Organized package path for Service tests

import com.tutoring.tms.model.Course; //
import com.tutoring.tms.model.Teacher; //
import com.tutoring.tms.service.CourseService; //
import com.tutoring.tms.service.TeacherService; //
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.annotation.Rollback;

import java.util.Optional; //

import static org.junit.jupiter.api.Assertions.*;

/**
 * Service layer tests for Course management.
 * This class verifies the complete CRUD lifecycle for courses and
 * ensures proper association with the Teacher entity.
 */
@SpringBootTest
@Transactional // Ensures data consistency and enables rollback
class CourseServiceTest {

    @Autowired
    private CourseService courseService; //

    @Autowired
    private TeacherService teacherService; // Required to create a valid teacher for the course

    /**
     * Requirement: Comprehensive CRUD testing.
     * This test validates that courses can be created, retrieved, modified, and deleted.
     */
    @Test
    @Rollback(true) // Guarantees that PostgreSQL remains clean after the test execution
    void testCourseLifecycle() {
        // 1. PRE-REQUISITE: Create and save a Teacher
        Teacher teacher = new Teacher();
        teacher.setFullName("Eleni Chemistry");
        teacher.setEmail("eleni.service@test.com");
        Teacher savedTeacher = teacherService.saveTeacher(teacher); //

        // 2. CREATE: Save a new Course linked to the Teacher
        Course course = new Course();
        course.setTitle("Organic Chemistry I");
        course.setDescription("Introductory course for science students");
        course.setTeacher(savedTeacher); // Establishing the relationship

        Course savedCourse = courseService.saveCourse(course); //
        assertNotNull(savedCourse.getId(), "Course ID should be generated upon saving");

        // 3. READ: Find the course by its unique ID
        Optional<Course> found = courseService.findCourseById(savedCourse.getId()); //
        assertTrue(found.isPresent(), "Saved course should be retrievable from the database");
        assertEquals("Organic Chemistry I", found.get().getTitle());

        // 4. UPDATE: Modify the course title and description
        found.get().setTitle("Advanced Organic Chemistry");
        Course updated = courseService.saveCourse(found.get()); // Update operation
        assertEquals("Advanced Organic Chemistry", updated.getTitle());

        // 5. DELETE: Remove the course and verify it is gone
        courseService.deleteCourse(updated.getId()); //
        Optional<Course> deleted = courseService.findCourseById(updated.getId());
        assertFalse(deleted.isPresent(), "Course should be deleted successfully");
    }
}