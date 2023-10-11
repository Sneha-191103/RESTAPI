package com.creativefusion.sneha.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.creativefusion.sneha.dto.request.HotelRequest;
import com.creativefusion.sneha.dto.response.HotelResponse;
import com.creativefusion.sneha.dto.response.MenuResponse;
import com.creativefusion.sneha.model.Hotel;
import com.creativefusion.sneha.model.Menu;
import com.creativefusion.sneha.repository.HotelRepository;
import com.creativefusion.sneha.service.HotelService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {

	 private final HotelRepository hotelRepository;

	    @Override
	    public List<HotelResponse> getAllHotels() {
	        List<Hotel> hotelList = hotelRepository.findAll();

	        return hotelList.stream()
	                .map(hotel -> {
	                    HotelResponse hotelResponse = new HotelResponse();
	                    hotelResponse.setHid(hotel.getHid());
	                    hotelResponse.setHotelName(hotel.getHotelName());
	                    hotelResponse.setRating(hotel.getRating());
	                    hotelResponse.setLocation(hotel.getLocation());
	                    List<MenuResponse> menuResponses = hotel.getMenus().stream()
	                            .map(menu -> {
	                                MenuResponse menuResponse = new MenuResponse();
	                                menuResponse.setMid(menu.getMid());
	                                menuResponse.setFoodName(menu.getFoodName());
	                                menuResponse.setFoodPrice(menu.getFoodPrice());
	                                menuResponse.setFoodQuantity(menu.getFoodQuantity());
	                                menuResponse.setFoodImage(menu.getFoodImage());
	                                menuResponse.setFoodDesc(menu.getFoodDesc());
	                                return menuResponse;
	                            })
	                            .collect(Collectors.toList());
	                    hotelResponse.setMenus(menuResponses);
	                    return hotelResponse;
	                })
	                .collect(Collectors.toList());
	    }

		@Override
		public boolean saveHotel(HotelRequest request) {
			 if (hotelRepository.findByHotelName(request.getHotelName()).isPresent()) {
		            return false;
		        }

		       Hotel hotel = Hotel.builder()
		               .hotelName(request.getHotelName())
		               .location(request.getLocation())
		               .rating(request.getRating())
		               .hotelImg(request.getHotelImg())
		                .build();

		        hotelRepository.save(hotel);
		        return true;
		}

	    @Override
	    public HotelResponse getHotel(Long hid) {
	        Hotel hotel = hotelRepository.findByHid(hid);
	        return mapHotelToResponse(hotel);
	    }
	    private HotelResponse mapHotelToResponse(Hotel hotel) {
	    	List<MenuResponse> menuResponseDtos = hotel.getMenus()
	    	        .stream()
	    	        .map(menu -> {
                        MenuResponse menuResponse = new MenuResponse();
                        menuResponse.setMid(menu.getMid());
                        menuResponse.setFoodName(menu.getFoodName());
                        menuResponse.setFoodPrice(menu.getFoodPrice());
                        menuResponse.setFoodQuantity(menu.getFoodQuantity());
                        menuResponse.setFoodImage(menu.getFoodImage());
                        menuResponse.setFoodDesc(menu.getFoodDesc());
                        return menuResponse;
                    })
	    	        .collect(Collectors.toList());

	    	    return HotelResponse.builder()
	    	        .hid(hotel.getHid())
	    	        .HotelName(hotel.getHotelName())
	    	        .hotelImg(hotel.getHotelImg())
	    	        .rating(hotel.getRating())
	    	        .location(hotel.getLocation())
	    	        .menus(menuResponseDtos) // Set the mapped menuResponseDtos here
	    	        .build();
	    }

		@Override
	    public Hotel getHotelModelId(Long hid) {
	        return hotelRepository.findByHid(hid);
	    }
		@Override
		public Optional<HotelResponse> getHotelById(Long hid) {
			// TODO Auto-generated method stub
			return Optional.empty();
		}

}
