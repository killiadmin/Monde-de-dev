package com.openclassrooms.mddapi.repository;

import com.openclassrooms.mddapi.model.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThemeRepository extends JpaRepository<Theme, Long> {

    @Query(value = "SELECT t.* " +
            "FROM themes t " +
            "INNER JOIN users_li_themes ult ON t.them_id = ult.them_id " +
            "WHERE ult.user_id = :userId", nativeQuery = true)

    List<Theme> findThemesByUserId(@Param("userId") Long userId);
}
