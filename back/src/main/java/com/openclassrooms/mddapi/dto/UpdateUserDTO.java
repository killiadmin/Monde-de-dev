package com.openclassrooms.mddapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDTO {

    @NotBlank(message = "The username cannot be empty")
    private String username;

    @NotBlank(message = "The email address cannot be empty")
    @Email(message = "The email address must be valid")
    private String email;

    private String password;
}
