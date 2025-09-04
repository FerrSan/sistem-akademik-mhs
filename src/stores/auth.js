// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import authService from '@/services/authService'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Initialize token from localStorage if available
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
    }
  }

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userRole = computed(() => user.value?.role || null)
  const userName = computed(() => user.value?.nama || '')

  // Actions
  async function login(credentials) {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.login(credentials)
      
      if (response.success) {
        user.value = response.user
        token.value = response.token
        
        // Save token to localStorage
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        
        // Redirect based on role
        const roleRedirects = {
          admin: '/admin/dashboard',
          dosen: '/dosen/dashboard',
          mahasiswa: '/mahasiswa/dashboard'
        }
        
        router.push(roleRedirects[response.user.role] || '/')
        return { success: true }
      } else {
        throw new Error(response.message || 'Login gagal')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat login'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    
    // Clear localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Redirect to main page
    router.push('/')
  }

  function initializeAuth() {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    
    if (savedUser && savedToken) {
      try {
        user.value = JSON.parse(savedUser)
        token.value = savedToken
      } catch (err) {
        console.error('Error parsing saved user data:', err)
        logout()
      }
    }
  }

  async function updateProfile(profileData) {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.updateProfile(user.value.id, profileData)
      
      if (response.success) {
        user.value = { ...user.value, ...profileData }
        localStorage.setItem('user', JSON.stringify(user.value))
        return { success: true, message: 'Profil berhasil diperbarui' }
      } else {
        throw new Error(response.message || 'Gagal memperbarui profil')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat memperbarui profil'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  function hasRole(role) {
    return user.value?.role === role
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    user,
    token,
    loading,
    error,
    
    // Getters
    isAuthenticated,
    userRole,
    userName,
    
    // Actions
    login,
    logout,
    initializeAuth,
    updateProfile,
    hasRole,
    clearError
  }
})