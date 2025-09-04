<!-- src/views/admin/MahasiswaEdit.vue -->
<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Edit Data Mahasiswa</h1>
      <router-link to="/admin/mahasiswa" class="inline-flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        Kembali
      </router-link>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- Form Card -->
    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-4 sm:p-6 lg:p-8">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Personal Information Section -->
          <div>
            <h3 class="text-lg font-semibold text-blue-600 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Informasi Pribadi
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label for="nim" class="block text-sm font-medium text-gray-700 mb-2">
                  NIM <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nim"
                  v-model="formData.nim"
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                    errors.nim ? 'border-red-500' : 'border-gray-300'
                  ]"
                  required
                  placeholder="Contoh: 20220001"
                >
                <div v-if="errors.nim" class="mt-1 text-sm text-red-500">
                  {{ errors.nim }}
                </div>
              </div>
              
              <div>
                <label for="nama" class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nama"
                  v-model="formData.nama"
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                    errors.nama ? 'border-red-500' : 'border-gray-300'
                  ]"
                  required
                  placeholder="Masukkan nama lengkap"
                >
                <div v-if="errors.nama" class="mt-1 text-sm text-red-500">
                  {{ errors.nama }}
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  ]"
                  required
                  placeholder="nama@student.university.ac.id"
                >
                <div v-if="errors.email" class="mt-1 text-sm text-red-500">
                  {{ errors.email }}
                </div>
              </div>

              <div>
                <label for="telepon" class="block text-sm font-medium text-gray-700 mb-2">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  id="telepon"
                  v-model="formData.telepon"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="08xxxxxxxxxx"
                >
              </div>

              <div>
                <label for="tanggalLahir" class="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Lahir <span class="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="tanggalLahir"
                  v-model="formData.tanggalLahir"
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                    errors.tanggalLahir ? 'border-red-500' : 'border-gray-300'
                  ]"
                  required
                >
                <div v-if="errors.tanggalLahir" class="mt-1 text-sm text-red-500">
                  {{ errors.tanggalLahir }}
                </div>
              </div>

              <div>
                <label for="jenisKelamin" class="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Kelamin <span class="text-red-500">*</span>
                </label>
                <select
                  id="jenisKelamin"
                  v-model="formData.jenisKelamin"
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                    errors.jenisKelamin ? 'border-red-500' : 'border-gray-300'
                  ]"
                  required
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
                <div v-if="errors.jenisKelamin" class="mt-1 text-sm text-red-500">
                  {{ errors.jenisKelamin }}
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="alamat" class="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Lengkap
                </label>
                <textarea
                  id="alamat"
                  v-model="formData.alamat"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Masukkan alamat lengkap"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Academic Information Section -->
          <div>
            <h3 class="text-lg font-semibold text-blue-600 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              Informasi Akademik
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <label for="jurusan" class="block text-sm font-medium text-gray-700 mb-2">
                  Jurusan <span class="text-red-500">*</span>
                </label>
                <select
                  id="jurusan"
                  v-model="formData.jurusan"
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                    errors.jurusan ? 'border-red-500' : 'border-gray-300'
                  ]"
                  required
                >
                  <option value="">Pilih Jurusan</option>
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                </select>
                <div v-if="errors.jurusan" class="mt-1 text-sm text-red-500">
                  {{ errors.jurusan }}
                </div>
              </div>

              <div>
                <label for="angkatan" class="block text-sm font-medium text-gray-700 mb-2">
                  Angkatan <span class="text-red-500">*</span>
                </label>
                <select
                  id="angkatan"
                  v-model="formData.angkatan"
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                    errors.angkatan ? 'border-red-500' : 'border-gray-300'
                  ]"
                  required
                >
                  <option value="">Pilih Angkatan</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
                <div v-if="errors.angkatan" class="mt-1 text-sm text-red-500">
                  {{ errors.angkatan }}
                </div>
              </div>

              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                  Status <span class="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  v-model="formData.status"
                  :class="[
                    'w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200',
                    errors.status ? 'border-red-500' : 'border-gray-300'
                  ]"
                  required
                >
                  <option value="">Pilih Status</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                  <option value="Lulus">Lulus</option>
                </select>
                <div v-if="errors.status" class="mt-1 text-sm text-red-500">
                  {{ errors.status }}
                </div>
              </div>

              <div>
                <label for="ipk" class="block text-sm font-medium text-gray-700 mb-2">
                  IPK
                </label>
                <input
                  type="number"
                  id="ipk"
                  v-model.number="formData.ipk"
                  min="0"
                  max="4"
                  step="0.01"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="0.00"
                >
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-gray-200 gap-4">
            <div class="text-sm text-gray-600 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Terakhir diperbarui: {{ lastUpdated }}
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <router-link 
                to="/admin/mahasiswa" 
                class="inline-flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Batal
              </router-link>
              <button 
                type="submit" 
                :disabled="loading || saving"
                class="inline-flex items-center justify-center px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors duration-200"
              >
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
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMahasiswaStore } from '@/stores/mahasiswa'

const router = useRouter()
const route = useRoute()
const mahasiswaStore = useMahasiswaStore()

// Form data
const formData = reactive({
  nim: '',
  nama: '',
  email: '',
  telepon: '',
  tanggalLahir: '',
  jenisKelamin: '',
  alamat: '',
  jurusan: '',
  angkatan: '',
  status: '',
  ipk: 0
})

// Form state
const loading = ref(true)
const saving = ref(false)
const errors = reactive({})
const originalData = ref(null)

// Computed
const lastUpdated = computed(() => {
  if (!originalData.value?.updatedAt) return '-'
  return new Date(originalData.value.updatedAt).toLocaleString('id-ID')
})

// Form validation
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])
  
  let isValid = true
  
  // NIM validation
  if (!formData.nim) {
    errors.nim = 'NIM wajib diisi'
    isValid = false
  } else if (!/^\d{8}$/.test(formData.nim)) {
    errors.nim = 'NIM harus 8 digit angka'
    isValid = false
  }
  
  // Nama validation
  if (!formData.nama) {
    errors.nama = 'Nama wajib diisi'
    isValid = false
  } else if (formData.nama.length < 3) {
    errors.nama = 'Nama minimal 3 karakter'
    isValid = false
  }
  
  // Email validation
  if (!formData.email) {
    errors.email = 'Email wajib diisi'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Format email tidak valid'
    isValid = false
  }
  
  // Tanggal lahir validation
  if (!formData.tanggalLahir) {
    errors.tanggalLahir = 'Tanggal lahir wajib diisi'
    isValid = false
  }
  
  // Other validations
  if (!formData.jenisKelamin) {
    errors.jenisKelamin = 'Jenis kelamin wajib dipilih'
    isValid = false
  }
  
  if (!formData.jurusan) {
    errors.jurusan = 'Jurusan wajib dipilih'
    isValid = false
  }
  
  if (!formData.angkatan) {
    errors.angkatan = 'Angkatan wajib dipilih'
    isValid = false
  }
  
  if (!formData.status) {
    errors.status = 'Status wajib dipilih'
    isValid = false
  }
  
  return isValid
}

// Load mahasiswa data
const loadMahasiswa = async () => {
  loading.value = true
  
  try {
    const id = route.params.id
    const mahasiswa = await mahasiswaStore.fetchMahasiswaById(id)
    
    if (mahasiswa) {
      // Populate form with existing data
      Object.keys(formData).forEach(key => {
        if (mahasiswa[key] !== undefined) {
          formData[key] = mahasiswa[key]
        }
      })
      
      // Format date for input
      if (mahasiswa.tanggalLahir) {
        formData.tanggalLahir = mahasiswa.tanggalLahir.split('T')[0]
      }
      
      // Store original data
      originalData.value = { ...mahasiswa }
    } else {
      alert('Mahasiswa tidak ditemukan')
      router.push('/admin/mahasiswa')
    }
  } catch (error) {
    console.error('Error loading mahasiswa:', error)
    alert('Terjadi kesalahan saat memuat data')
    router.push('/admin/mahasiswa')
  } finally {
    loading.value = false
  }
}

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  saving.value = true
  
  try {
    const id = route.params.id
    const result = await mahasiswaStore.updateMahasiswa(id, formData)
    
    if (result.success) {
      alert(result.message)
      router.push('/admin/mahasiswa')
    } else {
      alert(result.message)
    }
  } catch (error) {
    console.error('Error updating mahasiswa:', error)
    alert('Terjadi kesalahan saat menyimpan data')
  } finally {
    saving.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadMahasiswa()
})
</script>

<style scoped>
.form-label {
  font-weight: 500;
}

.text-danger {
  font-size: 0.875rem;
}
</style>