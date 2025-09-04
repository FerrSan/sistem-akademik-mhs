<!-- src/views/auth/LoginView.vue -->
<template>
  <div class="card-modern max-w-md mx-4 animate-fade-in-up">
    <div class="p-8">
      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Alert for errors -->
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl relative" role="alert">
          <div class="flex items-center justify-between">
            <span class="text-sm">{{ error }}</span>
            <button 
              type="button" 
              class="text-red-400 hover:text-red-600"
              @click="clearError"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Username -->
        <div>
          <label for="username" class="block text-sm font-semibold text-gray-700 mb-3">Username</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
              </svg>
            </div>
            <input
              type="text"
              class="input-modern pl-12"
              id="username"
              v-model="credentials.username"
              placeholder="Masukkan username"
              required
              :disabled="loading"
            >
          </div>
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-3">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <input
              :type="showPassword ? 'text' : 'password'"
              class="input-modern pl-12 pr-12"
              id="password"
              v-model="credentials.password"
              placeholder="Masukkan password"
              required
              :disabled="loading"
            >
            <button 
              class="absolute inset-y-0 right-0 pr-4 flex items-center" 
              type="button"
              @click="showPassword = !showPassword"
              :disabled="loading"
            >
              <svg v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
              <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L17.121 17.121"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Remember me -->
        <div class="flex items-center">
          <input 
            type="checkbox" 
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
            id="rememberMe"
            v-model="rememberMe"
            :disabled="loading"
          >
          <label class="ml-2 block text-sm text-gray-900" for="rememberMe">
            Ingat saya
          </label>
        </div>

        <!-- Submit button -->
        <button 
          type="submit" 
          class="btn-modern btn-gradient-primary w-full"
          :disabled="loading"
        >
          <span v-if="loading" class="flex items-center justify-center">
            <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Loading...
          </span>
          <span v-else class="flex items-center justify-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
            </svg>
            Login
          </span>
        </button>
      </form>

      Demo credentials
      <div class="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <h3 class="text-center text-sm font-semibold text-gray-800 mb-4">🔑 Demo Credentials</h3>
        <div class="grid grid-cols-3 gap-4 text-center text-xs">
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <p class="font-semibold text-blue-600">Admin</p>
            <p class="text-gray-600 mt-1">admin</p>
            <p class="text-gray-600">admin123</p>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <p class="font-semibold text-green-600">Dosen</p>
            <p class="text-gray-600 mt-1">dosen01</p>
            <p class="text-gray-600">dosen123</p>
          </div>
          <div class="bg-white p-3 rounded-lg shadow-sm">
            <p class="font-semibold text-purple-600">Mahasiswa</p>
            <p class="text-gray-600 mt-1">20220001</p>
            <p class="text-gray-600">mhs123</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// Form data
const credentials = ref({
  username: '',
  password: ''
})
const rememberMe = ref(false)
const showPassword = ref(false)

// Loading and error states
const loading = ref(false)
const error = ref('')

// Clear error message
const clearError = () => {
  error.value = ''
  authStore.clearError()
}

// Handle login
const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const result = await authStore.login(credentials.value)
    
    if (!result.success) {
      error.value = result.message || 'Login gagal. Silakan coba lagi.'
    }
    // If success, router will handle redirect based on role
  } catch (err) {
    error.value = 'Terjadi kesalahan. Silakan coba lagi.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}

// Check for saved credentials on mount
onMounted(() => {
  const savedUsername = localStorage.getItem('savedUsername')
  if (savedUsername) {
    credentials.value.username = savedUsername
    rememberMe.value = true
  }
})

</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.btn-primary {
  background-color: #667eea;
  border-color: #667eea;
}

.btn-primary:hover {
  background-color: #5a67d8;
  border-color: #5a67d8;
}

.btn-primary:disabled {
  background-color: #a0aec0;
  border-color: #a0aec0;
}
</style>
