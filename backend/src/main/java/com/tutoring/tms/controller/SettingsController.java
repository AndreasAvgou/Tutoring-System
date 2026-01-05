package com.tutoring.tms.controller;

import com.tutoring.tms.model.Settings;
import com.tutoring.tms.service.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class SettingsController {

    @Autowired
    private SettingsService settingsService;

    // Δημόσιο endpoint για το React PublicBookingPage
    @GetMapping("/public")
    public Settings getPublicSettings() {
        return settingsService.getSettings();
    }

    // Endpoint για τον Admin (για να αλλάζει τις ρυθμίσεις)
    @PostMapping
    public Settings updateSettings(@RequestBody Settings settings) {
        return settingsService.saveSettings(settings);
    }
}