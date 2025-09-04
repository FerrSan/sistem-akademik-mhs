<!-- src/views/dosen/DashboardDosen.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">
              👨‍🏫 Dashboard Dosen
            </h1>
            <p class="text-xl text-gray-600">Selamat datang, {{ userName }}</p>
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
        <!-- Total Mahasiswa -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Total Mahasiswa</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalMahasiswa }}</p>
              <p class="text-xs text-gray-500 mt-1">Keseluruhan data</p>
            </div>
          </div>
        </div>

        <!-- Mahasiswa Aktif -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Mahasiswa Aktif</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.mahasiswaAktif }}</p>
              <p class="text-xs text-green-600 mt-1">🟢 Status aktif</p>
            </div>
          </div>
        </div>

        <!-- Rata-rata IPK -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Rata-rata IPK</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.avgIPK }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ getIPKCategory(stats.avgIPK) }}</p>
            </div>
          </div>
        </div>

        <!-- Mahasiswa Lulus -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Lulus</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.mahasiswaLulus }}</p>
              <p class="text-xs text-blue-600 mt-1">🎓 Sudah lulus</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up delay-200">
        <!-- Recent Students List -->
        <div class="lg:col-span-2">
          <div class="card-modern">
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-xl font-bold text-gray-900 flex items-center">
                    <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                    Daftar Mahasiswa Terbaru
                  </h2>
                  <p class="text-gray-600 mt-1">5 mahasiswa terbaru yang terdaftar</p>
                </div>
                <router-link 
                  to="/dosen/mahasiswa" 
                  class="btn-modern btn-gradient-primary flex items-center space-x-2"
                >
                  <span>Lihat Semua</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </router-link>
              </div>
            </div>
            <div class="p-6">
              <div v-if="loading" class="text-center py-8">
                <div class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </div>
              </div>
              
              <div v-else-if="recentMahasiswa.length === 0" class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Tidak ada data mahasiswa</h3>
                <p class="mt-1 text-sm text-gray-500">Belum ada mahasiswa yang terdaftar.</p>
              </div>

              <div v-else class="overflow-hidden">
                <div class="flow-root">
                  <ul role="list" class="-mb-8">
                    <li v-for="(mhs, index) in recentMahasiswa" :key="mhs.id" class="relative pb-8" :class="{ 'pb-0': index === recentMahasiswa.length - 1 }">
                      <div v-if="index !== recentMahasiswa.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></div>
                      <div class="relative flex space-x-3">
                        <div>
                          <span class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                                :class="{
                                  'bg-green-500': mhs.status === 'Aktif',
                                  'bg-yellow-500': mhs.status === 'Non-Aktif',
                                  'bg-blue-500': mhs.status === 'Lulus'
                                }">
                            <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                            </svg>
                          </span>
                        </div>
                        <div class="min-w-0 flex-1">
                          <div>
                            <div class="text-sm">
                              <p class="font-semibold text-gray-900">{{ mhs.nama }}</p>
                            </div>
                            <p class="mt-0.5 text-sm text-gray-500">NIM: {{ mhs.nim }}</p>
                          </div>
                          <div class="mt-2 text-sm text-gray-700">
                            <div class="grid grid-cols-2 gap-4">
                              <div>
                                <span class="text-gray-500">Jurusan:</span>
                                <span class="ml-1 font-medium">{{ mhs.jurusan }}</span>
                              </div>
                              <div>
                                <span class="text-gray-500">Angkatan:</span>
                                <span class="ml-1 font-medium">{{ mhs.angkatan }}</span>
                              </div>
                              <div>
                                <span class="text-gray-500">Status:</span>
                                <span 
                                  class="ml-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                  :class="{
                                    'bg-green-100 text-green-800': mhs.status === 'Aktif',
                                    'bg-yellow-100 text-yellow-800': mhs.status === 'Non-Aktif',
                                    'bg-blue-100 text-blue-800': mhs.status === 'Lulus'
                                  }"
                                >
                                  {{ mhs.status }}
                                </span>
                              </div>
                              <div>
                                <span class="text-gray-500">IPK:</span>
                                <span class="ml-1 font-bold text-purple-600">{{ mhs.ipk || '-' }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Actions -->
          <div class="card-modern">
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-gray-100">
              <h2 class="text-xl font-bold text-gray-900 flex items-center">
                <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Aksi Cepat
              </h2>
              <p class="text-gray-600 mt-1">Menu shortcut untuk dosen</p>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <router-link 
                  to="/dosen/mahasiswa" 
                  class="btn-modern bg-green-100 text-green-700 hover:bg-green-200 w-full flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                  <span>Lihat Semua Mahasiswa</span>
                </router-link>
                
                <router-link 
                  to="/dosen/input-nilai" 
                  class="btn-modern bg-purple-100 text-purple-700 hover:bg-purple-200 w-full flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                  </svg>
                  <span>Input Nilai Mahasiswa</span>
                </router-link>
                
                <button 
                  @click="exportData"
                  class="btn-modern bg-blue-100 text-blue-700 hover:bg-blue-200 w-full flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span>Download Data Mahasiswa</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Information Card -->
          <div class="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-xl animate-fade-in-up">
            <div class="flex items-start">
              <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div>
                <div class="font-semibold mb-1">📚 Informasi Penting</div>
                <p class="text-sm">
                  Anda dapat melihat dan mengelola data mahasiswa melalui menu "Data Mahasiswa" di sidebar. Gunakan fitur export untuk mendapatkan laporan data.
                </p>
              </div>
            </div>
          </div>

          <!-- Teaching Tips -->
          <div class="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 text-orange-800 px-6 py-4 rounded-xl animate-fade-in-up delay-100">
            <div class="flex items-start">
              <svg class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <div>
                <div class="font-semibold mb-1">💡 Tips Mengajar</div>
                <p class="text-sm">
                  Rata-rata IPK saat ini adalah {{ stats.avgIPK }}. {{ getTeachingTip(stats.avgIPK) }}
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
import { useMahasiswaStore } from '@/stores/mahasiswa'

const authStore = useAuthStore()
const mahasiswaStore = useMahasiswaStore()

// Data
const loading = ref(false)
const stats = ref({
  totalMahasiswa: 0,
  mahasiswaAktif: 0,
  mahasiswaLulus: 0,
  avgIPK: 0
})

const currentDate = ref(new Date().toLocaleDateString('id-ID', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}))

// Computed
const userName = computed(() => authStore.userName || 'Dosen')
const recentMahasiswa = computed(() => 
  mahasiswaStore.mahasiswaList.slice(0, 5)
)

// Methods
const loadData = async () => {
  loading.value = true
  
  try {
    await mahasiswaStore.fetchMahasiswa()
    
    const statistics = mahasiswaStore.statistik
    stats.value = {
      totalMahasiswa: statistics.total,
      mahasiswaAktif: statistics.aktif,
      mahasiswaLulus: statistics.lulus,
      avgIPK: statistics.avgIPK
    }
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

const getIPKCategory = (ipk) => {
  if (!ipk) return 'Belum ada data'
  if (ipk >= 3.5) return '🌟 Sangat Baik'
  if (ipk >= 3.0) return '👍 Baik'
  if (ipk >= 2.5) return '📈 Cukup'
  return '⚠️ Perlu Perbaikan'
}

const getTeachingTip = (avgIPK) => {
  if (!avgIPK) return 'Belum ada data untuk analisis.'
  if (avgIPK >= 3.5) return 'Prestasi mahasiswa sangat baik! Pertahankan kualitas pembelajaran.'
  if (avgIPK >= 3.0) return 'IPK rata-rata bagus. Fokus pada peningkatan mahasiswa dengan nilai rendah.'
  if (avgIPK >= 2.5) return 'IPK cukup. Pertimbangkan metode pembelajaran yang lebih interaktif.'
  return 'IPK perlu perbaikan. Evaluasi kurikulum dan metode pengajaran.'
}

const exportData = () => {
  const data = mahasiswaStore.mahasiswaList
  const headers = ['NIM', 'Nama', 'Jurusan', 'Angkatan', 'Status', 'IPK']
  const csvContent = [
    headers.join(','),
    ...data.map(m => [
      m.nim,
      `"${m.nama}"`,
      m.jurusan,
      m.angkatan,
      m.status,
      m.ipk || ''
    ].join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `data_mahasiswa_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>