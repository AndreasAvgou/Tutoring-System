package com.tutoring.tms.service;

import com.tutoring.tms.model.Lesson;
import com.tutoring.tms.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

/**
 * Service coordinating core scheduling features for scheduled sessions.
 */
@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    /** * Returns all scheduled lesson sessions.
     */
    public List<Lesson> findAllLessons() {
        return lessonRepository.findAll();
    }

    public Optional<Lesson> findLessonById(Long id) {
        return lessonRepository.findById(id);
    }

    /** * Registers a new lesson session or updates an existing schedule.
     */
    public Lesson saveLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }

    /** * Cancels/Deletes a lesson entry from the calendar.
     */
    public void deleteLesson(Long id) {
        lessonRepository.deleteById(id);
    }
}