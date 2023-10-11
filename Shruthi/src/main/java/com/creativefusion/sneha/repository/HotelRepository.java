package com.creativefusion.sneha.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.creativefusion.sneha.model.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long> {

    Hotel findByHid(Long hid);

	Optional<Hotel> findByHotelName(String hotelName);

}
