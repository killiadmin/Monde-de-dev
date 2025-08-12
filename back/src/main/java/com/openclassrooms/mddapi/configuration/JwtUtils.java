package com.openclassrooms.mddapi.configuration;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import org.springframework.stereotype.Service;

@Service
public class JwtUtils {

    private final JwtEncoder jwtEncoder;

    @Value("${app.jwt.expiration}")
    private long jwtExpirationInSeconds;

    public JwtUtils(JwtEncoder jwtEncoder) {
        this.jwtEncoder = jwtEncoder;
    }

    public String generateTokenForUser(Long userId, String email, String role) {
        Instant now = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(jwtExpirationInSeconds))
                .subject(userId.toString())
                .claim("email", email)
                .claim("role", role)
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(
                JwsHeader.with(MacAlgorithm.HS256).build(), claims)
        ).getTokenValue();
    }
}
