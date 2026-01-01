package com.tutoring.tms.repository; // Organized package path

import com.tutoring.tms.model.Teacher;
import com.tutoring.tms.repository.TeacherRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Integration test for Teacher repository.
 * Verifies that teacher entities are correctly mapped to the database.
 */
@SpringBootTest
@Transactional
public class TeacherRepositoryTest {

    @Autowired
    private TeacherRepository teacherRepository;

    @Test
    @Rollback(true) // Prevents duplicate email errors in subsequent test runs
    public void testSaveTeacher() {
        // Given: A new teacher entity
        Teacher teacher = new Teacher();
        teacher.setFullName("Andreas Avgoustis");
        teacher.setSpecialty("Computer Science");
        teacher.setEmail("andreasav@test.com");

        // When: The entity is saved
        Teacher savedTeacher = teacherRepository.save(teacher);

        // Then: The ID should be generated
        assertNotNull(savedTeacher.getId());
    }
}