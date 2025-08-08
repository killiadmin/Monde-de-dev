package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.SubRequestDTO;
import com.openclassrooms.mddapi.dto.ThemeDTO;
import com.openclassrooms.mddapi.model.Theme;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.model.UserLiTheme;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import com.openclassrooms.mddapi.repository.UserLiThemeRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ThemeService {

    private final ThemeRepository themeRepository;
    private final UserLiThemeRepository userLiThemeRepository;
    private final UserRepository userRepository;

    public Map<String, List<ThemeDTO>> getAllThemes() {
        List<Theme> themes = themeRepository.findAll();

        List<ThemeDTO> themeDTOs = themes.stream()
                .map(this::mapToDTO)
                .toList();

        return Map.of("themes", themeDTOs);
    }

    @Transactional
    public void subscribeUserToTheme(SubRequestDTO subRequestDTO, Authentication authentication) {
        String userEmail = authentication.getName();

        User user = userRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found !"));

        Theme theme = themeRepository
                .findById(subRequestDTO.getThemId())
                .orElseThrow(() -> new RuntimeException("Theme not found !"));

        if (userLiThemeRepository.existsByUserIdAndThemId(user.getUserId(), theme.getThem_id())) {
            throw new RuntimeException("The user is already subscribed to this theme !");
        }

        UserLiTheme subscription = new UserLiTheme(user.getUserId(), theme.getThem_id());
        userLiThemeRepository.save(subscription);
    }

    @Transactional
    public void unsubscribeUserFromTheme(SubRequestDTO subRequestDTO, Authentication authentication) {
        String userEmail = authentication.getName();

        User user = userRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found !"));

        Theme theme = themeRepository
                .findById(subRequestDTO.getThemId())
                .orElseThrow(() -> new RuntimeException("Theme not found !"));

        if (!userLiThemeRepository.existsByUserIdAndThemId(user.getUserId(), theme.getThem_id())) {
            throw new RuntimeException("The user is not subscribed to this theme !");
        }

        userLiThemeRepository.deleteByUserIdAndThemId(user.getUserId(), theme.getThem_id());
    }

    private ThemeDTO mapToDTO(Theme theme) {
        return new ThemeDTO(
                theme.getThem_id(),
                theme.getThem_title(),
                theme.getThem_content()
        );
    }
}
