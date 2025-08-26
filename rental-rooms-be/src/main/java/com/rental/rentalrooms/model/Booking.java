package com.rental.rentalrooms.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    private LocalDate startDate;

    private LocalDate endDate;

    private int adults;

    private int children;

    private String status; // e.g., "PENDING", "CONFIRMED", "CANCELLED"
}