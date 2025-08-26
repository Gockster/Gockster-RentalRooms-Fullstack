package com.rental.rentalrooms.service;
import com.rental.rentalrooms.model.Booking;
import com.rental.rentalrooms.model.Room;
import com.rental.rentalrooms.repository.BookingRepository;
import com.rental.rentalrooms.repository.RoomRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;

    private final RoomRepository roomRepository;

    public BookingService(BookingRepository bookingRepository, RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
    }

    public boolean isRoomAvailable(Long roomId, LocalDate start, LocalDate end) {
        List<Booking> bookings = bookingRepository.findByRoom_IdAndEndDateAfterAndStartDateBefore(roomId, start, end);
        return bookings.isEmpty();
    }

    public Booking createBooking(Booking booking) {
        if (booking.getRoom() == null && booking.getRoomId() != null) {
            Room room = roomRepository.findById(booking.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room not found"));
            booking.setRoom(room);
        }
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
