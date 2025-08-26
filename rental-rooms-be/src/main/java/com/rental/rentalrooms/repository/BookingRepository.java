package com.rental.rentalrooms.repository;
import com.rental.rentalrooms.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByRoomIdAndEndDateAfterAndStartDateBefore(Long roomId, LocalDate start, LocalDate end);
}
