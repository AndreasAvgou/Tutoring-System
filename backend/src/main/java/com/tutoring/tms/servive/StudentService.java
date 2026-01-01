package com.tutoring.tms.service;

import com.tutoring.tms.model.Student;
import com.tutoring.tms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for Student management.
 */
@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository; // Dependency Injection of the Repository

    public List<Student> findAllStudents() {
        return studentRepository.findAll(); // Requirement: Read stored data
    }

    public Optional<Student> findStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student); // Requirement: Save data to DB
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id); // Requirement: Delete data
    }
}