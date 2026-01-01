package com.tutoring.tms.repository; // Updated package path

import com.tutoring.tms.model.Student;
import com.tutoring.tms.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Verifies Student persistence logic.
 */
@SpringBootTest
@Transactional
class StudentRepositoryTest {

    @Autowired
    private StudentRepository studentRepository;

    @Test
    @Rollback(true)
    void saveStudent() {
        Student student = new Student();
        student.setFullName("Nikos Georgiou");
        student.setEmail("nikos@student.com");
        student.setPhone("6900000001");

        Student savedStudent = studentRepository.save(student);
        assertNotNull(savedStudent.getId());
    }
}