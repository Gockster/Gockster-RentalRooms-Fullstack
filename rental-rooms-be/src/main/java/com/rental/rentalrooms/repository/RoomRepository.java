package com.rental.rentalrooms.repository;

import com.rental.rentalrooms.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
