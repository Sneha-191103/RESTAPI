package com.creativefusion.sneha.service;

import com.creativefusion.sneha.dto.request.AuthenticationRequest;
import com.creativefusion.sneha.dto.request.RegisterRequest;
import com.creativefusion.sneha.dto.response.AuthenticationResponse;

public interface AuthService {
    boolean userRegistration(RegisterRequest request);

    AuthenticationResponse userAuthentication(AuthenticationRequest request);
}
