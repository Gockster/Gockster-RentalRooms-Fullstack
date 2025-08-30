package com.rental.rentalrooms.mapper;

import com.rental.rentalrooms.dto.BookingRequestDTO;
import com.rental.rentalrooms.dto.BookingResponseDTO;
import com.rental.rentalrooms.model.Booking;

import java.util.List;


public interface BookingMapper {

    BookingRequestDTO entityToRequestDTO(Booking booking);

    List<BookingRequestDTO> entityToRequestDTOList(List<Booking> booking);

    Booking requestDTOToEntity(BookingRequestDTO bookingRequestDTO);

    BookingResponseDTO entityToResponseDTO(Booking booking);

    List<BookingResponseDTO> entityToResponseDTOList(List<Booking> booking);

    Booking responseDTOToEntity(BookingResponseDTO bookingResponseDto);



}
