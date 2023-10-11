package com.creativefusion.sneha.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelRequest {
	private String HotelName;
    private float rating;
    private String location;
	private String hotelImg;

}
