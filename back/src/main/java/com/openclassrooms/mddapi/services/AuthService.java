package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.configuration.JwtUtils;
import com.openclassrooms.mddapi.dto.LoginDTO;
import com.openclassrooms.mddapi.dto.RegisterDTO;
import com.openclassrooms.mddapi.exception.UnauthorizedException;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String authenticateAndGenerateToken(LoginDTO loginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getIdentifier(), loginDTO.getPassword())
        );

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UnauthorizedException("Invalid credentials !");
        }

        String userIdString = authentication.getName();
        Long userId = Long.valueOf(userIdString);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UnauthorizedException("User not found !"));

        return jwtUtils.generateTokenForUser(user.getUserId(), user.getEmail(), user.getRole());
    }

    public String registerAndGenerateToken(RegisterDTO registerDTO) throws Exception {
        String email = registerDTO.getEmail().trim();
        String password = registerDTO.getPassword().trim();
        String username = registerDTO.getUsername().trim();

        if (email.isEmpty() || password.isEmpty() || username.isEmpty()) {
            throw new Exception("An error occurred during recording !");
        }

        if (userRepository.findByEmail(email).isPresent()) {
            throw new Exception("An error occurred during recording !");
        }

        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setUsername(username);

        User savedUser = userRepository.save(user);

        return jwtUtils.generateTokenForUser(savedUser.getUserId(), savedUser.getEmail(), savedUser.getRole());
    }
}