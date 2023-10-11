package com.creativefusion.sneha.service;

import java.util.List;
import java.util.Optional;

import com.creativefusion.sneha.dto.request.HotelRequest;
import com.creativefusion.sneha.dto.response.HotelResponse;
import com.creativefusion.sneha.model.Hotel;

public interface HotelService {

    List<HotelResponse> getAllHotels();

	boolean saveHotel(HotelRequest request);

	Optional<HotelResponse> getHotelById(Long hid);

	Hotel getHotelModelId(Long hid);

	HotelResponse getHotel(Long hid);

}
