<!-- src/views/admin/MahasiswaManagement.vue -->
<template>
  <div class="min-h-screen gradient-bg py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div class="mb-8 animate-fade-in-up">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">👨‍🎓 Manajemen Mahasiswa</h1>
            <p class="text-xl text-gray-600">Kelola data mahasiswa dengan mudah</p>
          </div>
          <router-link to="/admin/mahasiswa/tambah" class="btn-modern btn-gradient-primary">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Tambah Mahasiswa
          </router-link>
        </div>
      </div>

      <!-- Filters -->
      <div class="card-modern mb-6 animate-fade-in-up">
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
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
            <div>
              <button 
                class="btn-modern btn-outline w-full"
                @click="clearFilters"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-6 animate-fade-in">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
          {{ error }}
        </div>
      </div>

      <!-- Data Table -->
      <div v-else class="card-modern animate-fade-in-up">
        <div class="overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">NIM</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nama</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jurusan</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Angkatan</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">IPK</th>
                  <th class="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="filteredMahasiswa.length === 0">
                  <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                      </svg>
                      <p class="text-lg font-medium">Tidak ada data mahasiswa</p>
                    </div>
                  </td>
                </tr>
                <tr v-for="mahasiswa in paginatedMahasiswa" :key="mahasiswa.id" class="hover:bg-gray-50 transition-colors duration-200">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ mahasiswa.nim }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ mahasiswa.nama }}</div>
                        <div class="text-sm text-gray-500">{{ mahasiswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ mahasiswa.email }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ mahasiswa.jurusan }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ mahasiswa.angkatan }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex px-3 py-1 text-xs font-semibold rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': mahasiswa.status === 'Aktif',
                        'bg-yellow-100 text-yellow-800': mahasiswa.status === 'Non-Aktif',
                        'bg-blue-100 text-blue-800': mahasiswa.status === 'Lulus'
                      }"
                    >
                      {{ mahasiswa.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ mahasiswa.ipk || '-' }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-center">
                    <div class="flex justify-center space-x-2">
                      <button 
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        @click="viewDetail(mahasiswa)"
                        title="Lihat Detail"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </button>
                      <router-link 
                        :to="`/admin/mahasiswa/edit/${mahasiswa.id}`"
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                        title="Edit"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </router-link>
                      <button 
                        class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        @click="confirmDelete(mahasiswa)"
                        title="Hapus"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="flex justify-between items-center px-6 py-4 border-t border-gray-200">
            <div class="text-sm text-gray-700">
              Menampilkan <span class="font-medium">{{ startIndex + 1 }}</span> - <span class="font-medium">{{ endIndex }}</span> dari <span class="font-medium">{{ filteredMahasiswa.length }}</span> mahasiswa
            </div>
            <nav class="flex space-x-2">
              <button 
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <button 
                v-for="page in totalPages" 
                :key="page"
                class="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200"
                :class="{
                  'bg-blue-600 text-white': currentPage === page,
                  'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50': currentPage !== page
                }"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
              <button 
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </nav>
          </div>
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
            <div v-if="selectedMahasiswa" class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Informasi Pribadi</h4>
                  <dl class="space-y-3">
                    <div class="flex justify-between">
                      <dt class="text-sm font-medium text-gray-500">NIM</dt>
                      <dd class="text-sm font-semibold text-gray-900">{{ selectedMahasiswa.nim }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-sm font-medium text-gray-500">Nama</dt>
                      <dd class="text-sm font-semibold text-gray-900">{{ selectedMahasiswa.nama }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-sm font-medium text-gray-500">Email</dt>
                      <dd class="text-sm text-gray-900">{{ selectedMahasiswa.email }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-sm font-medium text-gray-500">Telepon</dt>
                      <dd class="text-sm text-gray-900">{{ selectedMahasiswa.telepon || '-' }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-sm font-medium text-gray-500">Jenis Kelamin</dt>
                      <dd class="text-sm text-gray-900">{{ selectedMahasiswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Informasi Akademik</h4>
                  <dl class="space-y-3">
                    <div class="flex justify-between">
                      <dt class="text-sm font-medium text-gray-500">Jurusan</dt>
                      <dd class="text-sm font-semibold text-gray-900">{{ selectedMahasiswa.jurusan }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-sm font-medium text-gray-500">Angkatan</dt>
                      <dd class="text-sm font-semibold text-gray-900">{{ selectedMahasiswa.angkatan }}</dd>
                    </div>
                    <div class="flex justify-between items-center">
                      <dt class="text-sm font-medium text-gray-500">Status</dt>
                      <dd>
                        <span 
                          class="inline-flex px-3 py-1 text-xs font-semibold rounded-full"
                          :class="{
                            'bg-green-100 text-green-800': selectedMahasiswa.status === 'Aktif',
                            'bg-yellow-100 text-yellow-800': selectedMahasiswa.status === 'Non-Aktif',
                            'bg-blue-100 text-blue-800': selectedMahasiswa.status === 'Lulus'
                          }"
                        >
                          {{ selectedMahasiswa.status }}
                        </span>
                      </dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-sm font-medium text-gray-500">IPK</dt>
                      <dd class="text-sm font-semibold text-gray-900">{{ selectedMahasiswa.ipk || '-' }}</dd>
                    </div>
                    <div class="flex justify-between">
                      <dt class="text-sm font-medium text-gray-500">Tanggal Lahir</dt>
                      <dd class="text-sm text-gray-900">{{ formatDate(selectedMahasiswa.tanggalLahir) }}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div class="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 class="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3">Alamat</h4>
              <p class="text-sm text-gray-900">{{ selectedMahasiswa.alamat || 'Alamat belum diisi' }}</p>
            </div>
            <div class="flex justify-end mt-8">
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

const mahasiswaStore = useMahasiswaStore()

// Data
const filters = ref({
  search: '',
  jurusan: '',
  angkatan: '',
  status: ''
})

const currentPage = ref(1)
const itemsPerPage = 10
const selectedMahasiswa = ref(null)

// Computed
const loading = computed(() => mahasiswaStore.loading)
const error = computed(() => mahasiswaStore.error)
const filteredMahasiswa = computed(() => mahasiswaStore.filteredMahasiswa)

const totalPages = computed(() => 
  Math.ceil(filteredMahasiswa.value.length / itemsPerPage)
)

const startIndex = computed(() => 
  (currentPage.value - 1) * itemsPerPage
)

const endIndex = computed(() => 
  Math.min(startIndex.value + itemsPerPage, filteredMahasiswa.value.length)
)

const paginatedMahasiswa = computed(() => 
  filteredMahasiswa.value.slice(startIndex.value, endIndex.value)
)

// Methods
const updateFilters = () => {
  currentPage.value = 1
  mahasiswaStore.setFilters(filters.value)
}

const clearFilters = () => {
  filters.value = {
    search: '',
    jurusan: '',
    angkatan: '',
    status: ''
  }
  mahasiswaStore.clearFilters()
  currentPage.value = 1
}

const viewDetail = (mahasiswa) => {
  selectedMahasiswa.value = mahasiswa
  document.getElementById('detailModal').classList.remove('hidden')
}

const closeModal = () => {
  document.getElementById('detailModal').classList.add('hidden')
  selectedMahasiswa.value = null
}

const confirmDelete = async (mahasiswa) => {
  if (confirm(`Apakah Anda yakin ingin menghapus ${mahasiswa.nama}?`)) {
    const result = await mahasiswaStore.deleteMahasiswa(mahasiswa.id)
    if (result.success) {
      alert(result.message)
    } else {
      alert(result.message)
    }
  }
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID')
}

// Lifecycle
onMounted(async () => {
  await mahasiswaStore.fetchMahasiswa()
})
</script>

