<!-- src/views/mahasiswa/DashboardMahasiswa.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">
              🎓 Dashboard Mahasiswa
            </h1>
            <p class="text-xl text-gray-600">Selamat datang, {{ mahasiswaData?.nama || 'Mahasiswa' }}</p>
          </div>
          <div class="mt-4 sm:mt-0 flex items-center text-gray-500">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            {{ currentDate }}
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up delay-100">
        <!-- Status Card -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Status</p>
              <p class="text-2xl font-bold text-gray-900">{{ mahasiswaData?.status || '-' }}</p>
              <div class="flex items-center mt-1">
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': mahasiswaData?.status === 'Aktif',
                    'bg-yellow-100 text-yellow-800': mahasiswaData?.status === 'Non-Aktif',
                    'bg-blue-100 text-blue-800': mahasiswaData?.status === 'Lulus'
                  }"
                >
                  {{ getStatusText(mahasiswaData?.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- IPK Card -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">IPK</p>
              <p class="text-3xl font-bold text-gray-900">{{ mahasiswaData?.ipk || '0.00' }}</p>
              <div class="flex items-center mt-1">
                <span class="text-xs text-gray-500">
                  {{ getIPKCategory(mahasiswaData?.ipk) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Angkatan Card -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Angkatan</p>
              <p class="text-3xl font-bold text-gray-900">{{ mahasiswaData?.angkatan || '-' }}</p>
              <p class="text-xs text-gray-500 mt-1">
                {{ getSemesterInfo(mahasiswaData?.angkatan) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Program Studi Card -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Program Studi</p>
              <p class="text-lg font-bold text-gray-900">{{ getJurusanShort(mahasiswaData?.jurusan) }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ mahasiswaData?.jurusan || '-' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up delay-200">
        <!-- Profile Information -->
        <div class="lg:col-span-2">
          <div class="card-modern">
            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
              <h2 class="text-xl font-bold text-gray-900 flex items-center">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Informasi Pribadi
              </h2>
              <p class="text-gray-600 mt-1">Detail informasi akademik dan pribadi</p>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Personal Info -->
                <div class="space-y-6">
                  <h3 class="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Data Pribadi
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <dt class="text-sm font-medium text-gray-500">NIM</dt>
                      <dd class="text-sm font-semibold text-gray-900 mt-1">{{ mahasiswaData?.nim || '-' }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                      <dd class="text-sm font-semibold text-gray-900 mt-1">{{ mahasiswaData?.nama || '-' }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Email</dt>
                      <dd class="text-sm text-gray-900 mt-1">{{ mahasiswaData?.email || '-' }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Jenis Kelamin</dt>
                      <dd class="text-sm text-gray-900 mt-1">{{ mahasiswaData?.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</dd>
                    </div>
                  </div>
                </div>

                <!-- Academic Info -->
                <div class="space-y-6">
                  <h3 class="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    Data Akademik
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Program Studi</dt>
                      <dd class="text-sm font-semibold text-gray-900 mt-1">{{ mahasiswaData?.jurusan || '-' }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Angkatan</dt>
                      <dd class="text-sm font-semibold text-gray-900 mt-1">{{ mahasiswaData?.angkatan || '-' }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">Status Akademik</dt>
                      <dd class="mt-1">
                        <span 
                          class="inline-flex px-3 py-1 text-xs font-semibold rounded-full"
                          :class="{
                            'bg-green-100 text-green-800': mahasiswaData?.status === 'Aktif',
                            'bg-yellow-100 text-yellow-800': mahasiswaData?.status === 'Non-Aktif',
                            'bg-blue-100 text-blue-800': mahasiswaData?.status === 'Lulus'
                          }"
                        >
                          {{ mahasiswaData?.status || '-' }}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-gray-500">IPK Terakhir</dt>
                      <dd class="text-lg font-bold text-blue-600 mt-1">{{ mahasiswaData?.ipk || '0.00' }}</dd>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Info -->
              <div class="mt-8 pt-6 border-t border-gray-200">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Informasi Kontak</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">No. Telepon</dt>
                    <dd class="text-sm text-gray-900 mt-1">{{ mahasiswaData?.telepon || 'Belum diisi' }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Tanggal Lahir</dt>
                    <dd class="text-sm text-gray-900 mt-1">{{ formatDate(mahasiswaData?.tanggalLahir) }}</dd>
                  </div>
                  <div class="md:col-span-2">
                    <dt class="text-sm font-medium text-gray-500">Alamat</dt>
                    <dd class="text-sm text-gray-900 mt-1">{{ mahasiswaData?.alamat || 'Belum diisi' }}</dd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div class="card-modern">
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
              <h2 class="text-xl font-bold text-gray-900 flex items-center">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Menu Cepat
              </h2>
              <p class="text-gray-600 mt-1">Akses fitur utama dengan cepat</p>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <router-link 
                  to="/mahasiswa/nilai" 
                  class="btn-modern btn-gradient-primary w-full flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  <span>Lihat Nilai</span>
                </router-link>
                
                <router-link 
                  to="/mahasiswa/profil" 
                  class="btn-modern bg-gray-100 text-gray-700 hover:bg-gray-200 w-full flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span>Edit Profil</span>
                </router-link>
              </div>
            </div>
          </div>

          <!-- Information Card -->
          <div class="bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-xl animate-fade-in-up">
            <div class="flex items-start">
              <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <div class="font-semibold mb-1">📚 Informasi Penting</div>
                <p class="text-sm">
                  Pastikan data pribadi Anda selalu terbarui. Untuk perubahan data akademik, silakan hubungi admin program studi.
                </p>
              </div>
            </div>
          </div>

          <!-- Academic Tips -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 text-purple-800 px-6 py-4 rounded-xl animate-fade-in-up delay-100">
            <div class="flex items-start">
              <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <div>
                <div class="font-semibold mb-1">💡 Tips Akademik</div>
                <p class="text-sm">
                  {{ getAcademicTip(mahasiswaData?.ipk) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import mahasiswaService from '@/services/mahasiswaService'

const authStore = useAuthStore()

// Data
const mahasiswaData = ref(null)
const loading = ref(false)

const currentDate = ref(new Date().toLocaleDateString('id-ID', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}))

// Computed
const user = computed(() => authStore.user)

// Methods
const loadMahasiswaData = async () => {
  loading.value = true
  
  try {
    if (user.value?.nim) {
      const result = await mahasiswaService.getByNIM(user.value.nim)
      if (result.success) {
        mahasiswaData.value = result.data
      }
    }
  } catch (error) {
    console.error('Error loading mahasiswa data:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (date) => {
  if (!date) return 'Belum diisi'
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const getStatusText = (status) => {
  switch(status) {
    case 'Aktif': return '🟢 Aktif'
    case 'Non-Aktif': return '🟡 Non-Aktif'
    case 'Lulus': return '🎓 Lulus'
    default: return '-'
  }
}

const getIPKCategory = (ipk) => {
  if (!ipk) return 'Belum ada data'
  if (ipk >= 3.5) return 'Sangat Baik'
  if (ipk >= 3.0) return 'Baik'
  if (ipk >= 2.5) return 'Cukup'
  return 'Perlu Perbaikan'
}

const getSemesterInfo = (angkatan) => {
  if (!angkatan) return 'Data tidak tersedia'
  const currentYear = new Date().getFullYear()
  const semester = (currentYear - parseInt(angkatan)) * 2 + 1
  return semester > 8 ? 'Alumni' : `Semester ${semester}`
}

const getJurusanShort = (jurusan) => {
  switch(jurusan) {
    case 'Teknik Informatika': return 'TI'
    case 'Sistem Informasi': return 'SI'
    default: return jurusan || '-'
  }
}

const getAcademicTip = (ipk) => {
  if (!ipk) return 'Mulai dengan semangat belajar yang tinggi!'
  if (ipk >= 3.5) return 'IPK Anda sangat baik! Pertahankan prestasi ini.'
  if (ipk >= 3.0) return 'IPK yang bagus! Terus tingkatkan dengan belajar lebih giat.'
  if (ipk >= 2.5) return 'IPK cukup baik. Fokus pada mata kuliah yang perlu diperbaiki.'
  return 'Jangan menyerah! Konsultasikan dengan dosen untuk strategi belajar yang lebih baik.'
}

// Lifecycle
onMounted(() => {
  loadMahasiswaData()
})
</script>