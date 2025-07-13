<!-- src/views/admin/DashboardAdmin.vue -->
<template>
  <div class="dashboard-admin">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Dashboard Admin</h1>
      <div class="text-muted">
        <i class="bi bi-calendar me-2"></i>
        {{ currentDate }}
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="p-3 bg-primary bg-opacity-10 rounded">
                  <i class="bi bi-people-fill text-primary fs-3"></i>
                </div>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="text-muted mb-1">Total Mahasiswa</h6>
                <h3 class="mb-0">{{ stats.totalMahasiswa }}</h3>
                <small class="text-success">
                  <i class="bi bi-arrow-up"></i> +5% dari bulan lalu
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="p-3 bg-success bg-opacity-10 rounded">
                  <i class="bi bi-check-circle-fill text-success fs-3"></i>
                </div>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="text-muted mb-1">Mahasiswa Aktif</h6>
                <h3 class="mb-0">{{ stats.mahasiswaAktif }}</h3>
                <small class="text-muted">{{ percentageAktif }}% dari total</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="p-3 bg-warning bg-opacity-10 rounded">
                  <i class="bi bi-person-badge-fill text-warning fs-3"></i>
                </div>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="text-muted mb-1">Total Dosen</h6>
                <h3 class="mb-0">{{ stats.totalDosen }}</h3>
                <small class="text-muted">Dosen Aktif</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="p-3 bg-info bg-opacity-10 rounded">
                  <i class="bi bi-graph-up text-info fs-3"></i>
                </div>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="text-muted mb-1">Rata-rata IPK</h6>
                <h3 class="mb-0">{{ stats.avgIPK }}</h3>
                <small class="text-success">
                  <i class="bi bi-arrow-up"></i> +0.05 dari semester lalu
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="row g-3 mb-4">
      <!-- Mahasiswa by Jurusan Chart -->
      <div class="col-md-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-0">
            <h5 class="card-title mb-0">Distribusi Mahasiswa per Jurusan</h5>
          </div>
          <div class="card-body">
            <canvas ref="jurusanChart" height="300"></canvas>
          </div>
        </div>
      </div>

      <!-- Mahasiswa by Angkatan Chart -->
      <div class="col-md-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-0">
            <h5 class="card-title mb-0">Mahasiswa per Angkatan</h5>
          </div>
          <div class="card-body">
            <canvas ref="angkatanChart" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activities & Quick Actions -->
    <div class="row g-3">
      <!-- Recent Activities -->
      <div class="col-md-8">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-0">
            <h5 class="card-title mb-0">Aktivitas Terbaru</h5>
          </div>
          <div class="card-body">
            <div class="timeline">
              <div class="timeline-item" v-for="activity in recentActivities" :key="activity.id">
                <div class="timeline-marker" :class="`bg-${activity.type}`"></div>
                <div class="timeline-content">
                  <div class="d-flex justify-content-between">
                    <div>
                      <h6 class="mb-1">{{ activity.title }}</h6>
                      <p class="text-muted mb-0">{{ activity.description }}</p>
                    </div>
                    <small class="text-muted">{{ activity.time }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="col-md-4">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-0">
            <h5 class="card-title mb-0">Aksi Cepat</h5>
          </div>
          <div class="card-body">
            <div class="d-grid gap-2">
              <router-link to="/admin/mahasiswa/tambah" class="btn btn-primary">
                <i class="bi bi-person-plus me-2"></i>
                Tambah Mahasiswa Baru
              </router-link>
              <router-link to="/admin/laporan" class="btn btn-outline-primary">
                <i class="bi bi-file-earmark-text me-2"></i>
                Generate Laporan
              </router-link>
              <button class="btn btn-outline-secondary" @click="exportData">
                <i class="bi bi-download me-2"></i>
                Export Data Mahasiswa
              </button>
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

<style scoped>
.timeline {
  position: relative;
  padding-left: 30px;
}

.timeline-item {
  position: relative;
  padding-bottom: 20px;
}

.timeline-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: -21px;
  top: 20px;
  height: calc(100% - 5px);
  width: 2px;
  background-color: #e9ecef;
}

.timeline-marker {
  position: absolute;
  left: -25px;
  top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.bg-success { background-color: #28a745 !important; }
.bg-warning { background-color: #ffc107 !important; }
.bg-info { background-color: #17a2b8 !important; }
.bg-danger { background-color: #dc3545 !important; }
</style>