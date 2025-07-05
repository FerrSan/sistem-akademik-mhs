<!-- src/views/admin/LaporanView.vue -->
<template>
  <div class="laporan-view">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Laporan Mahasiswa</h1>
      <button class="btn btn-primary" @click="generateReport" :disabled="loading">
        <i class="bi bi-download me-2"></i>
        Download Laporan
      </button>
    </div>

    <!-- Filter Card -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <h5 class="card-title mb-3">Filter Laporan</h5>
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label">Jurusan</label>
            <select class="form-select" v-model="filters.jurusan">
              <option value="">Semua Jurusan</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Angkatan</label>
            <select class="form-select" v-model="filters.angkatan">
              <option value="">Semua Angkatan</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Status</label>
            <select class="form-select" v-model="filters.status">
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Non-Aktif">Non-Aktif</option>
              <option value="Lulus">Lulus</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Format</label>
            <select class="form-select" v-model="format">
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Table -->
    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white">
        <h5 class="mb-0">Preview Data</h5>
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>No</th>
                <th>NIM</th>
                <th>Nama</th>
                <th>Jurusan</th>
                <th>Angkatan</th>
                <th>Status</th>
                <th>IPK</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(mhs, index) in filteredData" :key="mhs.id">
                <td>{{ index + 1 }}</td>
                <td>{{ mhs.nim }}</td>
                <td>{{ mhs.nama }}</td>
                <td>{{ mhs.jurusan }}</td>
                <td>{{ mhs.angkatan }}</td>
                <td>
                  <span class="badge" :class="{
                    'bg-success': mhs.status === 'Aktif',
                    'bg-warning': mhs.status === 'Non-Aktif',
                    'bg-info': mhs.status === 'Lulus'
                  }">{{ mhs.status }}</span>
                </td>
                <td>{{ mhs.ipk || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-muted mt-3">
          Total: {{ filteredData.length }} mahasiswa
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="row g-3 mt-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h6 class="mb-0">Statistik per Jurusan</h6>
          </div>
          <div class="card-body">
            <canvas ref="jurusanChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h6 class="mb-0">Statistik per Status</h6>
          </div>
          <div class="card-body">
            <canvas ref="statusChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useMahasiswaStore } from '@/stores/mahasiswa'

const mahasiswaStore = useMahasiswaStore()

// Data
const filters = ref({
  jurusan: '',
  angkatan: '',
  status: ''
})
const format = ref('csv')
const loading = ref(false)

// Refs for charts
const jurusanChart = ref(null)
const statusChart = ref(null)

// Computed
const filteredData = computed(() => {
  let data = mahasiswaStore.mahasiswaList
  
  if (filters.value.jurusan) {
    data = data.filter(m => m.jurusan === filters.value.jurusan)
  }
  
  if (filters.value.angkatan) {
    data = data.filter(m => m.angkatan === filters.value.angkatan)
  }
  
  if (filters.value.status) {
    data = data.filter(m => m.status === filters.value.status)
  }
  
  return data
})

// Methods
const generateReport = async () => {
  if (format.value === 'csv') {
    generateCSV()
  } else {
    alert('Format PDF akan segera tersedia')
  }
}

const generateCSV = () => {
  const headers = ['No', 'NIM', 'Nama', 'Email', 'Jurusan', 'Angkatan', 'Status', 'IPK']
  const csvContent = [
    headers.join(','),
    ...filteredData.value.map((m, i) => [
      i + 1,
      m.nim,
      `"${m.nama}"`,
      m.email,
      m.jurusan,
      m.angkatan,
      m.status,
      m.ipk || ''
    ].join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `laporan_mahasiswa_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const updateCharts = () => {
  // Count by jurusan
  const jurusanCounts = {}
  filteredData.value.forEach(m => {
    jurusanCounts[m.jurusan] = (jurusanCounts[m.jurusan] || 0) + 1
  })
  
  // Count by status
  const statusCounts = {}
  filteredData.value.forEach(m => {
    statusCounts[m.status] = (statusCounts[m.status] || 0) + 1
  })
  
  // Update jurusan chart
  if (window.Chart && jurusanChart.value) {
    new Chart(jurusanChart.value.getContext('2d'), {
      type: 'pie',
      data: {
        labels: Object.keys(jurusanCounts),
        datasets: [{
          data: Object.values(jurusanCounts),
          backgroundColor: ['#667eea', '#48bb78', '#ed8936', '#f56565']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }
  
  // Update status chart
  if (window.Chart && statusChart.value) {
    new Chart(statusChart.value.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: ['#28a745', '#ffc107', '#17a2b8']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }
}

// Watchers
watch(filteredData, () => {
  updateCharts()
})

// Lifecycle
onMounted(async () => {
  loading.value = true
  await mahasiswaStore.fetchMahasiswa()
  loading.value = false
  
  // Load Chart.js and initialize charts
  if (!window.Chart) {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
    script.onload = () => {
      updateCharts()
    }
    document.head.appendChild(script)
  } else {
    updateCharts()
  }
})
</script>

<style scoped>
canvas {
  max-height: 200px;
}
</style>