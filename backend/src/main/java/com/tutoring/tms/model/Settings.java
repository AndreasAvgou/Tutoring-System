package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "settings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Settings {
    @Id
    private Long id = 1L; // Χρησιμοποιούμε πάντα το ID 1 για τις γενικές ρυθμίσεις

    private String institutionName;
    private String phone;
    private String email;
    private String address;
}