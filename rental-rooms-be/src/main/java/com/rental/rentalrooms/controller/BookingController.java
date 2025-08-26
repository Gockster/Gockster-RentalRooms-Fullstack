package com.rental.rentalrooms.controller;

import com.rental.rentalrooms.model.Booking;
import com.rental.rentalrooms.service.BookingService;
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
    public Booking createBooking(@RequestBody Booking booking) {
        // Add logic to check availability and save booking
        return bookingService.createBooking(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        // Add security to restrict to admins
        return bookingService.getAllBookings();
    }
}
