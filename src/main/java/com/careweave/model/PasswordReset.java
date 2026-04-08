package com.careweave.model;

import java.sql.Timestamp;

/**
 * PasswordReset model class for managing password reset requests
 * Supports OTP-based password reset with expiration
 */
public class PasswordReset {
    
    private int id;
    private String token;
    private int userId;
    private String otp;
    private Timestamp expiresAt;
    private boolean usedFlag;
    private Timestamp createdAt;
    
    // Default constructor
    public PasswordReset() {}
    
    // Constructor for new password reset request
    public PasswordReset(String token, int userId, String otp, Timestamp expiresAt) {
        this.token = token;
        this.userId = userId;
        this.otp = otp;
        this.expiresAt = expiresAt;
        this.usedFlag = false;
    }
    
    // Getters and Setters
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public void setUserId(int userId) {
        this.userId = userId;
    }
    
    public String getOtp() {
        return otp;
    }
    
    public void setOtp(String otp) {
        this.otp = otp;
    }
    
    public Timestamp getExpiresAt() {
        return expiresAt;
    }
    
    public void setExpiresAt(Timestamp expiresAt) {
        this.expiresAt = expiresAt;
    }
    
    public boolean isUsedFlag() {
        return usedFlag;
    }
    
    public void setUsedFlag(boolean usedFlag) {
        this.usedFlag = usedFlag;
    }
    
    public Timestamp getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
    
    /**
     * Check if password reset token is expired
     */
    public boolean isExpired() {
        return expiresAt.before(new Timestamp(System.currentTimeMillis()));
    }
    
    /**
     * Check if password reset token is valid (not used and not expired)
     */
    public boolean isValid() {
        return !usedFlag && !isExpired();
    }
    
    @Override
    public String toString() {
        return "PasswordReset{" +
                "id=" + id +
                ", token='" + token + '\'' +
                ", userId=" + userId +
                ", usedFlag=" + usedFlag +
                ", expiresAt=" + expiresAt +
                '}';
    }
}
