package com.tutoring.tms.service;

import com.tutoring.tms.model.Teacher;
import com.tutoring.tms.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Service class for managing Teacher-related business logic.
 *
 */
@Service
public class TeacherService {

    /**
     * Dependency Injection of TeacherRepository.
     *
     */
    @Autowired
    private TeacherRepository teacherRepository;

    /**
     * READ: Retrieves all teachers from the database.
     */
    public List<Teacher> findAllTeachers() {
        return teacherRepository.findAll();
    }

    /**
     * READ: Finds a single teacher by their unique ID.
     */
    public Optional<Teacher> findTeacherById(Long id) {
        return teacherRepository.findById(id);
    }

    /**
     * CREATE / UPDATE: Saves a teacher object to the database.
     * This handles both new entries and updates to existing ones.
     */
    public Teacher saveTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    /**
     * DELETE: Removes a teacher record from the database by ID.
     */
    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }
}