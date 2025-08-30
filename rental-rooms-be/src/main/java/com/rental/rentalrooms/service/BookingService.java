package com.rental.rentalrooms.service;
import com.rental.rentalrooms.dto.BookingRequestDTO;
import com.rental.rentalrooms.dto.BookingResponseDTO;
import com.rental.rentalrooms.mapper.BookingMapper;
import com.rental.rentalrooms.model.Booking;
import com.rental.rentalrooms.model.Room;
import com.rental.rentalrooms.model.User;
import com.rental.rentalrooms.repository.BookingRepository;
import com.rental.rentalrooms.repository.RoomRepository;
import com.rental.rentalrooms.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final BookingMapper bookingMapper;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository, RoomRepository roomRepository, BookingMapper bookingMapper, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.bookingMapper = bookingMapper;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    public boolean isRoomAvailable(Long roomId, LocalDate start, LocalDate end) {
        List<Booking> bookings = bookingRepository.findByRoom_IdAndEndDateAfterAndStartDateBefore(roomId, start, end);
        return bookings.isEmpty();
    }

    public BookingResponseDTO createBooking(BookingRequestDTO bookingRequestDTO) {
        if (!isRoomAvailable(bookingRequestDTO.getRoomId(), bookingRequestDTO.getStartDate(), bookingRequestDTO.getEndDate())) {
            throw new RuntimeException("Room is not available for the selected dates");
        }

        Room room = roomRepository.findById(bookingRequestDTO.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));
        User user = userRepository.findById(bookingRequestDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingMapper.requestDTOToEntity(bookingRequestDTO);
        booking.setRoom(room);
        booking.setUser(user); // Set the user entity

        Booking savedBooking = bookingRepository.save(booking);
        return bookingMapper.entityToResponseDTO(savedBooking);
    }

    public BookingRequestDTO approveBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("APPROVED");
        return bookingMapper.entityToRequestDTO(bookingRepository.save(booking));
    }

    public BookingRequestDTO rejectBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus("REJECTED");
        return bookingMapper.entityToRequestDTO(bookingRepository.save(booking));
    }

    public List<BookingResponseDTO> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(bookingMapper::entityToResponseDTO)
                .toList();
    }
}
