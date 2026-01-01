package com.tutoring.tms.repository; // Organized package path

import com.tutoring.tms.model.Course;
import com.tutoring.tms.model.Teacher;
import com.tutoring.tms.repository.CourseRepository;
import com.tutoring.tms.repository.TeacherRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Integration test for Course entity persistence.
 * Validates the relationship between a Course and its assigned Teacher.
 */
@SpringBootTest
@Transactional
class CourseRepositoryTest {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Test
    @Rollback(true) // Reverts transaction to keep PostgreSQL clean
    void saveCourse() {
        // Step 1: Create and persist a teacher (required for course relationship)
        Teacher teacher = new Teacher();
        teacher.setFullName("Eleni Chemistry");
        teacher.setSpecialty("Chemistry");
        teacher.setEmail("eleni@chem.com");
        teacherRepository.save(teacher);

        // Step 2: Create a course and associate it with the teacher
        Course course = new Course();
        course.setTitle("Organic Chemistry III");
        course.setDescription("Advanced preparation for national exams");
        course.setTeacher(teacher);

        // Step 3: Persist and verify
        Course savedCourse = courseRepository.save(course);
        assertNotNull(savedCourse.getId());
    }
}