package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.CreateCommentDTO;
import com.openclassrooms.mddapi.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/{articleId}/comments")
    public ResponseEntity<Map<String, String>> createComment(
            @PathVariable Long articleId,
            @Valid @RequestBody CreateCommentDTO createCommentDTO, @AuthenticationPrincipal String userIdString) {
        commentService.createComment(articleId, createCommentDTO, userIdString);
        return ResponseEntity.ok(Map.of("message", "Comment created successfully !"));
    }
}
