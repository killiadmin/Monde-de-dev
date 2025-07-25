package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.LoginDTO;
import com.openclassrooms.mddapi.services.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Collections;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginDTO loginDTO) {
        String token = authService.authenticateAndGenerateToken(loginDTO);

        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }
}

