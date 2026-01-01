package com.tutoring.tms.service; // Verify this matches: src/test/java/com/tutoring/tms/service/

import com.tutoring.tms.model.Student; // Import the Student entity
import com.tutoring.tms.service.StudentService; // Import the StudentService class
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.annotation.Rollback;

import static org.junit.jupiter.api.Assertions.*; // Standard JUnit assertions

/**
 * Service layer tests for Student operations.
 * This class validates the business logic for managing student profiles.
 */
@SpringBootTest
@Transactional // Ensures the database state is rolled back after each test execution
class StudentServiceTest {

    /**
     * Dependency Injection of the StudentService bean.
     */
    @Autowired
    private StudentService studentService; //

    /**
     * Requirement: Update stored data.
     * This test ensures that existing student contact information can be
     * successfully updated in the PostgreSQL database.
     */
    @Test
    @Rollback(true) // Explicitly prevents permanent data changes to the database
    void testUpdateStudentContact() {
        // Given: A new student is created and saved to the system
        Student student = new Student(); //
        student.setFullName("Nikos Georgiou");
        student.setPhone("6900000000");
        student.setEmail("nikos.update@test.com"); // Added email to fulfill @Column(unique = true) requirement

        Student saved = studentService.saveStudent(student); // Save operation
        assertNotNull(saved.getId(), "Student ID should be generated after saving"); //

        // When: The phone number of the saved student is updated
        saved.setPhone("6911111111");
        Student updated = studentService.saveStudent(saved); // Update operation (Save with existing ID)

        // Then: The system must reflect the updated contact information correctly
        assertEquals("6911111111", updated.getPhone(), "The phone number should be updated to the new value");
    }
}