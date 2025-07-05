// tests/unit/stores/auth.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import authService from '@/services/authService'
import router from '@/router'

// Mock the auth service
vi.mock('@/services/authService', () => ({
  default: {
    login: vi.fn(),
    updateProfile: vi.fn()
  }
}))

// Mock the router
vi.mock('@/router', () => ({
  default: {
    push: vi.fn()
  }
}))

describe('Auth Store', () => {
  let authStore

  beforeEach(() => {
    // Create a fresh pinia instance and set it as active
    setActivePinia(createPinia())
    authStore = useAuthStore()
    
    // Clear all mocks
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      expect(authStore.user).toBe(null)
      expect(authStore.token).toBe(null)
      expect(authStore.loading).toBe(false)
      expect(authStore.error).toBe(null)
    })

    it('should compute isAuthenticated correctly', () => {
      expect(authStore.isAuthenticated).toBe(false)
      
      authStore.user = { id: 1, nama: 'Test User' }
      authStore.token = 'test-token'
      
      expect(authStore.isAuthenticated).toBe(true)
    })
  })

  describe('Login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockResponse = {
        success: true,
        user: { id: 1, nama: 'Admin', role: 'admin' },
        token: 'mock-token'
      }
      
      authService.login.mockResolvedValue(mockResponse)
      
      const credentials = { username: 'admin', password: 'admin123' }
      const result = await authStore.login(credentials)
      
      expect(result.success).toBe(true)
      expect(authStore.user).toEqual(mockResponse.user)
      expect(authStore.token).toBe('mock-token')
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mock-token')
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockResponse.user))
      expect(router.push).toHaveBeenCalledWith('/admin/dashboard')
    })

    it('should handle login failure', async () => {
      const mockResponse = {
        success: false,
        message: 'Username atau password salah'
      }
      
      authService.login.mockResolvedValue(mockResponse)
      
      const credentials = { username: 'wrong', password: 'wrong' }
      const result = await authStore.login(credentials)
      
      expect(result.success).toBe(false)
      expect(result.message).toBe('Username atau password salah')
      expect(authStore.user).toBe(null)
      expect(authStore.token).toBe(null)
      expect(localStorage.setItem).not.toHaveBeenCalled()
    })

    it('should set loading state during login', async () => {
      authService.login.mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
      )
      
      const loginPromise = authStore.login({ username: 'test', password: 'test' })
      
      expect(authStore.loading).toBe(true)
      
      await loginPromise
      
      expect(authStore.loading).toBe(false)
    })

    it('should redirect based on user role', async () => {
      const roles = [
        { role: 'admin', expectedPath: '/admin/dashboard' },
        { role: 'dosen', expectedPath: '/dosen/dashboard' },
        { role: 'mahasiswa', expectedPath: '/mahasiswa/dashboard' }
      ]
      
      for (const { role, expectedPath } of roles) {
        vi.clearAllMocks()
        
        authService.login.mockResolvedValue({
          success: true,
          user: { id: 1, nama: 'Test', role },
          token: 'token'
        })
        
        await authStore.login({ username: 'test', password: 'test' })
        
        expect(router.push).toHaveBeenCalledWith(expectedPath)
      }
    })
  })

  describe('Logout', () => {
    it('should clear user data and redirect to login', () => {
      // Set initial authenticated state
      authStore.user = { id: 1, nama: 'Test User' }
      authStore.token = 'test-token'
      
      authStore.logout()
      
      expect(authStore.user).toBe(null)
      expect(authStore.token).toBe(null)
      expect(localStorage.removeItem).toHaveBeenCalledWith('token')
      expect(localStorage.removeItem).toHaveBeenCalledWith('user')
      expect(router.push).toHaveBeenCalledWith('/login')
    })
  })

  describe('Initialize Auth', () => {
    it('should initialize auth from localStorage', () => {
      const mockUser = { id: 1, nama: 'Test User', role: 'admin' }
      const mockToken = 'saved-token'
      
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return JSON.stringify(mockUser)
        if (key === 'token') return mockToken
        return null
      })
      
      authStore.initializeAuth()
      
      expect(authStore.user).toEqual(mockUser)
      expect(authStore.token).toBe(mockToken)
    })

    it('should handle corrupted localStorage data', () => {
      localStorage.getItem.mockImplementation((key) => {
        if (key === 'user') return 'invalid-json'
        if (key === 'token') return 'token'
        return null
      })
      
      authStore.initializeAuth()
      
      expect(authStore.user).toBe(null)
      expect(authStore.token).toBe(null)
      expect(router.push).toHaveBeenCalledWith('/login')
    })
  })

  describe('Update Profile', () => {
    it('should update profile successfully', async () => {
      authStore.user = { id: 1, nama: 'Old Name', email: 'old@email.com' }
      
      const profileData = { nama: 'New Name', email: 'new@email.com' }
      const mockResponse = {
        success: true,
        data: { ...authStore.user, ...profileData }
      }
      
      authService.updateProfile.mockResolvedValue(mockResponse)
      
      const result = await authStore.updateProfile(profileData)
      
      expect(result.success).toBe(true)
      expect(authStore.user.nama).toBe('New Name')
      expect(authStore.user.email).toBe('new@email.com')
      expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(authStore.user))
    })
  })

  describe('Utility Methods', () => {
    it('should check user role correctly', () => {
      authStore.user = { id: 1, nama: 'Test', role: 'admin' }
      
      expect(authStore.hasRole('admin')).toBe(true)
      expect(authStore.hasRole('dosen')).toBe(false)
      expect(authStore.hasRole('mahasiswa')).toBe(false)
    })

    it('should clear error', () => {
      authStore.error = 'Some error'
      authStore.clearError()
      expect(authStore.error).toBe(null)
    })
  })
})