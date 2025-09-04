<!-- src/views/mahasiswa/ProfilMahasiswa.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-3">🎓 Profil Saya</h1>
          <p class="text-xl text-gray-600">Informasi pribadi dan akademik</p>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Card -->
        <div class="lg:col-span-1">
          <div class="card-modern text-center animate-fade-in-up">
            <div class="p-8">
              <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ mahasiswaData?.nama || user?.nama || '-' }}</h3>
              <p class="text-gray-600 mb-4">{{ mahasiswaData?.nim || '-' }}</p>
              <span class="inline-flex px-4 py-2 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-6">
                Mahasiswa
              </span>
              
              <div class="border-t pt-6 space-y-4 text-left">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Program Studi</dt>
                  <dd class="text-sm font-semibold text-gray-900">{{ mahasiswaData?.jurusan || '-' }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Angkatan</dt>
                  <dd class="text-sm font-semibold text-gray-900">{{ mahasiswaData?.angkatan || '-' }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">IPK</dt>
                  <dd class="text-lg font-bold text-blue-600">{{ mahasiswaData?.ipk || '0.00' }}</dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Detail Information -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Information -->
          <div class="card-modern animate-fade-in-up">
            <div class="p-6">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  Informasi Pribadi
                </h3>
                <button 
                  v-if="!editMode" 
                  class="btn-modern btn-outline text-sm"
                  @click="toggleEditMode"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit
                </button>
              </div>
              <div>
                <!-- View Mode -->
                <div v-if="!editMode" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                    <dd class="text-sm text-gray-900 font-medium">{{ mahasiswaData?.nama || '-' }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">NIM</dt>
                    <dd class="text-sm text-gray-900 font-medium">{{ mahasiswaData?.nim || '-' }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Email</dt>
                    <dd class="text-sm text-gray-900 font-medium">{{ mahasiswaData?.email || '-' }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">No. Telepon</dt>
                    <dd class="text-sm text-gray-900 font-medium">{{ mahasiswaData?.telepon || '-' }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Jenis Kelamin</dt>
                    <dd class="text-sm text-gray-900 font-medium">{{ mahasiswaData?.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Tanggal Lahir</dt>
                    <dd class="text-sm text-gray-900 font-medium">{{ formatDate(mahasiswaData?.tanggalLahir) }}</dd>
                  </div>
                  <div class="md:col-span-2">
                    <dt class="text-sm font-medium text-gray-500">Alamat</dt>
                    <dd class="text-sm text-gray-900 font-medium">{{ mahasiswaData?.alamat || '-' }}</dd>
                  </div>
                </div>

                <!-- Edit Mode -->
                <form v-else @submit.prevent="updateProfile" class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                      <input 
                        type="text" 
                        class="input-modern" 
                        v-model="editForm.nama"
                        required
                        placeholder="Masukkan nama lengkap"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">NIM</label>
                      <input 
                        type="text" 
                        class="input-modern bg-gray-50" 
                        :value="mahasiswaData?.nim"
                        disabled
                      >
                      <p class="text-xs text-gray-500 mt-1">NIM tidak dapat diubah</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        type="email" 
                        class="input-modern" 
                        v-model="editForm.email"
                        required
                        placeholder="Masukkan email"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">No. Telepon</label>
                      <input 
                        type="tel" 
                        class="input-modern" 
                        v-model="editForm.telepon"
                        placeholder="08xxxxxxxxxx"
                      >
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Jenis Kelamin</label>
                      <select 
                        class="input-modern" 
                        v-model="editForm.jenisKelamin"
                        required
                      >
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir</label>
                      <input 
                        type="date" 
                        class="input-modern" 
                        v-model="editForm.tanggalLahir"
                        required
                      >
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                    <textarea 
                      class="input-modern" 
                      v-model="editForm.alamat"
                      rows="3"
                      placeholder="Masukkan alamat lengkap"
                    ></textarea>
                  </div>
                  <div class="flex space-x-3">
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
                    <button 
                      type="button" 
                      class="btn-modern btn-outline"
                      @click="cancelEdit"
                      :disabled="saving"
                    >
                      Batal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Academic Information -->
          <div class="card-modern animate-fade-in-up">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
                Informasi Akademik
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Program Studi</dt>
                  <dd class="text-sm font-semibold text-gray-900">{{ mahasiswaData?.jurusan || '-' }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Angkatan</dt>
                  <dd class="text-sm font-semibold text-gray-900">{{ mahasiswaData?.angkatan || '-' }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Status</dt>
                  <dd>
                    <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full" :class="{
                      'bg-green-100 text-green-800': mahasiswaData?.status === 'Aktif',
                      'bg-yellow-100 text-yellow-800': mahasiswaData?.status === 'Non-Aktif',
                      'bg-blue-100 text-blue-800': mahasiswaData?.status === 'Lulus'
                    }">{{ mahasiswaData?.status || '-' }}</span>
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">IPK</dt>
                  <dd class="text-lg font-bold text-blue-600">{{ mahasiswaData?.ipk || '0.00' }}</dd>
                </div>
              </div>
            </div>
          </div>

          <!-- Change Password -->
          <div class="card-modern animate-fade-in-up">
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m-2-2l-2-2m2 2l-2 2m0 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6a2 2 0 012-2m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v.5M15 7H9"/>
                </svg>
                Ubah Password
              </h3>
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
                    <p class="text-xs text-gray-500 mt-1">Minimal 6 karakter</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
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

          <!-- Info -->
          <div class="bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-xl animate-fade-in-up">
            <div class="flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <strong>Catatan:</strong> Untuk perubahan data akademik (Jurusan, Angkatan, Status), silakan hubungi admin program studi.
              </div>
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

