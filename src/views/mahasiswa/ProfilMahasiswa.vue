<!-- src/views/mahasiswa/ProfilMahasiswa.vue -->
<template>
  <div class="profil-mahasiswa">
    <!-- Page Header -->
    <div class="mb-4">
      <h1 class="h3 mb-0">Profil Saya</h1>
      <p class="text-muted">Informasi pribadi dan akademik</p>
    </div>

    <!-- Profile Content -->
    <div class="row">
      <!-- Profile Card -->
      <div class="col-md-4">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body text-center">
            <div class="avatar-large mx-auto mb-3">
              <i class="bi bi-person-circle" style="font-size: 5rem; color: #17a2b8;"></i>
            </div>
            <h5 class="mb-1">{{ mahasiswaData?.nama || user?.nama || '-' }}</h5>
            <p class="text-muted mb-2">{{ mahasiswaData?.nim || '-' }}</p>
            <span class="badge bg-info">Mahasiswa</span>
            
            <hr>
            
            <div class="text-start">
              <div class="mb-2">
                <small class="text-muted d-block">Program Studi</small>
                <strong>{{ mahasiswaData?.jurusan || '-' }}</strong>
              </div>
              <div class="mb-2">
                <small class="text-muted d-block">Angkatan</small>
                <strong>{{ mahasiswaData?.angkatan || '-' }}</strong>
              </div>
              <div class="mb-2">
                <small class="text-muted d-block">IPK</small>
                <strong class="text-primary">{{ mahasiswaData?.ipk || '0.00' }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Information -->
      <div class="col-md-8">
        <!-- Personal Information -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              <i class="bi bi-person me-2"></i>
              Informasi Pribadi
            </h5>
            <button 
              v-if="!editMode" 
              class="btn btn-sm btn-outline-primary"
              @click="toggleEditMode"
            >
              <i class="bi bi-pencil me-1"></i>
              Edit
            </button>
          </div>
          <div class="card-body">
            <!-- View Mode -->
            <div v-if="!editMode" class="row g-3">
              <div class="col-md-6">
                <label class="text-muted small">Nama Lengkap</label>
                <p class="mb-3">{{ mahasiswaData?.nama || '-' }}</p>
              </div>
              <div class="col-md-6">
                <label class="text-muted small">NIM</label>
                <p class="mb-3">{{ mahasiswaData?.nim || '-' }}</p>
              </div>
              <div class="col-md-6">
                <label class="text-muted small">Email</label>
                <p class="mb-3">{{ mahasiswaData?.email || '-' }}</p>
              </div>
              <div class="col-md-6">
                <label class="text-muted small">No. Telepon</label>
                <p class="mb-3">{{ mahasiswaData?.telepon || '-' }}</p>
              </div>
              <div class="col-md-6">
                <label class="text-muted small">Jenis Kelamin</label>
                <p class="mb-3">{{ mahasiswaData?.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</p>
              </div>
              <div class="col-md-6">
                <label class="text-muted small">Tanggal Lahir</label>
                <p class="mb-3">{{ formatDate(mahasiswaData?.tanggalLahir) }}</p>
              </div>
              <div class="col-12">
                <label class="text-muted small">Alamat</label>
                <p class="mb-0">{{ mahasiswaData?.alamat || '-' }}</p>
              </div>
            </div>

            <!-- Edit Mode -->
            <form v-else @submit.prevent="updateProfile">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Nama Lengkap</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    v-model="editForm.nama"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">NIM</label>
                  <input 
                    type="text" 
                    class="form-control" 
                    :value="mahasiswaData?.nim"
                    disabled
                  >
                  <small class="text-muted">NIM tidak dapat diubah</small>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    v-model="editForm.email"
                    required
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">No. Telepon</label>
                  <input 
                    type="tel" 
                    class="form-control" 
                    v-model="editForm.telepon"
                    placeholder="08xxxxxxxxxx"
                  >
                </div>
                <div class="col-md-6">
                  <label class="form-label">Jenis Kelamin</label>
                  <select 
                    class="form-select" 
                    v-model="editForm.jenisKelamin"
                    required
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Tanggal Lahir</label>
                  <input 
                    type="date" 
                    class="form-control" 
                    v-model="editForm.tanggalLahir"
                    required
                  >
                </div>
                <div class="col-12">
                  <label class="form-label">Alamat</label>
                  <textarea 
                    class="form-control" 
                    v-model="editForm.alamat"
                    rows="3"
                    placeholder="Masukkan alamat lengkap"
                  ></textarea>
                </div>
                <div class="col-12">
                  <div class="d-flex gap-2">
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
                    <button 
                      type="button" 
                      class="btn btn-light"
                      @click="cancelEdit"
                      :disabled="saving"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Academic Information -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-white">
            <h5 class="mb-0">
              <i class="bi bi-mortarboard me-2"></i>
              Informasi Akademik
            </h5>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="text-muted small">Program Studi</label>
                <p class="mb-3">{{ mahasiswaData?.jurusan || '-' }}</p>
              </div>
              <div class="col-md-6">
                <label class="text-muted small">Angkatan</label>
                <p class="mb-3">{{ mahasiswaData?.angkatan || '-' }}</p>
              </div>
              <div class="col-md-6">
                <label class="text-muted small">Status</label>
                <p class="mb-3">
                  <span class="badge" :class="{
                    'bg-success': mahasiswaData?.status === 'Aktif',
                    'bg-warning': mahasiswaData?.status === 'Non-Aktif',
                    'bg-info': mahasiswaData?.status === 'Lulus'
                  }">{{ mahasiswaData?.status || '-' }}</span>
                </p>
              </div>
              <div class="col-md-6">
                <label class="text-muted small">IPK</label>
                <p class="mb-3">
                  <strong class="text-primary">{{ mahasiswaData?.ipk || '0.00' }}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Change Password -->
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">
              <i class="bi bi-key me-2"></i>
              Ubah Password
            </h5>
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
                  <small class="text-muted">Minimal 6 karakter</small>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Konfirmasi Password</label>
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

        <!-- Info -->
        <div class="alert alert-info mt-3">
          <i class="bi bi-info-circle me-2"></i>
          <strong>Catatan:</strong> Untuk perubahan data akademik (Jurusan, Angkatan, Status), silakan hubungi admin program studi.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useMahasiswaStore } from '@/stores/mahasiswa'
import authService from '@/services/authService'
import mahasiswaService from '@/services/mahasiswaService'

const authStore = useAuthStore()
const mahasiswaStore = useMahasiswaStore()

// Data
const mahasiswaData = ref(null)
const user = computed(() => authStore.user)
const editMode = ref(false)

// Edit form
const editForm = reactive({
  nama: '',
  email: '',
  telepon: '',
  jenisKelamin: '',
  tanggalLahir: '',
  alamat: ''
})

// Password form
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Loading states
const saving = ref(false)
const changingPassword = ref(false)

// Methods
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const loadMahasiswaData = async () => {
  try {
    if (user.value?.nim) {
      const result = await mahasiswaService.getByNIM(user.value.nim)
      if (result.success) {
        mahasiswaData.value = result.data
        // Initialize edit form
        initializeEditForm()
      }
    }
  } catch (error) {
    console.error('Error loading mahasiswa data:', error)
  }
}

const initializeEditForm = () => {
  if (mahasiswaData.value) {
    editForm.nama = mahasiswaData.value.nama || ''
    editForm.email = mahasiswaData.value.email || ''
    editForm.telepon = mahasiswaData.value.telepon || ''
    editForm.jenisKelamin = mahasiswaData.value.jenisKelamin || 'L'
    editForm.tanggalLahir = mahasiswaData.value.tanggalLahir ? 
      mahasiswaData.value.tanggalLahir.split('T')[0] : ''
    editForm.alamat = mahasiswaData.value.alamat || ''
  }
}

const toggleEditMode = () => {
  editMode.value = true
  initializeEditForm()
}

const cancelEdit = () => {
  editMode.value = false
  initializeEditForm()
}

const updateProfile = async () => {
  saving.value = true
  
  try {
    // Update mahasiswa data
    const updatedData = {
      ...mahasiswaData.value,
      ...editForm
    }
    
    const result = await mahasiswaStore.updateMahasiswa(mahasiswaData.value.id, updatedData)
    
    if (result.success) {
      // Also update user data in auth store
      await authStore.updateProfile({
        nama: editForm.nama,
        email: editForm.email
      })
      
      // Reload data
      await loadMahasiswaData()
      editMode.value = false
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

// Lifecycle
onMounted(() => {
  loadMahasiswaData()
})
</script>

<style scoped>
.avatar-large {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-header {
  background-color: #f8f9fa !important;
}

label.text-muted {
  font-size: 0.875rem;
  font-weight: 500;
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}

.btn-outline-primary {
  font-size: 0.875rem;
  padding: 0.25rem 0.75rem;
}
</style>