package com.tutoring.tms.controller;

import com.tutoring.tms.model.Appointment;
import com.tutoring.tms.service.AppointmentService;
import com.tutoring.tms.model.AppointmentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*") // Επιτρέπει την επικοινωνία με το React
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.findAll();
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.save(appointment);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentService.delete(id);
    }

    // Αυτό το endpoint θα είναι η "δημόσια είσοδος" για τους γονείς
    @PostMapping("/public")
    public Appointment createPublicAppointment(@RequestBody Appointment appointment) {
        // Θέτουμε πάντα την κατάσταση σε PENDING για να το εγκρίνει ο Admin μετά
        appointment.setStatus(AppointmentStatus.PENDING);
        // Επειδή είναι δημόσιο, ο γονέας δεν ξέρει το student_id,
        // οπότε το πεδίο "notes" θα περιέχει το όνομα και το τηλέφωνό του.
        return appointmentService.save(appointment);
    }
}