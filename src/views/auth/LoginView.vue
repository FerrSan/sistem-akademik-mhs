<!-- src/views/auth/LoginView.vue -->
<template>
  <div class="login-container">
    <div class="login-card">
      <div class="text-center mb-4">
        <i class="bi bi-mortarboard-fill text-primary" style="font-size: 3rem;"></i>
        <h2 class="mt-3">Sistem Informasi Manajemen Mahasiswa</h2>
        <p class="text-muted">Silakan login untuk melanjutkan</p>
      </div>

      <form @submit.prevent="handleLogin">
        <!-- Alert for errors -->
        <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
          {{ error }}
          <button 
            type="button" 
            class="btn-close" 
            @click="clearError"
          ></button>
        </div>

        <!-- Username -->
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-person"></i>
            </span>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="credentials.username"
              placeholder="Masukkan username"
              required
              :disabled="loading"
            >
          </div>
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-lock"></i>
            </span>
            <input
              :type="showPassword ? 'text' : 'password'"
              class="form-control"
              id="password"
              v-model="credentials.password"
              placeholder="Masukkan password"
              required
              :disabled="loading"
            >
            <button 
              class="btn btn-outline-secondary" 
              type="button"
              @click="showPassword = !showPassword"
              :disabled="loading"
            >
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
        </div>

        <!-- Remember me -->
        <div class="mb-3 form-check">
          <input 
            type="checkbox" 
            class="form-check-input" 
            id="rememberMe"
            v-model="rememberMe"
            :disabled="loading"
          >
          <label class="form-check-label" for="rememberMe">
            Ingat saya
          </label>
        </div>

        <!-- Submit button -->
        <button 
          type="submit" 
          class="btn btn-primary w-100"
          :disabled="loading"
        >
          <span v-if="loading">
            <span class="spinner-border spinner-border-sm me-2" role="status"></span>
            Loading...
          </span>
          <span v-else>
            <i class="bi bi-box-arrow-in-right me-2"></i>
            Login
          </span>
        </button>
      </form>

      <!-- Demo credentials -->
      <div class="mt-4 p-3 bg-light rounded">
        <h6 class="text-center mb-3">Demo Credentials</h6>
        <div class="row text-center small">
          <div class="col-4">
            <strong>Admin</strong><br>
            admin / admin123
          </div>
          <div class="col-4">
            <strong>Dosen</strong><br>
            dosen01 / dosen123
          </div>
          <div class="col-4">
            <strong>Mahasiswa</strong><br>
            20220001 / mhs123
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
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

// Save username if remember me is checked
const saveUsername = () => {
  if (rememberMe.value) {
    localStorage.setItem('savedUsername', credentials.value.username)
  } else {
    localStorage.removeItem('savedUsername')
  }
}
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