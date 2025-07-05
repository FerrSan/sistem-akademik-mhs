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
            <h2 class="text-success mb-0">120</h2>
            <small class="text-muted">SKS Lulus</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body">
            <h6 class="text-muted">Mata Kuliah</h6>
            <h2 class="text-info mb-0">40</h2>
            <small class="text-muted">Selesai</small>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card border-0 shadow-sm text-center">
          <div class="card-body">
            <h6 class="text-muted">Semester</h6>
            <h2 class="text-warning mb-0">6</h2>
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
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
            <option value="4">Semester 4</option>
            <option value="5">Semester 5</option>
            <option value="6">Semester 6</option>
          </select>
        </div>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <tbody>
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
                            Belum ada data nilai
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
                        <td>{{ nilai.bobot }}</td>
                    </tr>
                </tbody>
                <tfoot v-if="filteredNilai.length > 0">
                    <tr>
                        <th colspan="2">Total</th>
                        <th>{{ totalSKS }}</th>
                        <th colspan="3" class="text-end">IP Semester:</th>
                        <th>{{ ipSemester }}</th>
                    </tr>
                </tfoot>
            </tbody>
        </table>
        </div>
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
                <td>Sangat Baik</td>
              </tr>
              <tr>
                <td><span class="badge bg-success">A-</span></td>
                <td>3.75</td>
                <td>Sangat Baik</td>
              </tr>
              <tr>
                <td><span class="badge bg-primary">B+</span></td>
                <td>3.50</td>
                <td>Baik</td>
              </tr>
              <tr>
                <td><span class="badge bg-primary">B</span></td>
                <td>3.00</td>
                <td>Baik</td>
              </tr>
            </table>
          </div>
          <div class="col-md-6">
            <table class="table table-sm">
                <tbody>
                    <tr>
                        <td><span class="badge bg-info">B-</span></td>
                        <td>2.75</td>
                        <td>Cukup Baik</td>
                    </tr>
                    <tr>
                        <td><span class="badge bg-warning">C+</span></td>
                        <td>2.50</td>
                        <td>Cukup</td>
                    </tr>
                    <tr>
                        <td><span class="badge bg-warning">C</span></td>
                        <td>2.00</td>
                        <td>Cukup</td>
                    </tr>
                    <tr>
                        <td><span class="badge bg-danger">D</span></td>
                        <td>1.00</td>
                        <td>Kurang</td>
                    </tr>
                </tbody>
            </table>
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
const selectedSemester = ref('')

// Sample nilai data
const nilaiList = ref([
  {
    id: 1,
    kodeMK: 'IF101',
    namaMK: 'Dasar Pemrograman',
    sks: 4,
    semester: 1,
    nilaiHuruf: 'A',
    nilaiAngka: 4.00,
    bobot: 16.00
  },
  {
    id: 2,
    kodeMK: 'IF102',
    namaMK: 'Struktur Data',
    sks: 3,
    semester: 2,
    nilaiHuruf: 'A-',
    nilaiAngka: 3.75,
    bobot: 11.25
  },
  {
    id: 3,
    kodeMK: 'IF201',
    namaMK: 'Algoritma & Pemrograman',
    sks: 4,
    semester: 2,
    nilaiHuruf: 'B+',
    nilaiAngka: 3.50,
    bobot: 14.00
  },
  {
    id: 4,
    kodeMK: 'IF301',
    namaMK: 'Basis Data',
    sks: 3,
    semester: 3,
    nilaiHuruf: 'A',
    nilaiAngka: 4.00,
    bobot: 12.00
  },
  {
    id: 5,
    kodeMK: 'IF302',
    namaMK: 'Pemrograman Web',
    sks: 3,
    semester: 3,
    nilaiHuruf: 'B+',
    nilaiAngka: 3.50,
    bobot: 10.50
  }
])

// Computed
const user = computed(() => authStore.user)

const filteredNilai = computed(() => {
  if (!selectedSemester.value) return nilaiList.value
  return nilaiList.value.filter(n => n.semester === parseInt(selectedSemester.value))
})

const totalSKS = computed(() => {
  return filteredNilai.value.reduce((sum, n) => sum + n.sks, 0)
})

const ipSemester = computed(() => {
  const totalBobot = filteredNilai.value.reduce((sum, n) => sum + n.bobot, 0)
  const totalSKS = filteredNilai.value.reduce((sum, n) => sum + n.sks, 0)
  return totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : '0.00'
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
    default:
      return 'bg-danger'
  }
}

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

// Lifecycle
onMounted(() => {
  loadMahasiswaData()
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
</style>