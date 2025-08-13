package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.dto.CreateCommentDTO;
import com.openclassrooms.mddapi.model.Article;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.ArticleRepository;
import com.openclassrooms.mddapi.repository.CommentRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    public void createComment(Long articleId, CreateCommentDTO createCommentDTO, String userIdString) {
        long userId;
        userId = Long.parseLong(userIdString);

        User user = userRepository
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found !"));

        Article article = articleRepository
                .findById(articleId)
                .orElseThrow(() -> new RuntimeException("Article not found !"));

        Comment comment = new Comment();
        comment.setContent(createCommentDTO.getContent());
        comment.setAuthor(user);
        comment.setArticle(article);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());

        commentRepository.save(comment);
    }
}
