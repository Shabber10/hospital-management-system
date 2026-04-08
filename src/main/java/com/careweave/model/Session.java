package com.careweave.model;

import java.sql.Timestamp;

/**
 * Session model class for managing user sessions
 * Provides secure session tracking with expiration
 */
public class Session {
    
    private String id;
    private int userId;
    private Timestamp createdAt;
    private Timestamp expiresAt;
    private String ipAddress;
    private String userAgent;
    private boolean isActive;
    
    // Default constructor
    public Session() {}
    
    // Constructor for new session
    public Session(String id, int userId, Timestamp expiresAt, String ipAddress, String userAgent) {
        this.id = id;
        this.userId = userId;
        this.expiresAt = expiresAt;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.isActive = true;
    }
    
    // Getters and Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public int getUserId() {
        return userId;
    }
    
    public void setUserId(int userId) {
        this.userId = userId;
    }
    
    public Timestamp getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
    
    public Timestamp getExpiresAt() {
        return expiresAt;
    }
    
    public void setExpiresAt(Timestamp expiresAt) {
        this.expiresAt = expiresAt;
    }
    
    public String getIpAddress() {
        return ipAddress;
    }
    
    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
    
    public String getUserAgent() {
        return userAgent;
    }
    
    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void setActive(boolean active) {
        isActive = active;
    }
    
    /**
     * Check if session is expired
     */
    public boolean isExpired() {
        return expiresAt.before(new Timestamp(System.currentTimeMillis()));
    }
    
    /**
     * Check if session is valid (active and not expired)
     */
    public boolean isValid() {
        return isActive && !isExpired();
    }
    
    @Override
    public String toString() {
        return "Session{" +
                "id='" + id + '\'' +
                ", userId=" + userId +
                ", expiresAt=" + expiresAt +
                ", isActive=" + isActive +
                '}';
    }
}
