package com.rental.rentalrooms.controller;

import com.rental.rentalrooms.dto.BookingRequestDTO;
import com.rental.rentalrooms.dto.BookingResponseDTO;
import com.rental.rentalrooms.model.Booking;
import com.rental.rentalrooms.service.BookingService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/bookings")
    public BookingResponseDTO createBooking(@RequestBody BookingRequestDTO bookingRequestDTO) {
        // Add logic to check availability and save booking
        return bookingService.createBooking(bookingRequestDTO);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/bookings")
    public List<BookingResponseDTO> getAllBookings() {
        // Add security to restrict to admins
        return bookingService.getAllBookings();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/bookings/{id}/approve")
    public BookingRequestDTO approveBooking(@PathVariable Long id) {
        return bookingService.approveBooking(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/bookings/{id}/reject")
    public BookingRequestDTO rejectBooking(@PathVariable Long id) {
        return bookingService.rejectBooking(id);
    }
}
