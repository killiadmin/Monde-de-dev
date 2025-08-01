package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ThemeDTO;
import com.openclassrooms.mddapi.dto.UserDTO;
import com.openclassrooms.mddapi.model.Theme;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Data

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ThemeRepository themeRepository;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        com.openclassrooms.mddapi.model.User user = userRepository.findByEmailOrUsername(identifier);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with identifier : " + identifier);
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }

    public UserDTO getAuthenticatedMe(String email) {
        User user = userRepository.findByEmail(email);

        List<Theme> userThemes = themeRepository.findThemesByUserId(user.getUserId());

        List<ThemeDTO> themeDTOs = userThemes.stream()
                .map(theme -> new ThemeDTO(
                        theme.getThem_id(),
                        theme.getThem_title(),
                        theme.getThem_content()
                )).collect(Collectors.toList());

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
