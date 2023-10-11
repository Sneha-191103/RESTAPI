package com.creativefusion.sneha.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HotelResponse {
    private Long hid;
    private String HotelName;
    private float rating;
    private String location;
    private String hotelImg;
    private List<MenuResponse> menus;
}
