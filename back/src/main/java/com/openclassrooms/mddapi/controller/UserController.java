package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.exception.UnauthorizedException;
import com.openclassrooms.mddapi.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping("/profil")
    public ResponseEntity<?> getUserDetails(Authentication authentication) {
        if (authentication == null) {
            throw new UnauthorizedException("User not found !");
        }

        String email = authentication.getName();
        UserDTO userDTO = userService.getAuthenticatedMe(email);

        return ResponseEntity.ok(userDTO);
    }
}
