<!-- src/views/admin/LaporanView.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">📈 Laporan Mahasiswa</h1>
            <p class="text-xl text-gray-600">Generate dan download laporan data mahasiswa</p>
          </div>
          <button class="btn-modern btn-gradient-primary" @click="generateReport" :disabled="loading">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Download Laporan
          </button>
        </div>
      </div>

      <!-- Filter Card -->
      <div class="card-modern mb-6 animate-fade-in-up">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">🔍 Filter Laporan</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Jurusan</label>
              <select class="input-modern" v-model="filters.jurusan">
                <option value="">Semua Jurusan</option>
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Angkatan</label>
              <select class="input-modern" v-model="filters.angkatan">
                <option value="">Semua Angkatan</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select class="input-modern" v-model="filters.status">
                <option value="">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Non-Aktif">Non-Aktif</option>
                <option value="Lulus">Lulus</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Format</label>
              <select class="input-modern" v-model="format">
                <option value="csv">CSV</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview Table -->
      <div class="card-modern animate-fade-in-up">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">📄 Preview Data</h3>
          
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          
          <div v-else class="overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">No</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NIM</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jurusan</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Angkatan</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">IPK</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(mhs, index) in filteredData" :key="mhs.id" class="hover:bg-gray-50 transition-colors duration-200">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ mhs.nim }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ mhs.nama }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ mhs.jurusan }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ mhs.angkatan }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-3 py-1 text-xs font-semibold rounded-full" :class="{
                        'bg-green-100 text-green-800': mhs.status === 'Aktif',
                        'bg-yellow-100 text-yellow-800': mhs.status === 'Non-Aktif',
                        'bg-blue-100 text-blue-800': mhs.status === 'Lulus'
                      }">{{ mhs.status }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ mhs.ipk || '-' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
              <p class="text-sm font-medium text-gray-700">
                Total: <span class="text-blue-600">{{ filteredData.length }}</span> mahasiswa
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div class="card-modern animate-fade-in-up">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">📊 Statistik per Jurusan</h3>
            <div class="h-64">
              <canvas ref="jurusanChart" class="max-h-full w-full"></canvas>
            </div>
          </div>
        </div>
        
        <div class="card-modern animate-fade-in-up">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">📈 Statistik per Status</h3>
            <div class="h-64">
              <canvas ref="statusChart" class="max-h-full w-full"></canvas>
            </div>
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

