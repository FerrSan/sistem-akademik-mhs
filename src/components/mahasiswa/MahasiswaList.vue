<!-- src/components/mahasiswa/MahasiswaList.vue -->
<template>
  <div class="mahasiswa-list">
    <!-- Search Bar - akan disembunyikan karena sudah ada di parent -->
    <div v-if="showSearch" class="mb-6">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
        <input
          type="text"
          class="input-modern pl-10"
          placeholder="Cari berdasarkan nama, NIM, atau email..."
          v-model="searchQuery"
          @input="handleSearch"
        >
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center px-6 py-3 text-sm font-medium text-gray-600">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading mahasiswa data...
        </div>
      </div>

      <div v-else-if="paginatedData.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          {{ searchQuery ? 'Tidak ada data yang cocok dengan pencarian' : 'Tidak ada data mahasiswa' }}
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ searchQuery ? 'Coba gunakan kata kunci yang berbeda' : 'Belum ada mahasiswa yang terdaftar' }}
        </p>
      </div>

      <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
        <!-- Desktop Table View -->
        <div class="hidden md:block">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th 
                    @click="sortBy('nim')" 
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                  >
                    <div class="flex items-center space-x-1">
                      <span>NIM</span>
                      <svg v-if="sortField === 'nim'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </th>
                  <th 
                    @click="sortBy('nama')" 
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Nama</span>
                      <svg v-if="sortField === 'nama'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jurusan
                  </th>
                  <th 
                    @click="sortBy('angkatan')" 
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                  >
                    <div class="flex items-center space-x-1">
                      <span>Angkatan</span>
                      <svg v-if="sortField === 'angkatan'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IPK
                  </th>
                  <th v-if="showActions" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr 
                  v-for="mahasiswa in paginatedData" 
                  :key="mahasiswa.id" 
                  class="hover:bg-gray-50 transition-colors duration-150"
                  :class="{ 'cursor-pointer': !showActions }"
                  @click="!showActions && $emit('view', mahasiswa)"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ mahasiswa.nim }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <span class="text-sm font-medium text-white">
                            {{ mahasiswa.nama.charAt(0).toUpperCase() }}
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ mahasiswa.nama }}</div>
                        <div class="text-sm text-gray-500">{{ mahasiswa.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ mahasiswa.jurusan }}</div>
                    <div class="text-sm text-gray-500">{{ mahasiswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ mahasiswa.angkatan }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': mahasiswa.status === 'Aktif',
                        'bg-yellow-100 text-yellow-800': mahasiswa.status === 'Non-Aktif',
                        'bg-blue-100 text-blue-800': mahasiswa.status === 'Lulus'
                      }"
                    >
                      {{ mahasiswa.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">
                    {{ mahasiswa.ipk || '-' }}
                  </td>
                  <td v-if="showActions" class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div class="flex justify-center space-x-2">
                      <button 
                        @click="$emit('view', mahasiswa)"
                        class="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                        title="Lihat Detail"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </button>
                      <button 
                        @click="$emit('edit', mahasiswa)"
                        class="text-amber-600 hover:text-amber-900 transition-colors duration-150"
                        title="Edit"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                      </button>
                      <button 
                        @click="$emit('delete', mahasiswa)"
                        class="text-red-600 hover:text-red-900 transition-colors duration-150"
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
        </div>

        <!-- Mobile Card View -->
        <div class="md:hidden">
          <div class="space-y-4">
            <div 
              v-for="mahasiswa in paginatedData" 
              :key="mahasiswa.id" 
              class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              @click="$emit('view', mahasiswa)"
            >
              <div class="flex items-center space-x-3 mb-3">
                <div class="flex-shrink-0 h-12 w-12">
                  <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span class="text-lg font-medium text-white">
                      {{ mahasiswa.nama.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ mahasiswa.nama }}</p>
                  <p class="text-sm text-gray-500 truncate">{{ mahasiswa.nim }}</p>
                </div>
                <span 
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': mahasiswa.status === 'Aktif',
                    'bg-yellow-100 text-yellow-800': mahasiswa.status === 'Non-Aktif',
                    'bg-blue-100 text-blue-800': mahasiswa.status === 'Lulus'
                  }"
                >
                  {{ mahasiswa.status }}
                </span>
              </div>
              
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span class="text-gray-500">Jurusan:</span>
                  <span class="ml-1 font-medium">{{ mahasiswa.jurusan }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Angkatan:</span>
                  <span class="ml-1 font-medium">{{ mahasiswa.angkatan }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Email:</span>
                  <span class="ml-1 text-gray-700 truncate">{{ mahasiswa.email }}</span>
                </div>
                <div>
                  <span class="text-gray-500">IPK:</span>
                  <span class="ml-1 font-bold text-purple-600">{{ mahasiswa.ipk || '-' }}</span>
                </div>
              </div>

              <div v-if="showActions" class="mt-3 pt-3 border-t border-gray-200 flex justify-end space-x-3">
                <button 
                  @click.stop="$emit('view', mahasiswa)"
                  class="text-blue-600 hover:text-blue-800 transition-colors duration-150 text-sm font-medium"
                >
                  Lihat
                </button>
                <button 
                  @click.stop="$emit('edit', mahasiswa)"
                  class="text-amber-600 hover:text-amber-800 transition-colors duration-150 text-sm font-medium"
                >
                  Edit
                </button>
                <button 
                  @click.stop="$emit('delete', mahasiswa)"
                  class="text-red-600 hover:text-red-800 transition-colors duration-150 text-sm font-medium"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg">
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Menampilkan
            <span class="font-medium">{{ startIndex + 1 }}</span>
            sampai
            <span class="font-medium">{{ endIndex }}</span>
            dari
            <span class="font-medium">{{ filteredData.length }}</span>
            mahasiswa
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
                currentPage === page ? 'bg-blue-600 text-white ring-blue-600' : 'text-gray-900'
              ]"
            >
              {{ page }}
            </button>
            
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  mahasiswaList: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  showActions: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: false
  },
  itemsPerPage: {
    type: Number,
    default: 10
  }
})

// Emits
defineEmits(['view', 'edit', 'delete'])

// Data
const searchQuery = ref('')
const currentPage = ref(1)
const sortField = ref('nama')
const sortOrder = ref('asc')

// Computed
const filteredData = computed(() => {
  let data = [...props.mahasiswaList]
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    data = data.filter(m => 
      m.nama.toLowerCase().includes(query) ||
      m.nim.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query)
    )
  }
  
  // Apply sorting
  if (sortField.value) {
    data.sort((a, b) => {
      let aVal = a[sortField.value]
      let bVal = b[sortField.value]
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }
      
      if (sortOrder.value === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })
  }
  
  return data
})

const totalPages = computed(() => 
  Math.ceil(filteredData.value.length / props.itemsPerPage)
)

const startIndex = computed(() => 
  (currentPage.value - 1) * props.itemsPerPage
)

const endIndex = computed(() => 
  Math.min(startIndex.value + props.itemsPerPage, filteredData.value.length)
)

const paginatedData = computed(() => 
  filteredData.value.slice(startIndex.value, endIndex.value)
)

const displayedPages = computed(() => {
  const pages = []
  const maxPages = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxPages / 2))
  let end = Math.min(totalPages.value, start + maxPages - 1)
  
  if (end - start < maxPages - 1) {
    start = Math.max(1, end - maxPages + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const handleSearch = () => {
  currentPage.value = 1
}

const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortOrder.value = 'asc'
  }
}

// Watchers
watch(() => props.mahasiswaList, () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* Ensure proper transitions */
.transition-colors {
  transition-property: color, background-color, border-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>