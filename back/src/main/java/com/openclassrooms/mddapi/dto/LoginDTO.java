package com.openclassrooms.mddapi.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginDTO {

    @NotBlank
    private String identifier;

    @NotBlank
    private String password;
}
