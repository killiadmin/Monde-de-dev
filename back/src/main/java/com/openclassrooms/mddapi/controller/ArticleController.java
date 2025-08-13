package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.dto.CreateArticleDTO;
import com.openclassrooms.mddapi.services.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping("")
    public ResponseEntity<Map<String, List<ArticleDTO>>> getAllArticles() {
        Map<String, List<ArticleDTO>> response = articleService.getAllArticles();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDTO> getArticle(@PathVariable Long id) {
        return articleService.getArticleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/new")
    public ResponseEntity<Map<String, String>> createArticle(
            @RequestBody
            CreateArticleDTO createArticleDTO,
            @AuthenticationPrincipal String userIdString) {

        articleService.newArticle(createArticleDTO, userIdString);
        return ResponseEntity.ok(Map.of("message", "Article created !"));
    }
}
