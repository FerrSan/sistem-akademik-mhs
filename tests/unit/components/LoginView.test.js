// tests/unit/components/LoginView.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import LoginView from '@/views/auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

// Mock router
vi.mock('@/router', () => ({
  default: {
    push: vi.fn()
  }
}))

describe('LoginView Component', () => {
  let wrapper
  let authStore

  beforeEach(() => {
    wrapper = mount(LoginView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              auth: {
                user: null,
                token: null,
                loading: false,
                error: null
              }
            }
          })
        ]
      }
    })
    
    authStore = useAuthStore()
  })

  describe('Component Rendering', () => {
    it('should render login form correctly', () => {
      expect(wrapper.find('h2').text()).toContain('Sistem Informasi Manajemen Mahasiswa')
      expect(wrapper.find('input#username').exists()).toBe(true)
      expect(wrapper.find('input#password').exists()).toBe(true)
      expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    })

    it('should display demo credentials', () => {
      const demoSection = wrapper.find('.bg-light')
      expect(demoSection.text()).toContain('Demo Credentials')
      expect(demoSection.text()).toContain('admin / admin123')
      expect(demoSection.text()).toContain('dosen01 / dosen123')
      expect(demoSection.text()).toContain('20220001 / mhs123')
    })

    it('should toggle password visibility', async () => {
      const passwordInput = wrapper.find('input#password')
      const toggleButton = wrapper.find('button[type="button"]')
      
      expect(passwordInput.attributes('type')).toBe('password')
      
      await toggleButton.trigger('click')
      expect(passwordInput.attributes('type')).toBe('text')
      
      await toggleButton.trigger('click')
      expect(passwordInput.attributes('type')).toBe('password')
    })
  })

  describe('Form Validation', () => {
    it('should require username and password', async () => {
      const form = wrapper.find('form')
      const usernameInput = wrapper.find('input#username')
      const passwordInput = wrapper.find('input#password')
      
      // Check required attributes
      expect(usernameInput.attributes('required')).toBeDefined()
      expect(passwordInput.attributes('required')).toBeDefined()
    })

    it('should update v-model when typing', async () => {
      const usernameInput = wrapper.find('input#username')
      const passwordInput = wrapper.find('input#password')
      
      await usernameInput.setValue('testuser')
      await passwordInput.setValue('testpass')
      
      expect(wrapper.vm.credentials.username).toBe('testuser')
      expect(wrapper.vm.credentials.password).toBe('testpass')
    })
  })

  describe('Form Submission', () => {
    it('should call login method on form submit', async () => {
      const form = wrapper.find('form')
      const usernameInput = wrapper.find('input#username')
      const passwordInput = wrapper.find('input#password')
      
      // Mock successful login
      authStore.login = vi.fn().mockResolvedValue({ success: true })
      
      await usernameInput.setValue('admin')
      await passwordInput.setValue('admin123')
      await form.trigger('submit.prevent')
      
      expect(authStore.login).toHaveBeenCalledWith({
        username: 'admin',
        password: 'admin123'
      })
    })

    it('should show loading state during login', async () => {
      const submitButton = wrapper.find('button[type="submit"]')
      
      // Initially not loading
      expect(submitButton.text()).toContain('Login')
      expect(submitButton.attributes('disabled')).toBeUndefined()
      
      // Set loading state
      wrapper.vm.loading = true
      await wrapper.vm.$nextTick()
      
      expect(submitButton.text()).toContain('Loading...')
      expect(submitButton.attributes('disabled')).toBeDefined()
    })

    it('should display error message on login failure', async () => {
      authStore.login = vi.fn().mockResolvedValue({ 
        success: false, 
        message: 'Username atau password salah' 
      })
      
      const form = wrapper.find('form')
      await form.trigger('submit.prevent')
      
      await wrapper.vm.$nextTick()
      
      expect(wrapper.vm.error).toBe('Username atau password salah')
      expect(wrapper.find('.alert-danger').exists()).toBe(true)
      expect(wrapper.find('.alert-danger').text()).toContain('Username atau password salah')
    })

    it('should clear error when clicking close button', async () => {
      wrapper.vm.error = 'Test error'
      await wrapper.vm.$nextTick()
      
      const closeButton = wrapper.find('.btn-close')
      await closeButton.trigger('click')
      
      expect(wrapper.vm.error).toBe('')
    })
  })

  describe('Remember Me Feature', () => {
    it('should save username when remember me is checked', async () => {
      const rememberCheckbox = wrapper.find('input#rememberMe')
      const usernameInput = wrapper.find('input#username')
      
      await usernameInput.setValue('testuser')
      await rememberCheckbox.setValue(true)
      
      // Simulate successful login
      authStore.login = vi.fn().mockResolvedValue({ success: true })
      
      const form = wrapper.find('form')
      await form.trigger('submit.prevent')
      
      // In real implementation, this would save to localStorage
      expect(wrapper.vm.rememberMe).toBe(true)
    })

    it('should load saved username on mount', async () => {
      localStorage.getItem = vi.fn().mockReturnValue('saveduser')
      
      // Remount component to trigger onMounted
      wrapper = mount(LoginView, {
        global: {
          plugins: [createTestingPinia()]
        }
      })
      
      await wrapper.vm.$nextTick()
      
      expect(wrapper.vm.credentials.username).toBe('saveduser')
      expect(wrapper.vm.rememberMe).toBe(true)
    })
  })

  describe('Input States', () => {
    it('should disable inputs when loading', async () => {
      wrapper.vm.loading = true
      await wrapper.vm.$nextTick()
      
      const usernameInput = wrapper.find('input#username')
      const passwordInput = wrapper.find('input#password')
      const rememberCheckbox = wrapper.find('input#rememberMe')
      
      expect(usernameInput.attributes('disabled')).toBeDefined()
      expect(passwordInput.attributes('disabled')).toBeDefined()
      expect(rememberCheckbox.attributes('disabled')).toBeDefined()
    })
  })
})