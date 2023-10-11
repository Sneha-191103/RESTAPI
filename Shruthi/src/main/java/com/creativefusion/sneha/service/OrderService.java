package com.creativefusion.sneha.service;

import java.util.List;

import com.creativefusion.sneha.dto.request.OrderRequest;
import com.creativefusion.sneha.dto.response.CountResponse;
import com.creativefusion.sneha.dto.response.OrderResponse;

public interface OrderService {

    boolean saveOrder(OrderRequest request);

    List<OrderResponse> getOrders(Long uid);

    CountResponse orderCount();

}
