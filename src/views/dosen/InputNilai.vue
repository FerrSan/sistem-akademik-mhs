<!-- src/views/dosen/InputNilai.vue -->
<template>
  <div class="input-nilai-view">
    <!-- Page Header -->
    <div class="mb-4">
      <h1 class="h3 mb-0">Input Nilai Mahasiswa</h1>
      <p class="text-muted">Kelola nilai mahasiswa per semester</p>
    </div>

    <!-- Search Mahasiswa -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-header bg-white">
        <h5 class="mb-0">Cari Mahasiswa</h5>
      </div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Cari berdasarkan NIM atau Nama</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Masukkan NIM atau nama mahasiswa..."
                v-model="searchQuery"
                @input="handleSearch"
              >
            </div>
          </div>
          <div class="col-md-3">
            <label class="form-label">Jurusan</label>
            <select 
              class="form-select" 
              v-model="filterJurusan"
              @change="handleSearch"
            >
              <option value="">Semua Jurusan</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Angkatan</label>
            <select 
              class="form-select" 
              v-model="filterAngkatan"
              @change="handleSearch"
            >
              <option value="">Semua Angkatan</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>

        <!-- Search Results -->
        <div v-if="searchResults.length > 0" class="mt-4">
          <h6>Hasil Pencarian:</h6>
          <div class="list-group">
            <button
              v-for="mhs in searchResults"
              :key="mhs.id"
              type="button"
              class="list-group-item list-group-item-action"
              @click="selectMahasiswa(mhs)"
            >
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="mb-1">{{ mhs.nama }}</h6>
                  <small class="text-muted">{{ mhs.nim }} - {{ mhs.jurusan }}</small>
                </div>
                <div>
                  <span class="badge bg-primary">IPK: {{ mhs.ipk || '0.00' }}</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Nilai Form -->
    <div v-if="selectedMahasiswa" class="card border-0 shadow-sm">
      <div class="card-header bg-white">
        <h5 class="mb-0">Form Input Nilai</h5>
      </div>
      <div class="card-body">
        <NilaiForm
          :mahasiswa="selectedMahasiswa"
          :loading="saving"
          @submit="handleSubmitNilai"
        />
      </div>
    </div>

    <!-- Info -->
    <div v-else class="alert alert-info">
      <i class="bi bi-info-circle me-2"></i>
      Silakan cari dan pilih mahasiswa terlebih dahulu untuk input nilai
    </div>

    <!-- Success Modal -->
    <div 
      class="modal fade" 
      id="successModal" 
      tabindex="-1"
      ref="successModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Berhasil</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <i class="bi bi-check-circle text-success" style="font-size: 3rem;"></i>
              <p class="mt-3">Nilai berhasil disimpan!</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            <button type="button" class="btn btn-primary" @click="inputNilaiLain">
              Input Nilai Mahasiswa Lain
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMahasiswaStore } from '@/stores/mahasiswa'
import NilaiForm from '@/components/nilai/NilaiForm.vue'

const mahasiswaStore = useMahasiswaStore()

// Data
const searchQuery = ref('')
const filterJurusan = ref('')
const filterAngkatan = ref('')
const searchResults = ref([])
const selectedMahasiswa = ref(null)
const saving = ref(false)
const successModal = ref(null)
let modalInstance = null

// Computed
const mahasiswaList = computed(() => mahasiswaStore.mahasiswaList)

// Methods
const handleSearch = () => {
  if (!searchQuery.value && !filterJurusan.value && !filterAngkatan.value) {
    searchResults.value = []
    return
  }

  let results = mahasiswaList.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    results = results.filter(m => 
      m.nama.toLowerCase().includes(query) ||
      m.nim.toLowerCase().includes(query)
    )
  }

  // Filter by jurusan
  if (filterJurusan.value) {
    results = results.filter(m => m.jurusan === filterJurusan.value)
  }

  // Filter by angkatan
  if (filterAngkatan.value) {
    results = results.filter(m => m.angkatan === filterAngkatan.value)
  }

  // Limit results to 10
  searchResults.value = results.slice(0, 10)
}

const selectMahasiswa = (mahasiswa) => {
  selectedMahasiswa.value = mahasiswa
  searchResults.value = []
}

const handleSubmitNilai = async (nilaiData) => {
  saving.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In real app, you would save to backend
    console.log('Saving nilai:', nilaiData)
    
    // Update mahasiswa's IPK (in real app, this would be calculated on backend)
    const ipSemester = parseFloat(nilaiData.nilai.reduce((sum, n) => sum + n.bobot, 0) / 
                                 nilaiData.nilai.reduce((sum, n) => sum + n.sks, 0))
    
    // Show success modal
    if (modalInstance) {
      modalInstance.show()
    } else {
      alert('Nilai berhasil disimpan!')
      resetForm()
    }
  } catch (error) {
    console.error('Error saving nilai:', error)
    alert('Terjadi kesalahan saat menyimpan nilai')
  } finally {
    saving.value = false
  }
}

const inputNilaiLain = () => {
  if (modalInstance) {
    modalInstance.hide()
  }
  resetForm()
}

const resetForm = () => {
  selectedMahasiswa.value = null
  searchQuery.value = ''
  filterJurusan.value = ''
  filterAngkatan.value = ''
  searchResults.value = []
}

// Lifecycle
onMounted(async () => {
  // Load mahasiswa data
  await mahasiswaStore.fetchMahasiswa()
  
  // Initialize modal if using Bootstrap
  if (typeof window !== 'undefined' && window.bootstrap && successModal.value) {
    modalInstance = new window.bootstrap.Modal(successModal.value)
  }
})
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
  transition: all 0.2s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
  transform: translateX(5px);
}

.card-header {
  background-color: #f8f9fa !important;
}
</style>