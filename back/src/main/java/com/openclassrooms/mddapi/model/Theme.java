package com.openclassrooms.mddapi.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "themes")
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long them_id;

    private String them_title;

    @Column(columnDefinition = "TEXT")
    private String them_content;
}
