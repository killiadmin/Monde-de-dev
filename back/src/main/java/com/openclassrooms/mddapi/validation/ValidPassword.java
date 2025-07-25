package com.openclassrooms.mddapi.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = PasswordValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPassword {
    String message() default "The password must contain at least 8 characters, a lowercase, a capital letter, a figure and a special character";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
