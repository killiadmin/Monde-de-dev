package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Data
@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public Map<String, List<ArticleDTO>> getAllArticles() {
        List<Article> articles = articleRepository.findAll();

        List<ArticleDTO> articleDTOs = articles.stream()
                .map(this::mapToDTO)
                .toList();

        return Map.of("articles", articleDTOs);
    }

    private ArticleDTO mapToDTO(Article article) {
        return new ArticleDTO(
                article.getArt_id(),
                article.getArt_title(),
                article.getArt_content(),
                article.getArt_author().getUsername(),
                article.getThem_associated().getThem_title(),
                article.getCreated_at(),
                article.getUpdated_at()
        );
    }
}
