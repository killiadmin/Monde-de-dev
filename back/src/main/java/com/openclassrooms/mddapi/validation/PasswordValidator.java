package com.openclassrooms.mddapi.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    private static final Pattern LOWERCASE_PATTERN = Pattern.compile(".*[a-z].*");
    private static final Pattern UPPERCASE_PATTERN = Pattern.compile(".*[A-Z].*");
    private static final Pattern DIGIT_PATTERN = Pattern.compile(".*\\d.*");
    private static final Pattern SPECIAL_CHAR_PATTERN = Pattern.compile(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*");

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null || password.trim().isEmpty()) {
            return false;
        }

        String trimmedPassword = password.trim();

        if (trimmedPassword.length() < 8) {
            return false;
        }

        boolean hasLowercase = LOWERCASE_PATTERN.matcher(trimmedPassword).matches();
        boolean hasUppercase = UPPERCASE_PATTERN.matcher(trimmedPassword).matches();
        boolean hasDigit = DIGIT_PATTERN.matcher(trimmedPassword).matches();
        boolean hasSpecialChar = SPECIAL_CHAR_PATTERN.matcher(trimmedPassword).matches();

        return hasLowercase && hasUppercase && hasDigit && hasSpecialChar;
    }
}
