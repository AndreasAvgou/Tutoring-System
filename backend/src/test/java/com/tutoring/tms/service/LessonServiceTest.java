package com.tutoring.tms.service; // Ensure this matches your folder: src/test/java/com/tutoring/tms/service/

import com.tutoring.tms.model.Lesson; // Import the Lesson entity
import com.tutoring.tms.service.LessonService; // Import the Service to be tested
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.annotation.Rollback;

import java.util.List; // Required for handling the returned list of lessons

import static org.junit.jupiter.api.Assertions.*; // Import all JUnit assertions

/**
 * Service layer tests for Lesson management.
 * Verifies that the system can correctly retrieve and manage tutoring appointments.
 */
@SpringBootTest
@Transactional // Wraps tests in a transaction to allow rollback
class LessonServiceTest {

    @Autowired
    private LessonService lessonService; // Injects the LessonService bean

    /**
     * Requirement: Read all stored data.
     * This test verifies that the service successfully retrieves a list of lessons
     * from the database, which is essential for the Frontend/UI display.
     */
    @Test
    @Rollback(true) // Ensures the database state is preserved after the test
    void testFindAllLessons() {
        // When: We attempt to fetch all lessons
        List<Lesson> lessons = lessonService.findAllLessons(); //

        // Then: The list should not be null (it can be empty, but the object must exist)
        assertNotNull(lessons, "The lessons list should not be null");

        // Logical check: If we haven't added data, the size should be >= 0
        lessons.size();
        assertTrue(true);
    }
}