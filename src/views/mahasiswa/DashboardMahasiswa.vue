<!-- src/views/mahasiswa/DashboardMahasiswa.vue -->
<template>
  <div class="dashboard-mahasiswa">
    <!-- Welcome Section -->
    <div class="mb-4">
      <h1 class="h3 mb-0">Dashboard Mahasiswa</h1>
      <p class="text-muted">Selamat datang, {{ mahasiswaData?.nama || 'Mahasiswa' }}</p>
                <button @click="authStore.logout" class="btn btn-outline-danger btn-sm">
      <i class="bi bi-box-arrow-right me-1"></i> Logout
    </button>
    </div>

    <!-- Profile Overview -->
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body text-center">
            <div class="mb-3">
              <i class="bi bi-person-circle" style="font-size: 4rem; color: #17a2b8;"></i>
            </div>
            <h5 class="mb-1">{{ mahasiswaData?.nama || '-' }}</h5>
            <p class="text-muted mb-2">{{ mahasiswaData?.nim || '-' }}</p>
            <span class="badge bg-info">{{ mahasiswaData?.jurusan || '-' }}</span>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="row g-3">
          <!-- Status Card -->
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="p-3 bg-success bg-opacity-10 rounded">
                    <i class="bi bi-check-circle text-success fs-3"></i>
                  </div>
                  <div class="ms-3">
                    <h6 class="text-muted mb-1">Status</h6>
                    <h5 class="mb-0">{{ mahasiswaData?.status || '-' }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- IPK Card -->
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="p-3 bg-primary bg-opacity-10 rounded">
                    <i class="bi bi-graph-up text-primary fs-3"></i>
                  </div>
                  <div class="ms-3">
                    <h6 class="text-muted mb-1">IPK</h6>
                    <h5 class="mb-0">{{ mahasiswaData?.ipk || '0.00' }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Angkatan Card -->
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="p-3 bg-warning bg-opacity-10 rounded">
                    <i class="bi bi-calendar text-warning fs-3"></i>
                  </div>
                  <div class="ms-3">
                    <h6 class="text-muted mb-1">Angkatan</h6>
                    <h5 class="mb-0">{{ mahasiswaData?.angkatan || '-' }}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Email Card -->
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="p-3 bg-info bg-opacity-10 rounded">
                    <i class="bi bi-envelope text-info fs-3"></i>
                  </div>
                  <div class="ms-3">
                    <h6 class="text-muted mb-1">Email</h6>
                    <p class="mb-0 text-truncate" style="max-width: 200px;">
                      {{ mahasiswaData?.email || '-' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Academic Information -->
    <div class="row">
      <div class="col-md-8">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">Informasi Akademik</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <th width="30%">NIM</th>
                    <td>{{ mahasiswaData?.nim || '-' }}</td>
                  </tr>
                  <tr>
                    <th>Nama Lengkap</th>
                    <td>{{ mahasiswaData?.nama || '-' }}</td>
                  </tr>
                  <tr>
                    <th>Program Studi</th>
                    <td>{{ mahasiswaData?.jurusan || '-' }}</td>
                  </tr>
                  <tr>
                    <th>Angkatan</th>
                    <td>{{ mahasiswaData?.angkatan || '-' }}</td>
                  </tr>
                  <tr>
                    <th>Status</th>
                    <td>
                      <span class="badge" :class="{
                        'bg-success': mahasiswaData?.status === 'Aktif',
                        'bg-warning': mahasiswaData?.status === 'Non-Aktif',
                        'bg-info': mahasiswaData?.status === 'Lulus'
                      }">{{ mahasiswaData?.status || '-' }}</span>
                    </td>
                  </tr>
                  <tr>
                    <th>IPK</th>
                    <td>{{ mahasiswaData?.ipk || '0.00' }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <!-- Quick Links -->
        <div class="card border-0 shadow-sm mb-3">
          <div class="card-header bg-white">
            <h5 class="mb-0">Menu Cepat</h5>
          </div>
          <div class="card-body">
            <div class="d-grid gap-2">
              <router-link to="/mahasiswa/nilai" class="btn btn-outline-primary text-start">
                <i class="bi bi-clipboard-data me-2"></i>
                Lihat Nilai
              </router-link>
              <router-link to="/mahasiswa/profil" class="btn btn-outline-info text-start">
                <i class="bi bi-person-gear me-2"></i>
                Update Profil
              </router-link>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="alert alert-info">
          <h6 class="alert-heading">
            <i class="bi bi-info-circle me-2"></i>
            Informasi
          </h6>
          <small>
            Jika ada perubahan data yang perlu dilakukan, silakan hubungi admin program studi.
          </small>
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

// Computed
const user = computed(() => authStore.user)

// Methods
const loadMahasiswaData = async () => {
  loading.value = true
  
  try {
    // Get mahasiswa data by NIM (username for mahasiswa)
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

// Lifecycle
onMounted(() => {
  loadMahasiswaData()
})
</script>

<style scoped>
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table th {
  font-weight: 500;
  color: #6c757d;
}
</style>