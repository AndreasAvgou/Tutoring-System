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

    /**
     * Επιστρέφει όλους τους καθηγητές.
     */
    public List<Teacher> findAllTeachers() {
        return teacherRepository.findAll();
    }

    /**
     * Εύρεση καθηγητή βάσει ID.
     */
    public Optional<Teacher> findTeacherById(Long id) {
        return teacherRepository.findById(id);
    }

    /**
     * CREATE: Αποθηκεύει τον καθηγητή και δημιουργεί αυτόματα λογαριασμό χρήστη (User).
     */
    @Transactional
    public Teacher saveTeacher(Teacher teacher) {
        // ΑΥΤΟ ΕΙΝΑΙ ΤΟ ΚΛΕΙΔΙ:
        // Αν έρθει ID από τη React για ΝΕΑ εγγραφή, το μηδενίζουμε
        // για να καταλάβει η Hibernate ότι πρέπει να κάνει INSERT και όχι UPDATE.
        if (teacher.getId() != null) {
            teacher.setId(null);
        }

        if (teacher.getUsername() == null || teacher.getPassword() == null) {
            throw new RuntimeException("Username and Password are required!");
        }

        Teacher savedTeacher = teacherRepository.save(teacher);

        User user = new User();
        user.setUsername(teacher.getUsername());
        user.setPassword(passwordEncoder.encode(teacher.getPassword()));
        user.setRole("ROLE_TEACHER");
        user.setTeacher(savedTeacher);
        userRepository.save(user);

        return savedTeacher;
    }

    /**
     * UPDATE: Ενημερώνει τα στοιχεία και τον κωδικό αν έχει αλλάξει.
     */
    @Transactional
    public Teacher updateTeacher(Long id, Teacher details) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found"));

        teacher.setFullName(details.getFullName());
        teacher.setEmail(details.getEmail());
        teacher.setPhone(details.getPhone());
        teacher.setSpecialty(details.getSpecialty());
        teacher.setUsername(details.getUsername());

        // Ενημέρωση κωδικού μόνο αν έχει γραφτεί κάτι νέο
        if (details.getPassword() != null && !details.getPassword().isEmpty()) {
            teacher.setPassword(details.getPassword());
        }

        return teacherRepository.save(teacher);
    }

    /**
     * DELETE: Διαγράφει τον καθηγητή, τον User και τα συνδεδεμένα μαθήματα.
     */
    @Transactional
    public void deleteTeacher(Long id) {
        // 1. Εύρεση του καθηγητή
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found with id: " + id));

        // 2. Διαγραφή του User (Login account) πρώτα
        userRepository.deleteByTeacherId(id);

        // 3. Σπάσιμο της σύνδεσης με τα Μαθήματα
        // Λόγω του orphanRemoval = true στο Model, το clear() θα διαγράψει τα μαθήματα από τη βάση.
        if (teacher.getCourses() != null) {
            teacher.getCourses().clear();
            teacherRepository.save(teacher); // Ενημέρωση για να εκτελεστούν οι διαγραφές των μαθημάτων
        }

        // 4. Οριστική διαγραφή του καθηγητή
        teacherRepository.delete(teacher);
    }
}