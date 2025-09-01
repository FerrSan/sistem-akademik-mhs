<!-- src/views/admin/ProfilAdmin.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-3">👤 Profil Admin</h1>
          <p class="text-xl text-gray-600">Kelola informasi profil Anda</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Card -->
        <div class="lg:col-span-1">
          <div class="card-modern text-center animate-fade-in-up">
            <div class="p-8">
              <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ user?.nama || 'Administrator' }}</h3>
              <p class="text-gray-600 mb-4">{{ user?.email || '-' }}</p>
              <span class="inline-flex px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                Administrator
              </span>
            </div>
          </div>
        </div>

        <!-- Forms -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Profile Form -->
          <div class="card-modern animate-fade-in-up">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">📝 Informasi Dasar</h3>
              <form @submit.prevent="updateProfile" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input 
                      type="text" 
                      class="input-modern bg-gray-50" 
                      :value="user?.username"
                      disabled
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      class="input-modern" 
                      v-model="profileForm.nama"
                      required
                      placeholder="Masukkan nama lengkap"
                    >
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    class="input-modern" 
                    v-model="profileForm.email"
                    required
                    placeholder="Masukkan email"
                  >
                </div>
                <div class="flex justify-end">
                  <button type="submit" class="btn-modern btn-gradient-primary" :disabled="saving">
                    <span v-if="saving" class="flex items-center">
                      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Menyimpan...
                    </span>
                    <span v-else class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      Simpan Perubahan
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Change Password -->
          <div class="card-modern animate-fade-in-up">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6">🔒 Ubah Password</h3>
              <form @submit.prevent="changePassword" class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Password Lama</label>
                  <input 
                    type="password" 
                    class="input-modern" 
                    v-model="passwordForm.oldPassword"
                    required
                    placeholder="Masukkan password lama"
                  >
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                    <input 
                      type="password" 
                      class="input-modern" 
                      v-model="passwordForm.newPassword"
                      required
                      placeholder="Masukkan password baru"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password Baru</label>
                    <input 
                      type="password" 
                      class="input-modern" 
                      v-model="passwordForm.confirmPassword"
                      required
                      placeholder="Konfirmasi password baru"
                    >
                  </div>
                </div>
                <div class="flex justify-end">
                  <button type="submit" class="btn-modern btn-gradient-warning" :disabled="changingPassword">
                    <span v-if="changingPassword" class="flex items-center">
                      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Mengubah...
                    </span>
                    <span v-else class="flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m-2-2l-2-2m2 2l-2 2m0 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6a2 2 0 012-2m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v.5M15 7H9"/>
                      </svg>
                      Ubah Password
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import authService from '@/services/authService'

const authStore = useAuthStore()

// User data
const user = computed(() => authStore.user)

// Forms
const profileForm = reactive({
  nama: '',
  email: ''
})

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Loading states
const saving = ref(false)
const changingPassword = ref(false)

// Initialize form
onMounted(() => {
  if (user.value) {
    profileForm.nama = user.value.nama || ''
    profileForm.email = user.value.email || ''
  }
})

// Update profile
const updateProfile = async () => {
  saving.value = true
  
  try {
    const result = await authStore.updateProfile({
      nama: profileForm.nama,
      email: profileForm.email
    })
    
    if (result.success) {
      alert('Profil berhasil diperbarui')
    } else {
      alert(result.message)
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Terjadi kesalahan saat memperbarui profil')
  } finally {
    saving.value = false
  }
}

// Change password
const changePassword = async () => {
  // Validate passwords
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert('Password baru dan konfirmasi tidak sama')
    return
  }
  
  if (passwordForm.newPassword.length < 6) {
    alert('Password baru minimal 6 karakter')
    return
  }
  
  changingPassword.value = true
  
  try {
    const result = await authService.changePassword(
      user.value.id,
      passwordForm.oldPassword,
      passwordForm.newPassword
    )
    
    if (result.success) {
      alert('Password berhasil diubah')
      // Reset form
      passwordForm.oldPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    } else {
      alert(result.message)
    }
  } catch (error) {
    console.error('Error changing password:', error)
    alert('Terjadi kesalahan saat mengubah password')
  } finally {
    changingPassword.value = false
  }
}
</script>

