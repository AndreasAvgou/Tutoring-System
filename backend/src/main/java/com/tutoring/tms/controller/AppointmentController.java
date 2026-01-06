package com.tutoring.tms.controller;

import com.tutoring.tms.model.Appointment;
import com.tutoring.tms.service.AppointmentService;
import com.tutoring.tms.model.AppointmentStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*") // Allows interaction with React
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

    // Public entry endpoint for parents/external bookings
    @PostMapping("/public")
    public Appointment createPublicAppointment(@RequestBody Appointment appointment) {
        // Status is always set to PENDING for subsequent Admin approval
        appointment.setStatus(AppointmentStatus.PENDING);

        // Since it's public, the 'notes' field will contain contact details
        // as the parent might not have a student_id linked yet.
        return appointmentService.save(appointment);
    }
}