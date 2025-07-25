package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.configuration.JwtUtils;
import com.openclassrooms.mddapi.dto.LoginDTO;
import com.openclassrooms.mddapi.exception.UnauthorizedException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public String authenticateAndGenerateToken(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getIdentifier(), loginDTO.getPassword())
        );

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Invalid credentials !");
        }

        return jwtUtils.generateToken(authentication);
    }
}
