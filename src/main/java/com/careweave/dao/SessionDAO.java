package com.careweave.dao;

import com.careweave.model.Session;
import com.careweave.utils.DatabaseConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Data Access Object for Session operations
 * Handles all database operations related to user sessions
 */
public class SessionDAO {
    
    /**
     * Create a new session in the database
     * @param session the session to create
     * @throws SQLException if database operation fails
     */
    public void createSession(Session session) throws SQLException {
        String sql = "INSERT INTO sessions (id, user_id, expires_at, ip_address, user_agent, is_active) VALUES (?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, session.getId());
            stmt.setInt(2, session.getUserId());
            stmt.setTimestamp(3, session.getExpiresAt());
            stmt.setString(4, session.getIpAddress());
            stmt.setString(5, session.getUserAgent());
            stmt.setBoolean(6, session.isActive());
            
            stmt.executeUpdate();
        }
    }
    
    /**
     * Find session by ID
     * @param sessionId the session ID
     * @return Session object or null if not found
     * @throws SQLException if database operation fails
     */
    public Session findById(String sessionId) throws SQLException {
        String sql = "SELECT * FROM sessions WHERE id = ? AND is_active = TRUE";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, sessionId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToSession(rs);
                }
            }
        }
        return null;
    }
    
    /**
     * Find all active sessions for a user
     * @param userId the user ID
     * @return list of active sessions
     * @throws SQLException if database operation fails
     */
    public List<Session> findActiveSessionsByUserId(int userId) throws SQLException {
        String sql = "SELECT * FROM sessions WHERE user_id = ? AND is_active = TRUE AND expires_at > NOW()";
        List<Session> sessions = new ArrayList<>();
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    sessions.add(mapResultSetToSession(rs));
                }
            }
        }
        return sessions;
    }
    
    /**
     * Invalidate a session (mark as inactive)
     * @param sessionId the session ID
     * @throws SQLException if database operation fails
     */
    public void invalidateSession(String sessionId) throws SQLException {
        String sql = "UPDATE sessions SET is_active = FALSE WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, sessionId);
            stmt.executeUpdate();
        }
    }
    
    /**
     * Invalidate all sessions for a user
     * @param userId the user ID
     * @throws SQLException if database operation fails
     */
    public void invalidateAllUserSessions(int userId) throws SQLException {
        String sql = "UPDATE sessions SET is_active = FALSE WHERE user_id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            stmt.executeUpdate();
        }
    }
    
    /**
     * Clean up expired sessions
     * @throws SQLException if database operation fails
     */
    public void cleanupExpiredSessions() throws SQLException {
        String sql = "UPDATE sessions SET is_active = FALSE WHERE expires_at < NOW()";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            int updatedRows = stmt.executeUpdate();
            if (updatedRows > 0) {
                System.out.println("Cleaned up " + updatedRows + " expired sessions");
            }
        }
    }
    
    /**
     * Extend session expiration time
     * @param sessionId the session ID
     * @param newExpirationTime new expiration timestamp
     * @throws SQLException if database operation fails
     */
    public void extendSession(String sessionId, Timestamp newExpirationTime) throws SQLException {
        String sql = "UPDATE sessions SET expires_at = ? WHERE id = ? AND is_active = TRUE";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setTimestamp(1, newExpirationTime);
            stmt.setString(2, sessionId);
            stmt.executeUpdate();
        }
    }
    
    /**
     * Count active sessions for a user
     * @param userId the user ID
     * @return number of active sessions
     * @throws SQLException if database operation fails
     */
    public int countActiveSessionsForUser(int userId) throws SQLException {
        String sql = "SELECT COUNT(*) FROM sessions WHERE user_id = ? AND is_active = TRUE AND expires_at > NOW()";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return rs.getInt(1);
                }
            }
        }
        return 0;
    }
    
    /**
     * Map ResultSet to Session object
     * @param rs the ResultSet
     * @return Session object
     * @throws SQLException if mapping fails
     */
    private Session mapResultSetToSession(ResultSet rs) throws SQLException {
        Session session = new Session();
        session.setId(rs.getString("id"));
        session.setUserId(rs.getInt("user_id"));
        session.setCreatedAt(rs.getTimestamp("created_at"));
        session.setExpiresAt(rs.getTimestamp("expires_at"));
        session.setIpAddress(rs.getString("ip_address"));
        session.setUserAgent(rs.getString("user_agent"));
        session.setActive(rs.getBoolean("is_active"));
        return session;
    }
}
