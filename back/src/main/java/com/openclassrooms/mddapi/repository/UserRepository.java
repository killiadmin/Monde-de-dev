package com.openclassrooms.mddapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.openclassrooms.mddapi.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT u FROM User u WHERE u.email = :identifier OR u.username = :identifier")
    User findByEmailOrUsername(@Param("identifier") String identifier);
}


