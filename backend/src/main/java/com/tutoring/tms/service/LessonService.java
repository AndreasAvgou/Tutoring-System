package com.tutoring.tms.service;

import com.tutoring.tms.model.Lesson;
import com.tutoring.tms.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Service class for Lesson/Appointment management.
 * This class coordinates the core feature of scheduling.
 */
@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository; // layer for appointments

    public List<Lesson> findAllLessons() {
        return lessonRepository.findAll();
    }

    public Optional<Lesson> findLessonById(Long id) {
        return lessonRepository.findById(id);
    }

    /**
     * Schedules a new lesson or updates an existing one.
     */
    public Lesson saveLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    public void deleteLesson(Long id) {
        lessonRepository.deleteById(id); // Cancels/Deletes a lesson entry
    }
}