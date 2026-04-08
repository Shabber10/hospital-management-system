package com.careweave.model;

import java.sql.Timestamp;

/**
 * User model class representing users in the system
 * Supports both DOCTOR and PATIENT roles with authentication fields
 */
public class User {
    
    public enum Role {
        PATIENT, DOCTOR
    }
    
    private int id;
    private String username;
    private String email;
    private String passwordHash;
    private Role role;
    private String salt;
    private boolean isActive;
    private int failedAttempts;
    private Timestamp lockedUntil;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    
    // Default constructor
    public User() {}
    
    // Constructor for new user registration
    public User(String username, String email, String passwordHash, Role role) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
        this.isActive = true;
        this.failedAttempts = 0;
    }
    
    // Getters and Setters
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPasswordHash() {
        return passwordHash;
    }
    
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    
    public Role getRole() {
        return role;
    }
    
    public void setRole(Role role) {
        this.role = role;
    }
    
    public String getSalt() {
        return salt;
    }
    
    public void setSalt(String salt) {
        this.salt = salt;
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void setActive(boolean active) {
        isActive = active;
    }
    
    public int getFailedAttempts() {
        return failedAttempts;
    }
    
    public void setFailedAttempts(int failedAttempts) {
        this.failedAttempts = failedAttempts;
    }
    
    public Timestamp getLockedUntil() {
        return lockedUntil;
    }
    
    public void setLockedUntil(Timestamp lockedUntil) {
        this.lockedUntil = lockedUntil;
    }
    
    public Timestamp getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
    
    public Timestamp getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    /**
     * Check if account is currently locked
     */
    public boolean isLocked() {
        if (lockedUntil == null) {
            return false;
        }
        return lockedUntil.after(new Timestamp(System.currentTimeMillis()));
    }
    
    /**
     * Check if account should be locked due to failed attempts
     */
    public boolean shouldBeLocked() {
        return failedAttempts >= 5;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                ", isActive=" + isActive +
                ", failedAttempts=" + failedAttempts +
                '}';
    }
}
