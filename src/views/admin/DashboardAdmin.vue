<!-- src/views/admin/DashboardAdmin.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">
              🏛️ Dashboard Admin
            </h1>
            <p class="text-xl text-gray-600">Kelola sistem akademik dengan mudah dan efisien</p>
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
        <!-- Total Mahasiswa Card -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Total Mahasiswa</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalMahasiswa }}</p>
              <div class="flex items-center mt-1">
                <svg class="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                </svg>
                <span class="text-sm text-green-600 font-medium">+5%</span>
                <span class="text-xs text-gray-500 ml-1">dari bulan lalu</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mahasiswa Aktif Card -->
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
              <p class="text-sm font-medium text-gray-500">Mahasiswa Aktif</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.mahasiswaAktif }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ percentageAktif }}% dari total</p>
            </div>
          </div>
        </div>

        <!-- Total Dosen Card -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Total Dosen</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.totalDosen }}</p>
              <p class="text-xs text-gray-500 mt-1">Dosen Aktif</p>
            </div>
          </div>
        </div>

        <!-- Rata-rata IPK Card -->
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
              <p class="text-sm font-medium text-gray-500">Rata-rata IPK</p>
              <p class="text-3xl font-bold text-gray-900">{{ stats.avgIPK }}</p>
              <div class="flex items-center mt-1">
                <svg class="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                </svg>
                <span class="text-sm text-green-600 font-medium">+0.05</span>
                <span class="text-xs text-gray-500 ml-1">dari semester lalu</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in-up delay-200">
        <!-- Mahasiswa by Jurusan Chart -->
        <div class="card-modern">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
            <h2 class="text-xl font-bold text-gray-900">📊 Distribusi Mahasiswa per Jurusan</h2>
            <p class="text-gray-600 mt-1">Grafik penyebaran mahasiswa berdasarkan program studi</p>
          </div>
          <div class="p-6">
            <canvas ref="jurusanChart" class="w-full" height="300"></canvas>
          </div>
        </div>

        <!-- Mahasiswa by Angkatan Chart -->
        <div class="card-modern">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-100">
            <h2 class="text-xl font-bold text-gray-900">📅 Mahasiswa per Angkatan</h2>
            <p class="text-gray-600 mt-1">Distribusi mahasiswa berdasarkan tahun masuk</p>
          </div>
          <div class="p-6">
            <canvas ref="angkatanChart" class="w-full" height="300"></canvas>
          </div>
        </div>
      </div>

      <!-- Recent Activities & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up delay-300">
        <!-- Recent Activities -->
        <div class="lg:col-span-2">
          <div class="card-modern">
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
              <h2 class="text-xl font-bold text-gray-900">🕐 Aktivitas Terbaru</h2>
              <p class="text-gray-600 mt-1">Log aktivitas sistem dalam waktu terbaru</p>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="(activity, index) in recentActivities" :key="activity.id" 
                     class="flex items-start space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                     :class="{'animate-slide-in-right': index < 3}">
                  <div class="flex-shrink-0">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center"
                         :class="getActivityIconClass(activity.type)">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path v-if="activity.type === 'success'" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        <path v-else-if="activity.type === 'warning'" fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        <path v-else fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <p class="text-sm font-semibold text-gray-900">{{ activity.title }}</p>
                      <p class="text-xs text-gray-500">{{ activity.time }}</p>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div>
          <div class="card-modern">
            <div class="bg-gradient-to-r from-orange-50 to-red-50 p-6 border-b border-gray-100">
              <h2 class="text-xl font-bold text-gray-900">⚡ Aksi Cepat</h2>
              <p class="text-gray-600 mt-1">Shortcut untuk tugas admin utama</p>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <router-link to="/admin/mahasiswa/tambah" 
                           class="btn-modern btn-gradient-primary w-full flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  <span>Tambah Mahasiswa Baru</span>
                </router-link>
                
                <router-link to="/admin/laporan" 
                           class="btn-modern bg-gray-100 text-gray-700 hover:bg-gray-200 w-full flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span>Generate Laporan</span>
                </router-link>
                
                <button @click="exportData" 
                        class="btn-modern bg-gray-100 text-gray-700 hover:bg-gray-200 w-full flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span>Export Data Mahasiswa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMahasiswaStore } from '@/stores/mahasiswa'

const mahasiswaStore = useMahasiswaStore()

// Refs for charts
const jurusanChart = ref(null)
const angkatanChart = ref(null)
let chartInstances = []

// Data
const currentDate = ref(new Date().toLocaleDateString('id-ID', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}))

const stats = ref({
  totalMahasiswa: 0,
  mahasiswaAktif: 0,
  totalDosen: 12,
  avgIPK: 3.45
})

const recentActivities = ref([
  {
    id: 1,
    type: 'success',
    title: 'Mahasiswa Baru Ditambahkan',
    description: 'Ahmad Rizki (20220001) berhasil ditambahkan',
    time: '5 menit lalu'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Data Mahasiswa Diperbarui',
    description: 'Siti Nurhaliza (20220002) - IPK diperbarui',
    time: '1 jam lalu'
  },
  {
    id: 3,
    type: 'info',
    title: 'Laporan Digenerate',
    description: 'Laporan mahasiswa angkatan 2022 berhasil dibuat',
    time: '2 jam lalu'
  },
  {
    id: 4,
    type: 'danger',
    title: 'Mahasiswa Non-Aktif',
    description: 'Budi Santoso (20210015) status menjadi non-aktif',
    time: '3 jam lalu'
  }
])

// Computed
const percentageAktif = computed(() => {
  if (stats.value.totalMahasiswa === 0) return 0
  return Math.round((stats.value.mahasiswaAktif / stats.value.totalMahasiswa) * 100)
})

// Methods
const loadStatistics = async () => {
  await mahasiswaStore.fetchMahasiswa()
  
  const statistics = mahasiswaStore.statistik
  stats.value = {
    totalMahasiswa: statistics.total,
    mahasiswaAktif: statistics.aktif,
    totalDosen: 2, // Updated to match db.json
    avgIPK: statistics.avgIPK
  }
  
  // Initialize charts after data is loaded
  initializeCharts()
}

const initializeCharts = () => {
  // Destroy existing charts
  chartInstances.forEach(chart => chart.destroy())
  chartInstances = []
  
  // Create Jurusan Chart
  if (jurusanChart.value) {
    const ctx1 = jurusanChart.value.getContext('2d')
    const statistics = mahasiswaStore.statistik
    
    const chart1 = new Chart(ctx1, {
      type: 'doughnut',
      data: {
        labels: Object.keys(statistics.byJurusan),
        datasets: [{
          data: Object.values(statistics.byJurusan),
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
    chartInstances.push(chart1)
  }
  
  // Create Angkatan Chart
  if (angkatanChart.value) {
    const ctx2 = angkatanChart.value.getContext('2d')
    const statistics = mahasiswaStore.statistik
    
    const chart2 = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: Object.keys(statistics.byAngkatan),
        datasets: [{
          label: 'Jumlah Mahasiswa',
          data: Object.values(statistics.byAngkatan),
          backgroundColor: 'rgba(75, 192, 192, 0.8)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
    chartInstances.push(chart2)
  }
}

const exportData = async () => {
  const result = await mahasiswaStore.exportData()
  if (result.success) {
    // Create download link
    const blob = new Blob([result.data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = result.filename
    a.click()
    window.URL.revokeObjectURL(url)
  }
}

// Methods
const getActivityIconClass = (type) => {
  switch(type) {
    case 'success':
      return 'bg-gradient-to-br from-green-500 to-emerald-600'
    case 'warning':
      return 'bg-gradient-to-br from-yellow-500 to-orange-500'
    case 'info':
      return 'bg-gradient-to-br from-blue-500 to-indigo-600'
    default:
      return 'bg-gradient-to-br from-gray-500 to-gray-600'
  }
}


// Lifecycle
onMounted(() => {
  // Load Chart.js
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
  script.onload = () => {
    loadStatistics()
  }
  document.head.appendChild(script)
})

onUnmounted(() => {
  // Cleanup charts
  chartInstances.forEach(chart => chart.destroy())
})
</script>

