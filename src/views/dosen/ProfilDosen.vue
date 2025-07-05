<!-- src/views/dosen/ProfilDosen.vue -->
<template>
  <div class="profil-dosen">
    <div class="mb-4">
      <h1 class="h3 mb-0">Profil Dosen</h1>
      <p class="text-muted">Kelola informasi profil Anda</p>
    </div>

    <div class="row">
      <!-- Info Card -->
      <div class="col-md-4">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body text-center">
            <div class="avatar-large mx-auto mb-3">
              <i class="bi bi-person-badge" style="font-size: 5rem; color: #20c997;"></i>
            </div>
            <h5 class="mb-1">{{ user?.nama || 'Dosen' }}</h5>
            <p class="text-muted mb-3">{{ user?.email || '-' }}</p>
            <span class="badge bg-success">Dosen</span>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="col-md-8">
        <!-- Basic Info -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-white">
            <h5 class="mb-0">Informasi Dasar</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="updateProfile">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">NIDN</label>
                  <input type="text" class="form-control" :value="user?.nidn" disabled>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Nama Lengkap</label>
                  <input type="text" class="form-control" v-model="profileForm.nama" required>
                </div>
                <div class="col-12">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="profileForm.email" required>
                </div>
                <div class="col-12">
                  <button class="btn btn-success" type="submit" :disabled="saving">
                    <span v-if="saving"><span class="spinner-border spinner-border-sm me-2"></span>Menyimpan...</span>
                    <span v-else><i class="bi bi-check-circle me-2"></i>Simpan Perubahan</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Ubah Password -->
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">Ubah Password</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="changePassword">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">Password Lama</label>
                  <input type="password" class="form-control" v-model="passwordForm.oldPassword" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Password Baru</label>
                  <input type="password" class="form-control" v-model="passwordForm.newPassword" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Konfirmasi Password Baru</label>
                  <input type="password" class="form-control" v-model="passwordForm.confirmPassword" required>
                </div>
                <div class="col-12">
                  <button class="btn btn-warning" type="submit" :disabled="changingPassword">
                    <span v-if="changingPassword"><span class="spinner-border spinner-border-sm me-2"></span>Mengubah...</span>
                    <span v-else><i class="bi bi-key me-2"></i>Ubah Password</span>
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
const user = computed(() => authStore.user)

const profileForm = reactive({ nama: '', email: '' })
const passwordForm = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })

const saving = ref(false)
const changingPassword = ref(false)

onMounted(() => {
  if (user.value) {
    profileForm.nama = user.value.nama || ''
    profileForm.email = user.value.email || ''
  }
})

const updateProfile = async () => {
  saving.value = true
  try {
    const result = await authStore.updateProfile(profileForm)
    alert(result.success ? 'Profil diperbarui' : result.message)
  } catch (err) {
    alert('Gagal menyimpan')
  } finally {
    saving.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) return alert('Konfirmasi tidak cocok')
  if (passwordForm.newPassword.length < 6) return alert('Password terlalu pendek')

  changingPassword.value = true
  try {
    const result = await authService.changePassword(user.value.id, passwordForm.oldPassword, passwordForm.newPassword)
    alert(result.success ? 'Password diubah' : result.message)
    Object.keys(passwordForm).forEach(k => passwordForm[k] = '')
  } catch {
    alert('Gagal ubah password')
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
