package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.ArticleDTO;
import com.openclassrooms.mddapi.dto.CommentDTO;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CommentRepository commentRepository;

    public Map<String, List<ArticleDTO>> getAllArticles() {
        List<Article> articles = articleRepository.findAllByOrderByCreatedAtDesc();
        List<ArticleDTO> articleDTOs = articles.stream()
                .map(article -> mapToDTO(article, false))
                .toList();
        return Map.of("articles", articleDTOs);
    }


    public Optional<ArticleDTO> getArticleById(Long id) {
        return articleRepository.findById(id)
                .map(article -> mapToDTO(article, true));
    }


    private ArticleDTO mapToDTO(Article article, boolean includeComments) {
        List<CommentDTO> commentDTOs = Collections.emptyList();

        if (includeComments) {
            List<Comment> articleComments = commentRepository.findByArticleIdOrderByCreatedAtDesc(article.getArt_id());
            commentDTOs = articleComments.stream()
                    .map(comment -> new CommentDTO(
                            comment.getCommentId(),
                            comment.getContent(),
                            comment.getAuthor().getUsername(),
                            comment.getCreatedAt(),
                            comment.getUpdatedAt()
                    )).collect(Collectors.toList());
        }

        return new ArticleDTO(
                article.getArt_id(),
                article.getArt_title(),
                article.getArt_content(),
                article.getArt_author().getUsername(),
                article.getThem_associated().getThem_title(),
                article.getCreatedAt(),
                article.getUpdatedAt(),
                commentDTOs
        );
    }
}
