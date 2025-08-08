package com.openclassrooms.mddapi.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "users_li_themes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLiTheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "them_id")
    private Long themId;

    public UserLiTheme(Long userId, Long themId) {
        this.userId = userId;
        this.themId = themId;
    }
}
