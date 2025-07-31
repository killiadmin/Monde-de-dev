package com.openclassrooms.mddapi.model;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long art_id;

    @ManyToOne
    @JoinColumn(name = "art_author", nullable = false)
    private User art_author;

    @ManyToOne
    @JoinColumn(name = "them_associated", nullable = false)
    private Theme them_associated;

    @Column(name = "art_title", nullable = false, length = 255)
    private String art_title;

    @Column(name = "art_content", columnDefinition = "TEXT", length = 5000)
    private String art_content;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP", nullable = false)
    @CreationTimestamp
    private LocalDateTime created_at;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", nullable = false)
    @UpdateTimestamp
    private LocalDateTime updated_at;
}
