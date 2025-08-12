package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UpdateUserDTO;
import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.services.UserService;
import com.openclassrooms.mddapi.services.UserUpdateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final UserUpdateService userUpdateService;

    @GetMapping("/profil")
    public ResponseEntity<UserDTO> getUserDetails(@AuthenticationPrincipal String userIdString) {
        UserDTO userDTO = userService.getAuthenticatedMe(userIdString);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/profil")
    public ResponseEntity<UserDTO> updateUserProfile(
            @Valid @RequestBody UpdateUserDTO updateUserProfileDTO,
            @AuthenticationPrincipal String userIdString) {

        UserDTO updatedUserDTO = userUpdateService.updateUserProfile(userIdString, updateUserProfileDTO);
        return ResponseEntity.ok(updatedUserDTO);
    }
}
