package com.tutoring.tms.repository;

import com.tutoring.tms.model.Settings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for accessing system-wide Settings.
 */
@Repository
public interface SettingsRepository extends JpaRepository<Settings, Long> {}