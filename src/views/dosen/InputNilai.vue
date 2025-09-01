<!-- src/views/dosen/InputNilai.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-3">
            ✏️ Input Nilai Mahasiswa
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Kelola dan input nilai mahasiswa per semester dengan sistem yang mudah dan akurat
          </p>
        </div>
      </div>

      <!-- Search Mahasiswa -->
      <div class="card-modern mb-8 animate-fade-in-up delay-100">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">🔍 Cari Mahasiswa</h2>
              <p class="text-gray-600 mt-1">Temukan mahasiswa berdasarkan NIM, nama, jurusan, atau angkatan</p>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2">
              <label class="block text-sm font-semibold text-gray-700 mb-3">Cari berdasarkan NIM atau Nama</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  class="input-modern pl-12"
                  placeholder="Masukkan NIM atau nama mahasiswa..."
                  v-model="searchQuery"
                  @input="handleSearch"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Jurusan</label>
              <select 
                class="input-modern" 
                v-model="filterJurusan"
                @change="handleSearch"
              >
                <option value="">Semua Jurusan</option>
                <option value="Teknik Informatika">Teknik Informatika</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Angkatan</label>
              <select 
                class="input-modern" 
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
          <div v-if="searchResults.length > 0" class="mt-8">
            <div class="flex items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-900">📝 Hasil Pencarian</h3>
              <span class="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {{ searchResults.length }} mahasiswa ditemukan
              </span>
            </div>
            <div class="grid gap-4">
              <button
                v-for="(mhs, index) in searchResults"
                :key="mhs.id"
                type="button"
                class="group p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 text-left transform hover:scale-105"
                :class="{'animate-slide-in-right': index < 5}"
                @click="selectMahasiswa(mhs)"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {{ mhs.nama.charAt(0) }}
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{{ mhs.nama }}</h4>
                      <p class="text-gray-600 font-mono">{{ mhs.nim }} • {{ mhs.jurusan }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="badge-modern bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                      IPK: {{ (mhs.ipk || 0).toFixed(2) }}
                    </span>
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Nilai Form -->
      <div v-if="selectedMahasiswa" class="card-modern animate-fade-in-up delay-200">
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">📝 Form Input Nilai</h2>
              <p class="text-gray-600 mt-1">Input nilai untuk mahasiswa yang dipilih</p>
            </div>
          </div>
        </div>
        
        <div class="p-6">
          <NilaiForm
            :mahasiswa="selectedMahasiswa"
            :loading="saving"
            @submit="handleSubmitNilai"
          />
        </div>
      </div>

      <!-- Info Message -->
      <div v-else class="card-modern animate-fade-in-up delay-300">
        <div class="p-8 text-center">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Pilih Mahasiswa</h3>
          <p class="text-gray-600 max-w-md mx-auto">
            Silakan cari dan pilih mahasiswa terlebih dahulu untuk memulai input nilai. 
            Gunakan kolom pencarian di atas untuk menemukan mahasiswa berdasarkan NIM atau nama.
          </p>
        </div>
      </div>

      <!-- Success Modal -->
      <div 
        v-if="showSuccessModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fade-in-up"
        @click="closeSuccessModal"
      >
        <div class="card-modern max-w-md mx-4" @click.stop>
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-gray-900">✅ Berhasil!</h3>
              <button 
                @click="closeSuccessModal"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="p-6 text-center">
            <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <p class="text-lg font-semibold text-gray-900 mb-6">Nilai berhasil disimpan!</p>
            <div class="flex space-x-3">
              <button 
                @click="closeSuccessModal"
                class="btn-modern bg-gray-100 text-gray-700 hover:bg-gray-200 flex-1"
              >
                Tutup
              </button>
              <button 
                @click="inputNilaiLain"
                class="btn-modern btn-gradient-primary flex-1"
              >
                Input Nilai Lain
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
import NilaiForm from '@/components/nilai/NilaiForm.vue'
import nilaiService from '@/services/nilaiService'

const mahasiswaStore = useMahasiswaStore()

// Data
const searchQuery = ref('')
const filterJurusan = ref('')
const filterAngkatan = ref('')
const searchResults = ref([])
const selectedMahasiswa = ref(null)
const saving = ref(false)
const showSuccessModal = ref(false)

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
    // Save nilai to backend
    const result = await nilaiService.saveNilai(nilaiData)
    
    if (result.success) {
      // Show success modal
      showSuccessModal.value = true
    } else {
      alert(result.message || 'Gagal menyimpan nilai')
    }
  } catch (error) {
    console.error('Error saving nilai:', error)
    alert('Terjadi kesalahan saat menyimpan nilai')
  } finally {
    saving.value = false
  }
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const inputNilaiLain = () => {
  showSuccessModal.value = false
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