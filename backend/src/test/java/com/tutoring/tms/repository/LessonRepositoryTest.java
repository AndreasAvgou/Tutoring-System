package com.tutoring.tms.repository; // Updated package path

import com.tutoring.tms.model.*;
import com.tutoring.tms.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Integration test for the Lesson repository.
 * Verifies relationships between Teacher, Course, Student, and Lesson.
 */
@SpringBootTest
@Transactional
class LessonRepositoryTest {

    @Autowired private LessonRepository lessonRepository;
    @Autowired private CourseRepository courseRepository;
    @Autowired private StudentRepository studentRepository;
    @Autowired private TeacherRepository teacherRepository;

    @Test
    @Rollback(true) // Ensures database remains clean after execution
    void saveLesson() {
        Teacher teacher = new Teacher();
        teacher.setFullName("Kostas Mathematician");
        teacher.setSpecialty("Mathematics");
        teacher.setEmail("kostas@math.com");
        teacherRepository.save(teacher);

        Course course = new Course();
        course.setTitle("Algebra 101");
        course.setTeacher(teacher);
        courseRepository.save(course);

        Student student = new Student();
        student.setFullName("Giannis Papadakis");
        student.setEmail("giannis@student.com");
        studentRepository.save(student);

        Lesson lesson = new Lesson();
        lesson.setScheduledTime(LocalDateTime.now().plusDays(2));
        lesson.setDurationMinutes(60);
        lesson.setStatus("SCHEDULED");
        lesson.setCourse(course);
        lesson.setStudent(student);

        Lesson savedLesson = lessonRepository.save(lesson);
        assertNotNull(savedLesson.getId());
    }
}