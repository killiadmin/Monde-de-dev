package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.SubRequestDTO;
import com.openclassrooms.mddapi.dto.ThemeDTO;
import com.openclassrooms.mddapi.services.ThemeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/themes")
@RequiredArgsConstructor
public class ThemeController {

    private final ThemeService themeService;

    @GetMapping("")
    public ResponseEntity<Map<String, List<ThemeDTO>>> getAllThemes(@AuthenticationPrincipal String userIdString) {
        Map<String, List<ThemeDTO>> response = themeService.getAllThemes(userIdString);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/subscribe")
    public ResponseEntity<Map<String, String>> subscribeToTheme(
            @RequestBody SubRequestDTO request,
            @AuthenticationPrincipal String userIdString) {

        themeService.subscribeUserToTheme(request, userIdString);

        return ResponseEntity.ok(Map.of("message", "Successful theme subscription !"));
    }

    @PostMapping("/unsubscribe")
    public ResponseEntity<Map<String, String>> unsubscribeFromTheme(
            @RequestBody SubRequestDTO request,
            @AuthenticationPrincipal String userIdString) {

            themeService.unsubscribeUserFromTheme(request, userIdString);

            return ResponseEntity.ok(Map.of("message", "Successful theme unsubscribe !"));
    }
}
