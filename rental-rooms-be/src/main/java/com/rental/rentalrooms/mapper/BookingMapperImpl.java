package com.rental.rentalrooms.mapper;

import com.rental.rentalrooms.dto.BookingRequestDTO;
import com.rental.rentalrooms.dto.BookingResponseDTO;
import com.rental.rentalrooms.model.Booking;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class BookingMapperImpl implements BookingMapper {

    @Override
    public BookingRequestDTO entityToRequestDTO(Booking booking) {
        if (booking == null) return null;
        BookingRequestDTO dto = new BookingRequestDTO();
        dto.setRoomId(booking.getRoom() != null ? booking.getRoom().getId() : null);
        dto.setAdults(booking.getAdults());
        dto.setChildren(booking.getChildren());
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setStatus(booking.getStatus());
        dto.setUserId(booking.getUser() != null ? booking.getUser().getId() : null);
        return dto;
    }

    @Override
    public List<BookingRequestDTO> entityToRequestDTOList(List<Booking> bookings) {
        if (bookings == null) return List.of();
        return bookings.stream()
                .map(this::entityToRequestDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Booking requestDTOToEntity(BookingRequestDTO bookingRequestDTO) {
        if (bookingRequestDTO == null) return null;
        Booking booking = new Booking();
        booking.setAdults(bookingRequestDTO.getAdults());
        booking.setChildren(bookingRequestDTO.getChildren());
        booking.setStartDate(bookingRequestDTO.getStartDate());
        booking.setEndDate(bookingRequestDTO.getEndDate());
        booking.setStatus(bookingRequestDTO.getStatus());
        // Note: Room and User entities should be set separately after mapping
        return booking;
    }

    @Override
    public BookingResponseDTO entityToResponseDTO(Booking booking) {
        if (booking == null) return null;
        BookingResponseDTO dto = new BookingResponseDTO();
        dto.setId(booking.getId());
        if (booking.getUser() != null) {
            dto.setFirstName(booking.getUser().getFirstName());
            dto.setLastName(booking.getUser().getLastName());
            dto.setEmail(booking.getUser().getEmail());               // set email
            dto.setPhoneNumber(booking.getUser().getPhoneNumber());   // set phone number
        }
        dto.setStartDate(booking.getStartDate());
        dto.setEndDate(booking.getEndDate());
        dto.setAdults(booking.getAdults());
        dto.setChildren(booking.getChildren());
        dto.setStatus(booking.getStatus());
        if (booking.getRoom() != null) {
            dto.setRoomId(booking.getRoom().getId());
            dto.setRoomName(booking.getRoom().getName());
        }
        return dto;
    }


    @Override
    public List<BookingResponseDTO> entityToResponseDTOList(List<Booking> booking) {
        if (booking == null) return List.of();
        return booking.stream()
                .map(this::entityToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Booking responseDTOToEntity(BookingResponseDTO bookingResponseDto) {
        if (bookingResponseDto == null) return null;
        Booking booking = new Booking();
        booking.setStartDate(bookingResponseDto.getStartDate());
        booking.setEndDate(bookingResponseDto.getEndDate());
        booking.setStatus(bookingResponseDto.getStatus());
        // Note: Room and User entities should be set separately after mapping
        return booking;
    }

}
