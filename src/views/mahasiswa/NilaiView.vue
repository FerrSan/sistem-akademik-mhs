<!-- src/views/mahasiswa/NilaiView.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-3">
            📊 Nilai Akademik
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Transkrip nilai dan pencapaian akademik Anda dalam satu dashboard yang komprehensif
          </p>
        </div>
      </div>

      <!-- IPK Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up delay-100">
        <!-- IPK Card -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                {{ (mahasiswaData?.ipk || 0).toFixed(1) }}
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">IPK Kumulatif</p>
              <p class="text-2xl font-bold text-gray-900">{{ (mahasiswaData?.ipk || 0).toFixed(2) }}</p>
              <p class="text-xs text-gray-400">dari 4.00</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" 
                   :style="`width: ${((mahasiswaData?.ipk || 0) / 4) * 100}%`"></div>
            </div>
          </div>
        </div>

        <!-- Total SKS Card -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Total SKS</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalSKS }}</p>
              <p class="text-xs text-gray-400">SKS Lulus</p>
            </div>
          </div>
        </div>

        <!-- Mata Kuliah Card -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Mata Kuliah</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalMataKuliah }}</p>
              <p class="text-xs text-gray-400">Selesai</p>
            </div>
          </div>
        </div>

        <!-- Semester Card -->
        <div class="stat-card group">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                {{ currentSemester }}
              </div>
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm font-medium text-gray-500">Semester</p>
              <p class="text-2xl font-bold text-gray-900">{{ currentSemester }}</p>
              <p class="text-xs text-gray-400">Berjalan</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Nilai Table -->
      <div class="card-modern animate-fade-in-up delay-200">
        <div class="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">📋 Daftar Nilai</h2>
              <p class="text-gray-600 mt-1">Rincian nilai per mata kuliah dan semester</p>
            </div>
            <div class="flex items-center space-x-3">
              <label class="text-sm font-medium text-gray-700">Filter Semester:</label>
              <select class="input-modern py-2 px-3 min-w-0 w-40" v-model="selectedSemester">
                <option value="">Semua Semester</option>
                <option v-for="sem in availableSemesters" :key="sem" :value="sem">
                  Semester {{ sem }}
                </option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <div class="overflow-hidden rounded-xl border border-gray-200">
            <table class="table-modern">
              <thead>
                <tr>
                  <th>Kode MK</th>
                  <th>Mata Kuliah</th>
                  <th>SKS</th>
                  <th>Semester</th>
                  <th>Nilai Huruf</th>
                  <th>Nilai Angka</th>
                  <th>Bobot</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="7" class="text-center py-12">
                    <div class="flex flex-col items-center justify-center">
                      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                      <p class="text-gray-600">Memuat data nilai...</p>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="filteredNilai.length === 0">
                  <td colspan="7" class="text-center py-12">
                    <div class="flex flex-col items-center justify-center">
                      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                      </div>
                      <p class="text-gray-600 text-lg">
                        {{ selectedSemester ? 'Belum ada nilai untuk semester ini' : 'Belum ada data nilai' }}
                      </p>
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="(nilai, index) in filteredNilai" :key="nilai.id" class="hover:bg-blue-50 transition-colors duration-200" :class="{'animate-slide-in-right': index < 5}">
                  <td class="font-mono text-blue-600 font-semibold">{{ nilai.kodeMK }}</td>
                  <td class="font-medium text-gray-900">{{ nilai.namaMK }}</td>
                  <td class="text-center">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {{ nilai.sks }}
                    </span>
                  </td>
                  <td class="text-center">{{ nilai.semester }}</td>
                  <td>
                    <span class="badge-modern" :class="getModernNilaiClass(nilai.nilaiHuruf)">
                      {{ nilai.nilaiHuruf }}
                    </span>
                  </td>
                  <td class="text-center font-semibold">{{ nilai.nilaiAngka }}</td>
                  <td class="text-center font-semibold">{{ (nilai.bobot / nilai.sks).toFixed(2) }}</td>
                </tr>
              </tbody>
              <tfoot v-if="filteredNilai.length > 0">
                <tr class="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <th colspan="2" class="text-right font-bold text-gray-700">Total</th>
                  <th class="text-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">
                      {{ totalSKSSemester }}
                    </span>
                  </th>
                  <th colspan="3" class="text-right font-bold text-gray-700">IP Semester:</th>
                  <th class="text-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                      {{ ipSemester }}
                    </span>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <!-- IP Progress Chart -->
      <div class="card-modern mt-8 animate-fade-in-up delay-300">
        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 border-b border-gray-100">
          <h2 class="text-2xl font-bold text-gray-900">📈 Perkembangan IP per Semester</h2>
          <p class="text-gray-600 mt-1">Grafik perkembangan indeks prestasi dari semester ke semester</p>
        </div>
        <div class="p-6">
          <canvas ref="ipChart" class="w-full" height="300"></canvas>
        </div>
      </div>

      <!-- Grade Legend -->
      <div class="card-modern mt-8 animate-fade-in-up delay-400">
        <div class="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-b border-gray-100">
          <h2 class="text-2xl font-bold text-gray-900">📊 Keterangan Nilai</h2>
          <p class="text-gray-600 mt-1">Panduan konversi nilai huruf, bobot, dan rentang nilai</p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div class="overflow-hidden rounded-xl border border-gray-200">
                <table class="w-full">
                  <thead>
                    <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nilai</th>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Bobot</th>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-100">
                      <td class="px-4 py-3"><span class="badge-modern bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">A</span></td>
                      <td class="px-4 py-3 font-semibold">4.00</td>
                      <td class="px-4 py-3 text-sm text-gray-600">Sangat Baik (85-100)</td>
                    </tr>
                    <tr class="border-b border-gray-100">
                      <td class="px-4 py-3"><span class="badge-modern bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md">A-</span></td>
                      <td class="px-4 py-3 font-semibold">3.75</td>
                      <td class="px-4 py-3 text-sm text-gray-600">Sangat Baik (80-84)</td>
                    </tr>
                    <tr class="border-b border-gray-100">
                      <td class="px-4 py-3"><span class="badge-modern bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">B+</span></td>
                      <td class="px-4 py-3 font-semibold">3.50</td>
                      <td class="px-4 py-3 text-sm text-gray-600">Baik (75-79)</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3"><span class="badge-modern bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md">B</span></td>
                      <td class="px-4 py-3 font-semibold">3.00</td>
                      <td class="px-4 py-3 text-sm text-gray-600">Baik (70-74)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div class="overflow-hidden rounded-xl border border-gray-200">
                <table class="w-full">
                  <thead>
                    <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nilai</th>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Bobot</th>
                      <th class="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="border-b border-gray-100">
                      <td class="px-4 py-3"><span class="badge-modern bg-gradient-to-r from-indigo-400 to-indigo-500 text-white shadow-md">B-</span></td>
                      <td class="px-4 py-3 font-semibold">2.75</td>
                      <td class="px-4 py-3 text-sm text-gray-600">Cukup Baik (65-69)</td>
                    </tr>
                    <tr class="border-b border-gray-100">
                      <td class="px-4 py-3"><span class="badge-modern bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md">C+</span></td>
                      <td class="px-4 py-3 font-semibold">2.50</td>
                      <td class="px-4 py-3 text-sm text-gray-600">Cukup (60-64)</td>
                    </tr>
                    <tr class="border-b border-gray-100">
                      <td class="px-4 py-3"><span class="badge-modern bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md">C</span></td>
                      <td class="px-4 py-3 font-semibold">2.00</td>
                      <td class="px-4 py-3 text-sm text-gray-600">Cukup (55-59)</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3"><span class="badge-modern bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md">D</span></td>
                      <td class="px-4 py-3 font-semibold">1.00</td>
                      <td class="px-4 py-3 text-sm text-gray-600">Kurang (40-54)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import mahasiswaService from '@/services/mahasiswaService'
import nilaiService from '@/services/nilaiService'

const authStore = useAuthStore()

// Data
const mahasiswaData = ref(null)
const nilaiList = ref([])
const loading = ref(false)
const selectedSemester = ref('')
const ipChart = ref(null)
let chartInstance = null

// Computed
const user = computed(() => authStore.user)

const filteredNilai = computed(() => {
  if (!selectedSemester.value) return nilaiList.value
  return nilaiList.value.filter(n => n.semester === parseInt(selectedSemester.value))
})

const totalSKS = computed(() => {
  const uniqueMataKuliah = new Set()
  nilaiList.value.forEach(n => uniqueMataKuliah.add(n.mataKuliahId))
  return nilaiList.value
    .filter(n => uniqueMataKuliah.has(n.mataKuliahId))
    .reduce((sum, n) => sum + n.sks, 0)
})

const totalMataKuliah = computed(() => {
  const uniqueMataKuliah = new Set(nilaiList.value.map(n => n.mataKuliahId))
  return uniqueMataKuliah.size
})

const currentSemester = computed(() => {
  if (!mahasiswaData.value?.angkatan) return 1
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const entryYear = parseInt(mahasiswaData.value.angkatan)
  const yearDiff = currentYear - entryYear
  
  let semester = yearDiff * 2
  if (currentMonth >= 8) semester += 1
  
  return Math.min(semester, 8)
})

const availableSemesters = computed(() => {
  const semesters = new Set(nilaiList.value.map(n => n.semester))
  return Array.from(semesters).sort()
})

const totalSKSSemester = computed(() => {
  return filteredNilai.value.reduce((sum, n) => sum + n.sks, 0)
})

const ipSemester = computed(() => {
  const totalBobot = filteredNilai.value.reduce((sum, n) => sum + n.bobot, 0)
  const totalSKS = filteredNilai.value.reduce((sum, n) => sum + n.sks, 0)
  return totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : '0.00'
})

const ipPerSemester = computed(() => {
  const grouped = {}
  
  nilaiList.value.forEach(nilai => {
    if (!grouped[nilai.semester]) {
      grouped[nilai.semester] = {
        totalBobot: 0,
        totalSKS: 0
      }
    }
    grouped[nilai.semester].totalBobot += nilai.bobot
    grouped[nilai.semester].totalSKS += nilai.sks
  })
  
  const result = {}
  Object.keys(grouped).forEach(sem => {
    const data = grouped[sem]
    result[sem] = data.totalSKS > 0 ? 
      (data.totalBobot / data.totalSKS).toFixed(2) : '0.00'
  })
  
  return result
})

// Methods
const getModernNilaiClass = (nilai) => {
  switch(nilai) {
    case 'A':
      return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
    case 'A-':
      return 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md'
    case 'B+':
      return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
    case 'B':
      return 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md'
    case 'B-':
      return 'bg-gradient-to-r from-indigo-400 to-indigo-500 text-white shadow-md'
    case 'C+':
      return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md'
    case 'C':
      return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md'
    case 'D':
      return 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md'
    case 'E':
      return 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
    default:
      return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md'
  }
}

const loadMahasiswaData = async () => {
  loading.value = true
  
  try {
    if (user.value?.nim) {
      const result = await mahasiswaService.getByNIM(user.value.nim)
      if (result.success) {
        mahasiswaData.value = result.data
        await loadNilaiData(result.data.id)
      }
    }
  } catch (error) {
    console.error('Error loading mahasiswa data:', error)
  } finally {
    loading.value = false
  }
}

const loadNilaiData = async (mahasiswaId) => {
  try {
    const result = await nilaiService.getNilaiByMahasiswa(mahasiswaId)
    if (result.success && result.data.length > 0) {
      // Get mata kuliah data
      const mataKuliahData = await nilaiService.getMataKuliahData()
      
      // Map nilai with mata kuliah info
      nilaiList.value = result.data.map(nilai => {
        const mk = mataKuliahData.find(m => m.id === nilai.mataKuliahId)
        return {
          ...nilai,
          kodeMK: mk?.kode || '-',
          namaMK: mk?.nama || '-',
          sks: mk?.sks || 0
        }
      })
    }
  } catch (error) {
    console.error('Error loading nilai:', error)
  }
}

const initChart = () => {
  if (!ipChart.value || !window.Chart) return
  
  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy()
  }
  
  const ipData = ipPerSemester.value
  const labels = Object.keys(ipData).map(s => `Semester ${s}`)
  const data = Object.values(ipData).map(ip => parseFloat(ip))
  
  const ctx = ipChart.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'IP Semester',
        data: data,
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
          ticks: {
            stepSize: 0.5
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'IP: ' + context.parsed.y.toFixed(2)
            }
          }
        }
      }
    }
  })
}

// Lifecycle
onMounted(() => {
  loadMahasiswaData()
  
  // Load Chart.js
  if (!window.Chart) {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
    script.onload = () => {
      if (nilaiList.value.length > 0) {
        initChart()
      }
    }
    document.head.appendChild(script)
  }
})

// Watch for nilai changes
watch(nilaiList, () => {
  if (window.Chart && nilaiList.value.length > 0) {
    initChart()
  }
})
</script>

<style scoped>
.table-sm td {
  padding: 0.5rem;
}

.badge {
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
}

canvas {
  max-height: 300px;
}
</style>