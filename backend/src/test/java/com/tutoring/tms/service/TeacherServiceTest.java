package com.tutoring.tms.service; // Must match the folder src/test/java/com/tutoring/tms/service/

import com.tutoring.tms.model.Teacher; // Import your Entity
import com.tutoring.tms.service.TeacherService; // Import your Service
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.annotation.Rollback;
import java.util.Optional; // Required for findById methods

import static org.junit.jupiter.api.Assertions.*; // Required for assertTrue, assertEquals, and assertFalse

/**
 * Service layer tests for Teacher management.
 * Verifies business logic for Create, Read, Update, and Delete operations.
 */
@SpringBootTest
@Transactional
class TeacherServiceTest {

    @Autowired
    private TeacherService teacherService; // Injected service layer

    @Test
    @Rollback(true) // Ensures the test doesn't modify the PostgreSQL database permanently
    void testTeacherFullLifecycle() {
        // 1. CREATE: Save a new teacher
        Teacher teacher = new Teacher(); //
        teacher.setFullName("George Miller");
        teacher.setEmail("george@tms.com");
        Teacher saved = teacherService.saveTeacher(teacher); //
        assertNotNull(saved.getId(), "Teacher ID should be generated upon saving");

        // 2. READ: Retrieve the teacher by ID
        Optional<Teacher> found = teacherService.findTeacherById(saved.getId()); //
        assertTrue(found.isPresent(), "Teacher should be present in the database");
        assertEquals("George Miller", found.get().getFullName());

        // 3. UPDATE: Modify specialty and save changes
        found.get().setSpecialty("Advanced Mathematics");
        Teacher updated = teacherService.saveTeacher(found.get()); // Requirement: Update data
        assertEquals("Advanced Mathematics", updated.getSpecialty());

        // 4. DELETE: Remove teacher and verify deletion
        teacherService.deleteTeacher(updated.getId()); // Requirement: Delete data
        Optional<Teacher> deleted = teacherService.findTeacherById(updated.getId());
        assertFalse(deleted.isPresent(), "Teacher should no longer exist in the database");
    }
}