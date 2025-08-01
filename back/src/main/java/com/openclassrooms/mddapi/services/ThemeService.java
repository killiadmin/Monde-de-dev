package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ThemeDTO;
import com.openclassrooms.mddapi.model.Theme;
import com.openclassrooms.mddapi.repository.ThemeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ThemeService {

    private final ThemeRepository themeRepository;

    public Map<String, List<ThemeDTO>> getAllThemes() {
        List<Theme> themes = themeRepository.findAll();

        List<ThemeDTO> themeDTOs = themes.stream()
                .map(this::mapToDTO)
                .toList();

        return Map.of("themes", themeDTOs);
    }

    private ThemeDTO mapToDTO(Theme theme) {
        return new ThemeDTO(
                theme.getThem_id(),
                theme.getThem_title(),
                theme.getThem_content()
        );
    }
}
