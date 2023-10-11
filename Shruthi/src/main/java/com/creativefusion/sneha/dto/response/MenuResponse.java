package com.creativefusion.sneha.dto.response;

import com.creativefusion.sneha.model.Hotel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuResponse {
    private Long mid;
    private String foodName;
    private float foodPrice;
    private Long foodQuantity;
    private String foodImage;
    private String foodDesc;
//    private Hotel hotel;
}
