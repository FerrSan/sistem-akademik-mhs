<!-- src/views/dosen/DashboardDosen.vue -->
<template>
  <div class="dashboard-dosen">
    <!-- Page Header -->
    <div class="mb-4">
      <h1 class="h3 mb-0">Dashboard Dosen</h1>
      <p class="text-muted">Selamat datang, {{ userName }}</p>
                <button @click="authStore.logout" class="btn btn-outline-danger btn-sm">
      <i class="bi bi-box-arrow-right me-1"></i> Logout
    </button>
    </div>

    <!-- Statistics Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <div class="card border-0 shadow-sm card-hover">
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
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 shadow-sm card-hover">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 shadow-sm card-hover">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card border-0 shadow-sm card-hover">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0">
                <div class="p-3 bg-warning bg-opacity-10 rounded">
                  <i class="bi bi-award-fill text-warning fs-3"></i>
                </div>
              </div>
              <div class="flex-grow-1 ms-3">
                <h6 class="text-muted mb-1">Lulus</h6>
                <h3 class="mb-0">{{ stats.mahasiswaLulus }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Mahasiswa -->
    <div class="row">
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Daftar Mahasiswa Terbaru</h5>
            <router-link to="/dosen/mahasiswa" class="btn btn-sm btn-primary">
              Lihat Semua
            </router-link>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>NIM</th>
                    <th>Nama</th>
                    <th>Jurusan</th>
                    <th>Angkatan</th>
                    <th>Status</th>
                    <th>IPK</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="loading">
                    <td colspan="6" class="text-center py-4">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="recentMahasiswa.length === 0">
                    <td colspan="6" class="text-center text-muted py-4">
                      Tidak ada data mahasiswa
                    </td>
                  </tr>
                  <tr v-else v-for="mhs in recentMahasiswa" :key="mhs.id">
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
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="row mt-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">Aksi Cepat</h5>
          </div>
          <div class="card-body">
            <div class="d-grid gap-2">
              <router-link to="/dosen/mahasiswa" class="btn btn-outline-primary text-start">
                <i class="bi bi-people me-2"></i>
                Lihat Semua Mahasiswa
              </router-link>
              <button class="btn btn-outline-success text-start" @click="exportData">
                <i class="bi bi-download me-2"></i>
                Download Data Mahasiswa
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">Informasi</h5>
          </div>
          <div class="card-body">
            <div class="alert alert-info mb-0">
              <i class="bi bi-info-circle me-2"></i>
              Anda dapat melihat data mahasiswa melalui menu "Data Mahasiswa" di sidebar.
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

// Computed
const userName = computed(() => authStore.userName)
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

<style scoped>
.card-hover {
  transition: transform 0.2s;
}

.card-hover:hover {
  transform: translateY(-5px);
}
</style>