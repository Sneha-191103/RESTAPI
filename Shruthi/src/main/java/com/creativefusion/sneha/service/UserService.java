package com.creativefusion.sneha.service;

import java.util.List;

import com.creativefusion.sneha.dto.request.UserRequest;
import com.creativefusion.sneha.dto.response.CountResponse;
import com.creativefusion.sneha.dto.response.UserResponse;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUser(Long uid);

    UserResponse updateUser(UserRequest request, Long uid);

    boolean deleteProduct(Long uid);

    CountResponse userCount();

}
