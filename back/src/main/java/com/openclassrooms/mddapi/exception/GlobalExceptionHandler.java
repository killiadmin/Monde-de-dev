package com.openclassrooms.mddapi.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {

        Map<String, Object> response = new HashMap<>();
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("timestamp", LocalDateTime.now());
        response.put("error", "Validation error");

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        response.put("details", errors);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Object> handleUnauthorizedException(UnauthorizedException ex) {
        return createErrorResponse(
                HttpStatus.UNAUTHORIZED,
                "Unauthorized access",
                ex.getMessage()
        );
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Object> handleAuthenticationException(AuthenticationException ex) {
        return createErrorResponse(
                HttpStatus.UNAUTHORIZED,
                "Authentication error",
                ex.getMessage()
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException ex) {
        return createErrorResponse(
                HttpStatus.FORBIDDEN,
                "Access denied",
                ex.getMessage()
        );
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex) {
        return createErrorResponse(
                HttpStatus.NOT_FOUND,
                "User not found",
                ex.getMessage()
        );
    }

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<Object> handleDuplicateUsernameException(DuplicateUsernameException ex) {
        return createErrorResponse(
                HttpStatus.CONFLICT,
                "Data conflict",
                ex.getMessage()
        );
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<Object> handleDuplicateEmailException(DuplicateEmailException ex) {
        return createErrorResponse(
                HttpStatus.CONFLICT,
                "Data conflict",
                ex.getMessage()
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex) {
        return createErrorResponse(
                HttpStatus.BAD_REQUEST,
                "Argument invalide",
                ex.getMessage()
        );
    }

    @ExceptionHandler(NumberFormatException.class)
    public ResponseEntity<Object> handleNumberFormatException(NumberFormatException ex) {
        return createErrorResponse(
                HttpStatus.BAD_REQUEST,
                "Invalid data format",
                ex.getMessage()
        );
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex) {
        String message = ex.getMessage();
        if (message != null) {
            if (message.contains("username") && message.contains("already exists")) {
                return createErrorResponse(HttpStatus.CONFLICT, "conflict datas", message);
            }
            if (message.contains("mail address") && message.contains("already exists")) {
                return createErrorResponse(HttpStatus.CONFLICT, "conflict datas", message);
            }
            if (message.contains("not found")) {
                return createErrorResponse(HttpStatus.NOT_FOUND, "Not found resource", message);
            }
        }

        return createErrorResponse(
                HttpStatus.BAD_REQUEST,
                "Processing error",
                ex.getMessage()
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception ex) {
        return createErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal Server Error",
                ex.getMessage()
        );
    }

    private ResponseEntity<Object> createErrorResponse(HttpStatus status, String error, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status.value());
        response.put("timestamp", LocalDateTime.now());
        response.put("error", error);
        response.put("message", message);
        return new ResponseEntity<>(response, status);
    }
}