package com.rental.rentalrooms.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BookingRequestDTO {
    private Long roomId;
    private int adults;
    private int children;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private Long userId;

}
