// src/services/authService.js
import api from './api'

const authService = {
  async login(credentials) {
    try {
      // For JSON Server, we need to fetch users and validate manually
      const { data: users } = await api.get('/users')
      
      const user = users.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password
      )
      
      if (user) {
        // Generate a mock token (in real app, this would come from backend)
        const token = btoa(JSON.stringify({ 
          userId: user.id, 
          role: user.role,
          timestamp: Date.now() 
        }))
        
        // Remove password from user object
        const { password: _, ...userWithoutPassword } = user
        
        return {
          success: true,
          user: userWithoutPassword,
          token: token
        }
      } else {
        return {
          success: false,
          message: 'Username atau password salah'
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'Terjadi kesalahan saat login. Silakan coba lagi.'
      }
    }
  },

  async validateToken(token) {
    try {
      // Decode and validate token
      const decoded = JSON.parse(atob(token))
      
      // Check if token is expired (24 hours)
      const isExpired = Date.now() - decoded.timestamp > 24 * 60 * 60 * 1000
      
      if (isExpired) {
        return { valid: false, message: 'Token expired' }
      }
      
      // Fetch user data
      const { data: user } = await api.get(`/users/${decoded.userId}`)
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user
        return {
          valid: true,
          user: userWithoutPassword
        }
      } else {
        return { valid: false, message: 'User not found' }
      }
    } catch (error) {
      console.error('Token validation error:', error)
      return { valid: false, message: 'Invalid token' }
    }
  },

  async updateProfile(userId, profileData) {
    try {
      // Get current user data
      const { data: currentUser } = await api.get(`/users/${userId}`)
      
      // Merge with new data
      const updatedUser = {
        ...currentUser,
        ...profileData,
        id: userId // Ensure ID doesn't change
      }
      
      // Update user
      const { data } = await api.put(`/users/${userId}`, updatedUser)
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = data
      
      return {
        success: true,
        data: userWithoutPassword
      }
    } catch (error) {
      console.error('Update profile error:', error)
      return {
        success: false,
        message: 'Gagal memperbarui profil. Silakan coba lagi.'
      }
    }
  },

  async changePassword(userId, oldPassword, newPassword) {
    try {
      // Get current user data
      const { data: user } = await api.get(`/users/${userId}`)
      
      // Verify old password
      if (user.password !== oldPassword) {
        return {
          success: false,
          message: 'Password lama tidak sesuai'
        }
      }
      
      // Update password
      user.password = newPassword
      await api.put(`/users/${userId}`, user)
      
      return {
        success: true,
        message: 'Password berhasil diubah'
      }
    } catch (error) {
      console.error('Change password error:', error)
      return {
        success: false,
        message: 'Gagal mengubah password. Silakan coba lagi.'
      }
    }
  },

  async register(userData) {
    try {
      // Check if username already exists
      const { data: users } = await api.get('/users')
      const existingUser = users.find(u => u.username === userData.username)
      
      if (existingUser) {
        return {
          success: false,
          message: 'Username sudah terdaftar'
        }
      }
      
      // Create new user
      const newUser = {
        ...userData,
        id: Date.now(), // Generate ID
        createdAt: new Date().toISOString()
      }
      
      const { data } = await api.post('/users', newUser)
      
      return {
        success: true,
        data: data,
        message: 'Registrasi berhasil'
      }
    } catch (error) {
      console.error('Register error:', error)
      return {
        success: false,
        message: 'Gagal melakukan registrasi. Silakan coba lagi.'
      }
    }
  }
}

export default authService