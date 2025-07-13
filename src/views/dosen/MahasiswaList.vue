<!-- src/views/dosen/MahasiswaList.vue -->
<template>
  <div class="mahasiswa-list-dosen">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Data Mahasiswa</h1>
      <button class="btn btn-success" @click="exportData">
        <i class="bi bi-download me-2"></i>
        Export Data
      </button>
    </div>

    <!-- Filters -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-search"></i>
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Cari nama, NIM, atau email..."
                v-model="filters.search"
                @input="updateFilters"
              >
            </div>
          </div>
          <div class="col-md-2">
            <select 
              class="form-select" 
              v-model="filters.jurusan"
              @change="updateFilters"
            >
              <option value="">Semua Jurusan</option>
              <option value="Teknik Informatika">Teknik Informatika</option>
              <option value="Sistem Informasi">Sistem Informasi</option>
            </select>
          </div>
          <div class="col-md-2">
            <select 
              class="form-select" 
              v-model="filters.angkatan"
              @change="updateFilters"
            >
              <option value="">Semua Angkatan</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div class="col-md-2">
            <button 
              class="btn btn-outline-secondary w-100"
              @click="clearFilters"
            >
              <i class="bi bi-arrow-clockwise me-2"></i>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Display -->
    <div class="card border-0 shadow-sm">
      <div class="card-body">
        <MahasiswaList
          :mahasiswaList="filteredMahasiswa"
          :loading="loading"
          :showActions="false"
          @view="viewDetail"
        />
      </div>
    </div>

    <!-- Detail Modal -->
    <div 
      class="modal fade" 
      id="detailModal" 
      tabindex="-1"
      ref="detailModal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detail Mahasiswa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <MahasiswaDetail 
              v-if="selectedMahasiswa"
              :mahasiswa="selectedMahasiswa"
              :showActions="false"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMahasiswaStore } from '@/stores/mahasiswa'
import MahasiswaList from '@/components/mahasiswa/MahasiswaList.vue'
import MahasiswaDetail from '@/components/mahasiswa/MahasiswaDetail.vue'

const mahasiswaStore = useMahasiswaStore()

// Data
const filters = ref({
  search: '',
  jurusan: '',
  angkatan: ''
})
const selectedMahasiswa = ref(null)
const detailModal = ref(null)
let modalInstance = null

// Computed
const loading = computed(() => mahasiswaStore.loading)
const filteredMahasiswa = computed(() => mahasiswaStore.filteredMahasiswa)

// Methods
const updateFilters = () => {
  mahasiswaStore.setFilters(filters.value)
}

const clearFilters = () => {
  filters.value = {
    search: '',
    jurusan: '',
    angkatan: ''
  }
  mahasiswaStore.clearFilters()
}

const viewDetail = (mahasiswa) => {
  selectedMahasiswa.value = mahasiswa
  if (modalInstance) {
    modalInstance.show()
  }
}

const exportData = () => {
  const data = filteredMahasiswa.value
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
onMounted(async () => {
  await mahasiswaStore.fetchMahasiswa()
  
  // Initialize modal if using Bootstrap
  if (typeof window !== 'undefined' && window.bootstrap && detailModal.value) {
    modalInstance = new window.bootstrap.Modal(detailModal.value)
  }
})
</script>

<style scoped>
/* Styles are handled by the imported components */
</style>