<!-- src/views/dosen/MahasiswaList.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">👨‍🎓 Data Mahasiswa</h1>
            <p class="text-xl text-gray-600">Kelola dan pantau data mahasiswa</p>
          </div>
          <button class="btn-modern btn-gradient-success" @click="exportData">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export Data
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="card-modern mb-6 animate-fade-in-up">
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="md:col-span-2">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  class="input-modern pl-10"
                  placeholder="Cari nama, NIM, atau email..."
                  v-model="filters.search"
                  @input="updateFilters"
                >
              </div>
            </div>
            <div>
              <select 
                class="input-modern" 
                v-model="filters.jurusan"
                @change="updateFilters"
              >
                <option value="">Semua Jurusan</option>
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
              </select>
            </div>
            <div>
              <select 
                class="input-modern" 
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
          </div>
          <div class="mt-4 flex justify-end">
            <button 
              class="btn-modern btn-outline"
              @click="clearFilters"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Reset Filter
            </button>
          </div>
        </div>
      </div>

      <!-- Data Display -->
      <div class="card-modern animate-fade-in-up">
        <div class="p-6">
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
        class="fixed inset-0 z-50 overflow-y-auto hidden"
        id="detailModal" 
        ref="detailModal"
      >
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>
          <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900">🎓 Detail Mahasiswa</h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div v-if="selectedMahasiswa">
              <MahasiswaDetail 
                :mahasiswa="selectedMahasiswa"
                :showActions="false"
              />
            </div>
            <div class="flex justify-end mt-6">
              <button @click="closeModal" class="btn-modern btn-outline">
                Tutup
              </button>
            </div>
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
  document.getElementById('detailModal').classList.remove('hidden')
}

const closeModal = () => {
  document.getElementById('detailModal').classList.add('hidden')
  selectedMahasiswa.value = null
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
})
</script>

<style scoped>
/* Styles are handled by the imported components */
</style>