<!-- src/views/mahasiswa/NilaiView.vue -->
<template>
  <div class="nilai-view">
    <!-- Page Header -->
    <div class="mb-4">
      <h1 class="h3 mb-0">Nilai Akademik</h1>
      <p class="text-muted">Transkrip nilai dan pencapaian akademik</p>
    </div>

    <!-- IPK Summary -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body">
            <h6 class="text-muted">IPK Kumulatif</h6>
            <h2 class="text-primary mb-0">{{ mahasiswaData?.ipk || '0.00' }}</h2>
            <small class="text-muted">dari 4.00</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body">
            <h6 class="text-muted">Total SKS</h6>
            <h2 class="text-success mb-0">{{ totalSKS }}</h2>
            <small class="text-muted">SKS Lulus</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body">
            <h6 class="text-muted">Mata Kuliah</h6>
            <h2 class="text-info mb-0">{{ totalMataKuliah }}</h2>
            <small class="text-muted">Selesai</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body">
            <h6 class="text-muted">Semester</h6>
            <h2 class="text-warning mb-0">{{ currentSemester }}</h2>
            <small class="text-muted">Berjalan</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Nilai Table -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Daftar Nilai</h5>
        <div>
          <select class="form-select form-select-sm" v-model="selectedSemester">
            <option value="">Semua Semester</option>
            <option v-for="sem in availableSemesters" :key="sem" :value="sem">
              Semester {{ sem }}
            </option>
          </select>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
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
                <td colspan="7" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
              <tr v-else-if="filteredNilai.length === 0">
                <td colspan="7" class="text-center text-muted py-4">
                  {{ selectedSemester ? 'Belum ada nilai untuk semester ini' : 'Belum ada data nilai' }}
                </td>
              </tr>
              <tr v-else v-for="nilai in filteredNilai" :key="nilai.id">
                <td>{{ nilai.kodeMK }}</td>
                <td>{{ nilai.namaMK }}</td>
                <td>{{ nilai.sks }}</td>
                <td>{{ nilai.semester }}</td>
                <td>
                  <span class="badge" :class="getNilaiClass(nilai.nilaiHuruf)">
                    {{ nilai.nilaiHuruf }}
                  </span>
                </td>
                <td>{{ nilai.nilaiAngka }}</td>
                <td>{{ (nilai.bobot / nilai.sks).toFixed(2) }}</td>
              </tr>
            </tbody>
            <tfoot v-if="filteredNilai.length > 0">
              <tr>
                <th colspan="2">Total</th>
                <th>{{ totalSKSSemester }}</th>
                <th colspan="3" class="text-end">IP Semester:</th>
                <th>{{ ipSemester }}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!-- IP Progress Chart -->
    <div class="card border-0 shadow-sm mt-4">
      <div class="card-header bg-white">
        <h5 class="mb-0">Perkembangan IP per Semester</h5>
      </div>
      <div class="card-body">
        <canvas ref="ipChart" height="100"></canvas>
      </div>
    </div>

    <!-- Grade Legend -->
    <div class="card border-0 shadow-sm mt-4">
      <div class="card-header bg-white">
        <h5 class="mb-0">Keterangan Nilai</h5>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <table class="table table-sm">
              <tr>
                <td><span class="badge bg-success">A</span></td>
                <td>4.00</td>
                <td>Sangat Baik (85-100)</td>
              </tr>
              <tr>
                <td><span class="badge bg-success">A-</span></td>
                <td>3.75</td>
                <td>Sangat Baik (80-84)</td>
              </tr>
              <tr>
                <td><span class="badge bg-primary">B+</span></td>
                <td>3.50</td>
                <td>Baik (75-79)</td>
              </tr>
              <tr>
                <td><span class="badge bg-primary">B</span></td>
                <td>3.00</td>
                <td>Baik (70-74)</td>
              </tr>
            </table>
          </div>
          <div class="col-md-6">
            <table class="table table-sm">
              <tr>
                <td><span class="badge bg-info">B-</span></td>
                <td>2.75</td>
                <td>Cukup Baik (65-69)</td>
              </tr>
              <tr>
                <td><span class="badge bg-warning">C+</span></td>
                <td>2.50</td>
                <td>Cukup (60-64)</td>
              </tr>
              <tr>
                <td><span class="badge bg-warning">C</span></td>
                <td>2.00</td>
                <td>Cukup (55-59)</td>
              </tr>
              <tr>
                <td><span class="badge bg-danger">D</span></td>
                <td>1.00</td>
                <td>Kurang (40-54)</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useNilaiStore } from '@/stores/nilai'

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
const getNilaiClass = (nilai) => {
  switch(nilai) {
    case 'A':
    case 'A-':
      return 'bg-success'
    case 'B+':
    case 'B':
      return 'bg-primary'
    case 'B-':
      return 'bg-info'
    case 'C+':
    case 'C':
      return 'bg-warning'
    case 'D':
      return 'bg-danger'
    case 'E':
      return 'bg-danger'
    default:
      return 'bg-secondary'
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