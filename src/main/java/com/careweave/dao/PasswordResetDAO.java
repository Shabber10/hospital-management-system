package com.careweave.dao;

import com.careweave.model.PasswordReset;
import com.careweave.utils.DatabaseConnection;
import java.sql.*;

/**
 * Data Access Object for PasswordReset operations
 * Handles all database operations related to password reset requests
 */
public class PasswordResetDAO {
    
    /**
     * Create a new password reset request
     * @param passwordReset the password reset request
     * @return generated ID
     * @throws SQLException if database operation fails
     */
    public int createPasswordReset(PasswordReset passwordReset) throws SQLException {
        String sql = "INSERT INTO password_resets (token, user_id, otp, expires_at, used_flag) VALUES (?, ?, ?, ?, ?)";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            
            stmt.setString(1, passwordReset.getToken());
            stmt.setInt(2, passwordReset.getUserId());
            stmt.setString(3, passwordReset.getOtp());
            stmt.setTimestamp(4, passwordReset.getExpiresAt());
            stmt.setBoolean(5, passwordReset.isUsedFlag());
            
            int affectedRows = stmt.executeUpdate();
            if (affectedRows == 0) {
                throw new SQLException("Creating password reset failed, no rows affected.");
            }
            
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    int id = generatedKeys.getInt(1);
                    passwordReset.setId(id);
                    return id;
                } else {
                    throw new SQLException("Creating password reset failed, no ID obtained.");
                }
            }
        }
    }
    
    /**
     * Find password reset by token
     * @param token the reset token
     * @return PasswordReset object or null if not found
     * @throws SQLException if database operation fails
     */
    public PasswordReset findByToken(String token) throws SQLException {
        String sql = "SELECT * FROM password_resets WHERE token = ? AND used_flag = FALSE";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, token);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToPasswordReset(rs);
                }
            }
        }
        return null;
    }
    
    /**
     * Find password reset by user ID and OTP
     * @param userId the user ID
     * @param otp the OTP
     * @return PasswordReset object or null if not found
     * @throws SQLException if database operation fails
     */
    public PasswordReset findByUserIdAndOtp(int userId, String otp) throws SQLException {
        String sql = "SELECT * FROM password_resets WHERE user_id = ? AND otp = ? AND used_flag = FALSE AND expires_at > NOW()";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            stmt.setString(2, otp);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToPasswordReset(rs);
                }
            }
        }
        return null;
    }
    
    /**
     * Mark password reset as used
     * @param id the password reset ID
     * @throws SQLException if database operation fails
     */
    public void markAsUsed(int id) throws SQLException {
        String sql = "UPDATE password_resets SET used_flag = TRUE WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, id);
            stmt.executeUpdate();
        }
    }
    
    /**
     * Delete expired password reset requests
     * @throws SQLException if database operation fails
     */
    public void deleteExpiredRequests() throws SQLException {
        String sql = "DELETE FROM password_resets WHERE expires_at < NOW()";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            int deletedRows = stmt.executeUpdate();
            if (deletedRows > 0) {
                System.out.println("Deleted " + deletedRows + " expired password reset requests");
            }
        }
    }
    
    /**
     * Delete all password reset requests for a user
     * @param userId the user ID
     * @throws SQLException if database operation fails
     */
    public void deleteByUserId(int userId) throws SQLException {
        String sql = "DELETE FROM password_resets WHERE user_id = ?";
        
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            stmt.executeUpdate();
        }
    }
    
    /**
     * Map ResultSet to PasswordReset object
     * @param rs the ResultSet
     * @return PasswordReset object
     * @throws SQLException if mapping fails
     */
    private PasswordReset mapResultSetToPasswordReset(ResultSet rs) throws SQLException {
        PasswordReset passwordReset = new PasswordReset();
        passwordReset.setId(rs.getInt("id"));
        passwordReset.setToken(rs.getString("token"));
        passwordReset.setUserId(rs.getInt("user_id"));
        passwordReset.setOtp(rs.getString("otp"));
        passwordReset.setExpiresAt(rs.getTimestamp("expires_at"));
        passwordReset.setUsedFlag(rs.getBoolean("used_flag"));
        passwordReset.setCreatedAt(rs.getTimestamp("created_at"));
        return passwordReset;
    }
}
