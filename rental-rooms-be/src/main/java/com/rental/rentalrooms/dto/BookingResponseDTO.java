package com.rental.rentalrooms.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;        // add this
    private String phoneNumber;
    private LocalDate startDate;
    private LocalDate endDate;
    private int adults;
    private int children;
    private String status;
    private Long roomId;
    private String roomName;

}