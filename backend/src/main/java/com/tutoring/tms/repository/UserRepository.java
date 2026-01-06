package com.tutoring.tms.repository;

import com.tutoring.tms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

/**
 * Repository interface for User authentication and credential management.
 * Handles unique validation and teacher-user associations.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username); // Used for unique validation

    Optional<User> findByTeacherId(Long teacherId);

    /**
     * Deletes a user record associated with a specific teacher ID.
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.teacher.id = :teacherId")
    void deleteByTeacherId(@Param("teacherId") Long teacherId);
}