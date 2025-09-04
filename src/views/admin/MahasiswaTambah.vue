<!-- src/views/admin/MahasiswaTambah.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">✨ Tambah Mahasiswa Baru</h1>
            <p class="text-xl text-gray-600">Lengkapi data mahasiswa dengan informasi yang akurat</p>
          </div>
          <router-link to="/admin/mahasiswa" class="btn-modern bg-gray-100 text-gray-700 hover:bg-gray-200">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Kembali
          </router-link>
        </div>
      </div>

      <!-- Form Card -->
      <div class="card-modern animate-fade-in-up delay-100">
        <div class="p-8">
          <form @submit.prevent="handleSubmit">
            <!-- Personal Information Section -->
            <div class="mb-8">
              <div class="flex items-center mb-6">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">👤 Informasi Pribadi</h2>
                  <p class="text-gray-600 mt-1">Data personal mahasiswa</p>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="nim" class="block text-sm font-semibold text-gray-700 mb-3">NIM <span class="text-red-500">*</span></label>
                  <input
                    type="text"
                    class="input-modern"
                    :class="{ 'border-red-300 bg-red-50': errors.nim }"
                    id="nim"
                    v-model="formData.nim"
                    required
                    placeholder="Contoh: 20220001"
                  >
                  <div v-if="errors.nim" class="mt-2 text-sm text-red-600">
                    {{ errors.nim }}
                  </div>
                </div>
                
                <div>
                  <label for="nama" class="block text-sm font-semibold text-gray-700 mb-3">Nama Lengkap <span class="text-red-500">*</span></label>
                  <input
                    type="text"
                    class="input-modern"
                    :class="{ 'border-red-300 bg-red-50': errors.nama }"
                    id="nama"
                    v-model="formData.nama"
                    required
                    placeholder="Masukkan nama lengkap"
                  >
                  <div v-if="errors.nama" class="mt-2 text-sm text-red-600">
                    {{ errors.nama }}
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-semibold text-gray-700 mb-3">Email <span class="text-red-500">*</span></label>
                  <input
                    type="email"
                    class="input-modern"
                    :class="{ 'border-red-300 bg-red-50': errors.email }"
                    id="email"
                    v-model="formData.email"
                    required
                    placeholder="nama@student.university.ac.id"
                  >
                  <div v-if="errors.email" class="mt-2 text-sm text-red-600">
                    {{ errors.email }}
                  </div>
                </div>

                <div>
                  <label for="telepon" class="block text-sm font-semibold text-gray-700 mb-3">No. Telepon</label>
                  <input
                    type="tel"
                    class="input-modern"
                    id="telepon"
                    v-model="formData.telepon"
                    placeholder="08xxxxxxxxxx"
                  >
                </div>

                <div>
                  <label for="tanggalLahir" class="block text-sm font-semibold text-gray-700 mb-3">Tanggal Lahir <span class="text-red-500">*</span></label>
                  <input
                    type="date"
                    class="input-modern"
                    :class="{ 'border-red-300 bg-red-50': errors.tanggalLahir }"
                    id="tanggalLahir"
                    v-model="formData.tanggalLahir"
                    required
                  >
                  <div v-if="errors.tanggalLahir" class="mt-2 text-sm text-red-600">
                    {{ errors.tanggalLahir }}
                  </div>
                </div>

                <div>
                  <label for="jenisKelamin" class="block text-sm font-semibold text-gray-700 mb-3">Jenis Kelamin <span class="text-red-500">*</span></label>
                  <select
                    class="input-modern"
                    :class="{ 'border-red-300 bg-red-50': errors.jenisKelamin }"
                    id="jenisKelamin"
                    v-model="formData.jenisKelamin"
                    required
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                  <div v-if="errors.jenisKelamin" class="mt-2 text-sm text-red-600">
                    {{ errors.jenisKelamin }}
                  </div>
                </div>

                <div class="md:col-span-2">
                  <label for="alamat" class="block text-sm font-semibold text-gray-700 mb-3">Alamat Lengkap</label>
                  <textarea
                    class="input-modern"
                    id="alamat"
                    v-model="formData.alamat"
                    rows="3"
                    placeholder="Masukkan alamat lengkap"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Academic Information Section -->
            <div class="mb-8">
              <div class="flex items-center mb-6">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-4">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  </svg>
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-gray-900">🎓 Informasi Akademik</h2>
                  <p class="text-gray-600 mt-1">Data akademik dan status mahasiswa</p>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label for="jurusan" class="block text-sm font-semibold text-gray-700 mb-3">Jurusan <span class="text-red-500">*</span></label>
                  <select
                    class="input-modern"
                    :class="{ 'border-red-300 bg-red-50': errors.jurusan }"
                    id="jurusan"
                    v-model="formData.jurusan"
                    required
                  >
                    <option value="">Pilih Jurusan</option>
                    <option value="Teknik Informatika">Teknik Informatika</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                  </select>
                  <div v-if="errors.jurusan" class="mt-2 text-sm text-red-600">
                    {{ errors.jurusan }}
                  </div>
                </div>

                <div>
                  <label for="angkatan" class="block text-sm font-semibold text-gray-700 mb-3">Angkatan <span class="text-red-500">*</span></label>
                  <select
                    class="input-modern"
                    :class="{ 'border-red-300 bg-red-50': errors.angkatan }"
                    id="angkatan"
                    v-model="formData.angkatan"
                    required
                  >
                    <option value="">Pilih Angkatan</option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                  </select>
                  <div v-if="errors.angkatan" class="mt-2 text-sm text-red-600">
                    {{ errors.angkatan }}
                  </div>
                </div>

                <div>
                  <label for="status" class="block text-sm font-semibold text-gray-700 mb-3">Status <span class="text-red-500">*</span></label>
                  <select
                    class="input-modern"
                    :class="{ 'border-red-300 bg-red-50': errors.status }"
                    id="status"
                    v-model="formData.status"
                    required
                  >
                    <option value="">Pilih Status</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Non-Aktif">Non-Aktif</option>
                    <option value="Lulus">Lulus</option>
                  </select>
                  <div v-if="errors.status" class="mt-2 text-sm text-red-600">
                    {{ errors.status }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button 
                type="button" 
                class="btn-modern bg-gray-100 text-gray-700 hover:bg-gray-200"
                @click="resetForm"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Reset
              </button>
              <button 
                type="submit" 
                class="btn-modern btn-gradient-primary"
                :disabled="loading"
              >
                <span v-if="loading" class="flex items-center">
                  <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </span>
                <span v-else class="flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  Simpan Mahasiswa
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Info Card -->
      <div class="card-modern mt-6 animate-fade-in-up delay-200">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
          <div class="flex items-start space-x-4">
            <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-bold text-blue-900 mb-2">💡 Informasi Penting</h3>
              <p class="text-blue-800">
                Setelah mahasiswa ditambahkan, akun login akan otomatis dibuat dengan username menggunakan NIM dan password default "mhs123". 
                Mahasiswa dapat mengubah password setelah login pertama kali.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMahasiswaStore } from '@/stores/mahasiswa'

const router = useRouter()
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
  status: 'Aktif',
  ipk: 0
})

// Form state
const loading = ref(false)
const errors = reactive({})

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
  } else {
    const birthDate = new Date(formData.tanggalLahir)
    const age = new Date().getFullYear() - birthDate.getFullYear()
    if (age < 17 || age > 50) {
      errors.tanggalLahir = 'Umur harus antara 17-50 tahun'
      isValid = false
    }
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

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    const result = await mahasiswaStore.createMahasiswa(formData)
    
    if (result.success) {
      alert(result.message)
      router.push('/admin/mahasiswa')
    } else {
      alert(result.message)
    }
  } catch (error) {
    console.error('Error creating mahasiswa:', error)
    alert('Terjadi kesalahan saat menyimpan data')
  } finally {
    loading.value = false
  }
}

// Reset form
const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (key === 'status') {
      formData[key] = 'Aktif'
    } else if (key === 'ipk') {
      formData[key] = 0
    } else {
      formData[key] = ''
    }
  })
  
  Object.keys(errors).forEach(key => delete errors[key])
}
</script>

<style scoped>
/* Additional custom styles if needed */
.delay-100 {
  animation-delay: 0.1s;
}

.delay-200 {
  animation-delay: 0.2s;
}

select.input-modern {
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHBhdGggZmlsbD0iIzZCNzI4MCIgZD0iTTkuNzEgMTEuMjloLS4wMWwtMy4xLTMuMWEuNzUuNzUgMCAwIDAtMS4wNiAxLjA2bDMuNjMgMy42M2EuNzUuNzUgMCAwIDAgMS4wNiAwbDMuNjMtMy42M2EuNzUuNzUgMCAxIDAtMS4wNi0xLjA2bC0zLjA5IDMuMXoiLz48L3N2Zz4=');
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 1.25rem 1.25rem;
  padding-right: 3rem;
  appearance: none;
}
</style>