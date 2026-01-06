package com.tutoring.tms.service;

import com.tutoring.tms.model.Appointment;
import com.tutoring.tms.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Service handling scheduling and appointment lifecycle.
 */
@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    /** * Saves or updates an appointment entry.
     */
    @Transactional
    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    /** * Removes an appointment from the system by ID.
     */
    @Transactional
    public void delete(Long id) {
        appointmentRepository.deleteById(id);
    }

    public Appointment findById(Long id) {
        return appointmentRepository.findById(id).orElse(null);
    }
}