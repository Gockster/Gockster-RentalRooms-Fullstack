package com.rental.rentalrooms.repository;
import com.rental.rentalrooms.model.Booking;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByRoom_IdAndEndDateAfterAndStartDateBefore(Long roomId, LocalDate endDate, LocalDate startDate);


//    @EntityGraph(attributePaths = "user")
//    List<Booking> findAllWithUser();
}
