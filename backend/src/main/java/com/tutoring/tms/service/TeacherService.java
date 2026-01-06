package com.tutoring.tms.service;

import com.tutoring.tms.model.Teacher;
import com.tutoring.tms.model.User;
import com.tutoring.tms.repository.TeacherRepository;
import com.tutoring.tms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Teacher> findAllTeachers() { return teacherRepository.findAll(); }

    /** * Retrieves a single teacher by their ID.
     */
    public Optional<Teacher> findTeacherById(Long id) { return teacherRepository.findById(id); }

    /** * Persists a teacher entity and automatically creates a corresponding security User account.
     * Forces the ID to null to ensure an INSERT operation.
     */
    @Transactional
    public Teacher saveTeacher(Teacher teacher) {
        if (teacher.getId() != null) {
            teacher.setId(null);
        }
        Teacher saved = teacherRepository.save(teacher);

        // Creating the security credentials for the teacher
        User user = new User();
        user.setUsername(teacher.getUsername());
        user.setPassword(passwordEncoder.encode(teacher.getPassword()));
        user.setRole("ROLE_TEACHER");
        user.setTeacher(saved);
        userRepository.save(user);

        return saved;
    }

    /** * Deletes a teacher and their associated user account to maintain referential integrity.
     */
    @Transactional
    public void deleteTeacher(Long id) {
        userRepository.deleteByTeacherId(id); // Clean up user credentials first
        teacherRepository.deleteById(id);
    }

    /** * Updates existing teacher profile details.
     */
    @Transactional
    public Teacher updateTeacher(Long id, Teacher details) {
        Teacher teacher = teacherRepository.findById(id).orElseThrow(() -> new RuntimeException("Teacher not found"));
        teacher.setFullName(details.getFullName());
        teacher.setEmail(details.getEmail());
        teacher.setPhone(details.getPhone());
        teacher.setSpecialty(details.getSpecialty());
        return teacherRepository.save(teacher);
    }
}