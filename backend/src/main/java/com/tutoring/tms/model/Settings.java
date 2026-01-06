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
    private Long id = 1L; // Always use ID 1 for global system settings

    private String institutionName;
    private String phone;
    private String email;
    private String address;
}