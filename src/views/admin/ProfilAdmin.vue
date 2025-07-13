<!-- src/views/admin/ProfilAdmin.vue -->
<template>
  <div class="profil-admin">
    <div class="mb-4">
      <h1 class="h3 mb-0">Profil Admin</h1>
      <p class="text-muted">Kelola informasi profil Anda</p>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body text-center">
            <div class="avatar-large mx-auto mb-3">
              <i class="bi bi-person-circle" style="font-size: 5rem; color: #667eea;"></i>
            </div>
            <h5 class="mb-1">{{ user?.nama || 'Administrator' }}</h5>
            <p class="text-muted mb-3">{{ user?.email || '-' }}</p>
            <span class="badge bg-primary">Administrator</span>
          </div>
        </div>
      </div>

      <!-- Profile Form -->
      <div class="col-md-8">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-white">
            <h5 class="mb-0">Informasi Dasar</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProfile">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Username</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    :value="user?.username"
                    disabled
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Nama Lengkap</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="profileForm.nama"
                    required
                  >
                </div>
                <div class="col-12">
                  <label class="form-label">Email</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    v-model="profileForm.email"
                    required
                  >
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary" :disabled="saving">
                    <span v-if="saving">
                      <span class="spinner-border spinner-border-sm me-2"></span>
                      Menyimpan...
                    </span>
                    <span v-else>
                      <i class="bi bi-check-circle me-2"></i>
                      Simpan Perubahan
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Change Password -->
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">Ubah Password</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="changePassword">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">Password Lama</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    v-model="passwordForm.oldPassword"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Password Baru</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    v-model="passwordForm.newPassword"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Konfirmasi Password Baru</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    v-model="passwordForm.confirmPassword"
                    required
                  >
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-warning" :disabled="changingPassword">
                    <span v-if="changingPassword">
                      <span class="spinner-border spinner-border-sm me-2"></span>
                      Mengubah...
                    </span>
                    <span v-else>
                      <i class="bi bi-key me-2"></i>
                      Ubah Password
                    </span>
                  </button>
                </div>
              </div>
            </form>
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

<style scoped>
.avatar-large {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>