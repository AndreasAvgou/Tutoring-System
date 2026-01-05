package com.tutoring.tms.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List; // <--- ΠΡΟΣΘΗΚΗ: Για να αναγνωρίζει τη λέξη List
import com.fasterxml.jackson.annotation.JsonIgnore; // <--- ΠΡΟΣΘΗΚΗ: Για την αποφυγή σφαλμάτων στο JSON

/**
 * Entity class representing a Teacher in the Tutoring Management System.
 */
@Entity
@Table(name = "teachers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    private String specialty;

    private String phone;

    @Column(unique = true)
    private String email;

    @Transient
    private String username;

    @Transient
    private String password;

    private String role;

    // Η σχέση με τα μαθήματα
    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // <--- ΠΡΟΣΘΗΚΗ: Εμποδίζει το "infinite recursion" (ατέρμονο βρόχο) κατά την αποστολή δεδομένων στη React
    private List<Course> courses;
}