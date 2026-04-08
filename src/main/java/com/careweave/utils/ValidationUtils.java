package com.careweave.utils;

import java.util.regex.Pattern;

/**
 * Validation utility class for input validation
 * Provides methods for validating email, username, and other inputs
 */
public class ValidationUtils {
    
    // Email validation pattern (RFC 5322 compliant)
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
    );
    
    // Username pattern: 3-50 chars, alphanumeric and dots/underscores
    private static final Pattern USERNAME_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9._]{3,50}$"
    );
    
    // Phone number pattern: supports various formats
    private static final Pattern PHONE_PATTERN = Pattern.compile(
        "^[+]?[0-9]{10,15}$"
    );
    
    /**
     * Validate email format
     * @param email the email to validate
     * @return true if email is valid
     */
    public static boolean isValidEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        return EMAIL_PATTERN.matcher(email.trim()).matches();
    }
    
    /**
     * Validate username format
     * @param username the username to validate
     * @return true if username is valid
     */
    public static boolean isValidUsername(String username) {
        if (username == null || username.trim().isEmpty()) {
            return false;
        }
        return USERNAME_PATTERN.matcher(username.trim()).matches();
    }
    
    /**
     * Validate phone number format
     * @param phone the phone number to validate
     * @return true if phone is valid
     */
    public static boolean isValidPhone(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            return false;
        }
        // Remove spaces and dashes for validation
        String cleanPhone = phone.replaceAll("[\\s-]", "");
        return PHONE_PATTERN.matcher(cleanPhone).matches();
    }
    
    /**
     * Sanitize input string to prevent SQL injection
     * @param input the input to sanitize
     * @return sanitized input
     */
    public static String sanitizeInput(String input) {
        if (input == null) {
            return null;
        }
        // Remove potentially dangerous characters
        return input.replaceAll("[<>\"'%;()&+]", "").trim();
    }
    
    /**
     * Validate name (first name, last name)
     * @param name the name to validate
     * @return true if name is valid
     */
    public static boolean isValidName(String name) {
        if (name == null || name.trim().isEmpty()) {
            return false;
        }
        // Allow letters, spaces, hyphens, and apostrophes
        return name.matches("^[a-zA-Z\\s'-]{2,50}$");
    }
    
    /**
     * Check if string is null or empty
     * @param str the string to check
     * @return true if string is null or empty
     */
    public static boolean isEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }
    
    /**
     * Get email validation error message
     * @return error message
     */
    public static String getEmailValidationMessage() {
        return "Please enter a valid email address (e.g., user@example.com)";
    }
    
    /**
     * Get username validation error message
     * @return error message
     */
    public static String getUsernameValidationMessage() {
        return "Username must be 3-50 characters long and contain only letters, numbers, dots, and underscores";
    }
}
