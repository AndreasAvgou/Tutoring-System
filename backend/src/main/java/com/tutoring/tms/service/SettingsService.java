package com.tutoring.tms.service;

import com.tutoring.tms.model.Settings;
import com.tutoring.tms.repository.SettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SettingsService {

    @Autowired
    private SettingsRepository repository;

    /**
     * Returns system settings (always using ID 1).
     * If no settings exist, it returns an object with default values.
     */
    public Settings getSettings() {
        return repository.findById(1L).orElseGet(() -> {
            Settings defaultSettings = new Settings();
            defaultSettings.setId(1L);
            defaultSettings.setInstitutionName("TMS Tutoring Center");
            defaultSettings.setPhone("210 0000000");
            defaultSettings.setEmail("info@tms.gr");
            defaultSettings.setAddress("123 Address St, City");
            return defaultSettings;
        });
    }

    /**
     * Saves or updates system settings.
     * Enforces ID 1 to ensure only one settings record exists in the database.
     */
    public Settings saveSettings(Settings settings) {
        settings.setId(1L);
        return repository.save(settings);
    }
}