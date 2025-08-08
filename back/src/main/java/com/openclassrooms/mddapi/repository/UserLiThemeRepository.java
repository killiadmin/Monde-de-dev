package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.UserLiTheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLiThemeRepository extends JpaRepository<UserLiTheme, Long> {
    boolean existsByUserIdAndThemId(Long userId, Long themId);

    void deleteByUserIdAndThemId(Long userId, Long themId);
}
