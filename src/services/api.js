// src/services/api.js
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401: {
          // Unauthorized - clear auth and redirect to login
          const authStore = useAuthStore()
          authStore.logout()
          break
        }
        case 403:
          // Forbidden - show error message
          console.error('Access forbidden:', error.response.data.message)
          break
        case 404:
          // Not found
          console.error('Resource not found:', error.response.data.message)
          break
        case 500:
          // Server error
          console.error('Server error:', error.response.data.message)
          break
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('No response from server:', error.request)
    } else {
      // Something happened in setting up the request
      console.error('Request error:', error.message)
    }
    
    return Promise.reject(error)
  }
)

export default api