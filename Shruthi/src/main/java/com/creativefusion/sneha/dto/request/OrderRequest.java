package com.creativefusion.sneha.dto.request;

import java.util.List;

import com.creativefusion.sneha.dto.info.MenuInfo;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private String orderAddress;
    private String paymentMode;
    private Long uid;
    private List<MenuInfo> menus;
}
