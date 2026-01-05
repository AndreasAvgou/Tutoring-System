package com.tutoring.tms.repository;

import com.tutoring.tms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param; // <--- ΑΥΤΟ ΕΛΕΙΠΕ
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByTeacherId(Long teacherId);

    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.teacher.id = :teacherId")
    void deleteByTeacherId(@Param("teacherId") Long teacherId);
}