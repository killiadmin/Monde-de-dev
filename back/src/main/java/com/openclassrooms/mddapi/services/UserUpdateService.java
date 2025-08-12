package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ThemeDTO;
import com.openclassrooms.mddapi.dto.UpdateUserDTO;
import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.exception.DuplicateEmailException;
import com.openclassrooms.mddapi.exception.DuplicateUsernameException;
import com.openclassrooms.mddapi.exception.UserNotFoundException;
import com.openclassrooms.mddapi.model.Theme;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserUpdateService {

    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDTO updateUserProfile(String userIdString, UpdateUserDTO updateUserProfileDTO) {
        long userId;
        userId = Long.parseLong(userIdString);

        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID : " + userId));

        validateUsernameUniqueness(updateUserProfileDTO.getUsername(), user);
        validateEmailUniqueness(updateUserProfileDTO.getEmail(), user);

        updateUserFields(user, updateUserProfileDTO);

        User updatedUser = userRepository.save(user);

        return buildUserDTO(updatedUser);
    }

    private void validateUsernameUniqueness(String newUsername, User currentUser) {
        if (newUsername != null && !newUsername.equals(currentUser.getUsername())) {
            User existingUser = userRepository.findByEmailOrUsername(newUsername);

            if (existingUser != null && !existingUser.getUserId().equals(currentUser.getUserId())) {
                throw new DuplicateUsernameException("This username is already used !");
            }
        }
    }

    private void validateEmailUniqueness(String newEmail, User currentUser) {
        if (newEmail != null && !newEmail.equals(currentUser.getEmail())) {
            Optional<User> existingUser = userRepository.findByEmail(newEmail);

            if (existingUser.isPresent() && !existingUser.get().getUserId().equals(currentUser.getUserId())) {
                throw new DuplicateEmailException("This email address is already used !");
            }
        }
    }

    private void updateUserFields(User user, UpdateUserDTO updateDTO) {
        user.setUsername(updateDTO.getUsername());
        user.setEmail(updateDTO.getEmail());

        if (updateDTO.getPassword() != null && !updateDTO.getPassword().trim().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(updateDTO.getPassword().trim());
            user.setPassword(encodedPassword);
        }
    }

    private UserDTO buildUserDTO(User user) {
        List<Theme> userThemes = themeRepository.findThemesByUserId(user.getUserId());

        List<ThemeDTO> themeDTOs = userThemes != null ? userThemes.stream()
                .map(theme -> new ThemeDTO(
                        theme.getThem_id(),
                        theme.getThem_title(),
                        theme.getThem_content(),
                        true
                )).collect(Collectors.toList()) : List.of();

        UserDTO userDTO = new UserDTO(
                user.getUserId(),
                user.getEmail(),
                user.getUsername(),
                user.getRole(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );

        userDTO.setThemes(themeDTOs);
        return userDTO;
    }
}
