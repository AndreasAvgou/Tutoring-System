package com.tutoring.tms.service;

import com.tutoring.tms.model.Course;
import com.tutoring.tms.model.Teacher;
import com.tutoring.tms.repository.CourseRepository;
import com.tutoring.tms.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service class for Course management.
 */
@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // ΠΡΟΣΘΗΚΗ: Πρέπει να κάνουμε inject και το TeacherRepository
    @Autowired
    private TeacherRepository teacherRepository;

    public List<Course> findAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> findCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

    @Transactional
    public Course updateCourse(Long id, Course details) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setTitle(details.getTitle());
        course.setDayOfWeek(details.getDayOfWeek());
        course.setLessonTime(details.getLessonTime());

        // Σύνδεση με τον καθηγητή (Πλέον το teacherRepository αναγνωρίζεται!)
        if (details.getTeacher() != null && details.getTeacher().getId() != null) {
            Teacher teacher = teacherRepository.findById(details.getTeacher().getId())
                    .orElseThrow(() -> new RuntimeException("Teacher not found"));
            course.setTeacher(teacher);
        }

        return courseRepository.save(course);
    }
}