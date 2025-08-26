package com.rental.rentalrooms.service;
import com.rental.rentalrooms.model.Booking;
import com.rental.rentalrooms.repository.BookingRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public boolean isRoomAvailable(Long roomId, LocalDate start, LocalDate end) {
        List<Booking> bookings = bookingRepository.findByRoomIdAndEndDateAfterAndStartDateBefore(roomId, start, end);
        return bookings.isEmpty();
    }

    public Booking createBooking(Booking booking) {
        if (isRoomAvailable(booking.getRoom().getId(), booking.getStartDate(), booking.getEndDate())) {
            return bookingRepository.save(booking);
        } else {
            throw new IllegalStateException("Room is not available for the selected dates.");
        }
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
