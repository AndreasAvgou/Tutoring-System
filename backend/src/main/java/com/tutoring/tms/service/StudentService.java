package com.tutoring.tms.service;

import com.tutoring.tms.model.Course;
import com.tutoring.tms.model.Student;
import com.tutoring.tms.repository.CourseRepository;
import com.tutoring.tms.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    /**
     * Επιστρέφει όλους τους μαθητές.
     */
    public List<Student> findAllStudents() {
        return studentRepository.findAll();
    }

    /**
     * Εύρεση μαθητή βάσει ID.
     */
    public Optional<Student> findStudentById(Long id) {
        return studentRepository.findById(id);
    }

    /**
     * CREATE: Αποθηκεύει έναν μαθητή και συνδέει τα μαθήματά του.
     */
    @Transactional
    public Student saveStudent(Student student) {
        // Σημαντικό: Μετατρέπουμε τα IDs σε "ζωντανά" αντικείμενα της βάσης
        if (student.getCourses() != null) {
            List<Long> ids = student.getCourses().stream()
                    .map(Course::getId)
                    .collect(Collectors.toList());
            student.setCourses(courseRepository.findAllById(ids));
        }
        return studentRepository.save(student);
    }

    @Transactional
    public Student updateStudent(Long id, Student details) {
        // 1. Τραβάμε τον μαθητή από τη βάση
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // 2. Ενημερώνουμε τα απλά πεδία
        student.setFullName(details.getFullName());
        student.setEmail(details.getEmail());
        student.setPhone(details.getPhone());

        // 3. ΕΝΗΜΕΡΩΣΗ ΜΑΘΗΜΑΤΩΝ
        if (details.getCourses() != null) {
            // Παίρνουμε τα IDs που ήρθαν από τη React
            List<Long> newIds = details.getCourses().stream()
                    .map(Course::getId)
                    .collect(Collectors.toList());

            // Φορτώνουμε τα πραγματικά μαθήματα από τη βάση δεδομένων
            List<Course> managedCourses = courseRepository.findAllById(newIds);

            // ΚΑΘΑΡΙΖΟΥΜΕ τη λίστα που έχει ήδη ο μαθητής (πολύ σημαντικό)
            student.getCourses().clear();

            // ΠΡΟΣΘΕΤΟΥΜΕ τα νέα μαθήματα ένα-ένα στη λίστα του
            student.getCourses().addAll(managedCourses);
        } else {
            student.getCourses().clear();
        }

        // 4. Χρησιμοποιούμε saveAndFlush για να αναγκάσουμε τη βάση να γράψει ΤΩΡΑ
        return studentRepository.saveAndFlush(student);
    }

    /**
     * DELETE: Διαγράφει τον μαθητή.
     */
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}