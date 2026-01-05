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
     * Επιστρέφει τις ρυθμίσεις (πάντα με ID 1).
     * Αν δεν υπάρχουν, επιστρέφει ένα αντικείμενο με προεπιλεγμένες τιμές.
     */
    public Settings getSettings() {
        return repository.findById(1L).orElseGet(() -> {
            Settings defaultSettings = new Settings();
            defaultSettings.setId(1L);
            defaultSettings.setInstitutionName("TMS Φροντιστήριο");
            defaultSettings.setPhone("210 0000000");
            defaultSettings.setEmail("info@tms.gr");
            defaultSettings.setAddress("Διεύθυνση 123, Πόλη");
            return defaultSettings;
        });
    }

    /**
     * Αποθηκεύει ή ενημερώνει τις ρυθμίσεις.
     * Επιβάλλει το ID 1 για να έχουμε μόνο μία εγγραφή στη βάση.
     */
    public Settings saveSettings(Settings settings) {
        settings.setId(1L);
        return repository.save(settings);
    }
}