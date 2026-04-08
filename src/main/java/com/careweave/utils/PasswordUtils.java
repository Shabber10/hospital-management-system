package com.careweave.utils;

import org.mindrot.jbcrypt.BCrypt;
import java.security.SecureRandom;
import java.util.regex.Pattern;

/**
 * Password utility class for secure password operations
 * Uses BCrypt for hashing and provides validation methods
 */
public class PasswordUtils {
    
    private static final int BCRYPT_ROUNDS = 12;
    private static final SecureRandom random = new SecureRandom();
    
    // Password complexity pattern: min 8 chars, uppercase, lowercase, number, symbol
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
    );
    
    /**
     * Hash a password using BCrypt
     * @param plainPassword the plain text password
     * @return hashed password
     */
    public static String hashPassword(String plainPassword) {
        return BCrypt.hashpw(plainPassword, BCrypt.gensalt(BCRYPT_ROUNDS));
    }
    
    /**
     * Verify a password against its hash
     * @param plainPassword the plain text password
     * @param hashedPassword the hashed password
     * @return true if password matches
     */
    public static boolean verifyPassword(String plainPassword, String hashedPassword) {
        try {
            return BCrypt.checkpw(plainPassword, hashedPassword);
        } catch (Exception e) {
            System.err.println("Error verifying password: " + e.getMessage());
            return false;
        }
    }
    
    /**
     * Validate password complexity
     * @param password the password to validate
     * @return true if password meets complexity requirements
     */
    public static boolean isValidPassword(String password) {
        if (password == null || password.trim().isEmpty()) {
            return false;
        }
        return PASSWORD_PATTERN.matcher(password).matches();
    }
    
    /**
     * Generate a secure random OTP
     * @return 6-digit OTP
     */
    public static String generateOTP() {
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }
    
    /**
     * Generate a secure random token
     * @return random token string
     */
    public static String generateSecureToken() {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        StringBuilder token = new StringBuilder();
        for (byte b : bytes) {
            token.append(String.format("%02x", b));
        }
        return token.toString();
    }
    
    /**
     * Get password complexity requirements message
     * @return requirements string
     */
    public static String getPasswordRequirements() {
        return "Password must be at least 8 characters long and contain:\n" +
               "- At least one uppercase letter (A-Z)\n" +
               "- At least one lowercase letter (a-z)\n" +
               "- At least one number (0-9)\n" +
               "- At least one special character (@$!%*?&)";
    }
}
