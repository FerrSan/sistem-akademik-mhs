<!-- src/components/mahasiswa/MahasiswaList.vue -->
<template>
  <div class="mahasiswa-list">
    <!-- Search Bar -->
    <div class="search-section mb-3">
      <div class="input-group">
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
        <input
          type="text"
          class="form-control"
          placeholder="Cari berdasarkan nama, NIM, atau email..."
          v-model="searchQuery"
          @input="handleSearch"
        >
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th @click="sortBy('nim')" class="cursor-pointer">
              NIM
              <i v-if="sortField === 'nim'" :class="sortIcon"></i>
            </th>
            <th @click="sortBy('nama')" class="cursor-pointer">
              Nama
              <i v-if="sortField === 'nama'" :class="sortIcon"></i>
            </th>
            <th>Email</th>
            <th>Jurusan</th>
            <th @click="sortBy('angkatan')" class="cursor-pointer">
              Angkatan
              <i v-if="sortField === 'angkatan'" :class="sortIcon"></i>
            </th>
            <th>Status</th>
            <th>IPK</th>
            <th v-if="showActions" class="text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td :colspan="showActions ? 8 : 7" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="paginatedData.length === 0">
            <td :colspan="showActions ? 8 : 7" class="text-center text-muted py-4">
              {{ searchQuery ? 'Tidak ada data yang cocok dengan pencarian' : 'Tidak ada data mahasiswa' }}
            </td>
          </tr>
          <tr v-else v-for="mahasiswa in paginatedData" :key="mahasiswa.id">
            <td>{{ mahasiswa.nim }}</td>
            <td>
              <div class="d-flex align-items-center">
                <div class="avatar-sm me-2">
                  <i class="bi bi-person-circle"></i>
                </div>
                <div>
                  <div class="fw-semibold">{{ mahasiswa.nama }}</div>
                  <small class="text-muted">{{ mahasiswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</small>
                </div>
              </div>
            </td>
            <td>
              <small>{{ mahasiswa.email }}</small>
            </td>
            <td>{{ mahasiswa.jurusan }}</td>
            <td>{{ mahasiswa.angkatan }}</td>
            <td>
              <span 
                class="badge"
                :class="{
                  'bg-success': mahasiswa.status === 'Aktif',
                  'bg-warning': mahasiswa.status === 'Non-Aktif',
                  'bg-info': mahasiswa.status === 'Lulus'
                }"
              >
                {{ mahasiswa.status }}
              </span>
            </td>
            <td>{{ mahasiswa.ipk || '-' }}</td>
            <td v-if="showActions">
              <div class="d-flex justify-content-center gap-1">
                <button 
                  class="btn btn-sm btn-info text-white"
                  @click="$emit('view', mahasiswa)"
                  title="Lihat Detail"
                >
                  <i class="bi bi-eye"></i>
                </button>
                <button 
                  class="btn btn-sm btn-warning text-white"
                  @click="$emit('edit', mahasiswa)"
                  title="Edit"
                >
                  <i class="bi bi-pencil"></i>
                </button>
                <button 
                  class="btn btn-sm btn-danger"
                  @click="$emit('delete', mahasiswa)"
                  title="Hapus"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="d-flex justify-content-between align-items-center mt-3">
      <div class="text-muted">
        Menampilkan {{ startIndex + 1 }}-{{ endIndex }} dari {{ filteredData.length }} mahasiswa
      </div>
      <nav>
        <ul class="pagination mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">
              <i class="bi bi-chevron-left"></i>
            </button>
          </li>
          <li 
            v-for="page in displayedPages" 
            :key="page"
            class="page-item" 
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="currentPage = page">
              {{ page }}
            </button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">
              <i class="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
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

const sortIcon = computed(() => {
  return sortOrder.value === 'asc' ? 'bi bi-arrow-up' : 'bi bi-arrow-down'
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
.avatar-sm {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  border-radius: 50%;
  font-size: 1.2rem;
  color: #6c757d;
}

.cursor-pointer {
  cursor: pointer;
  user-select: none;
}

.cursor-pointer:hover {
  text-decoration: underline;
}

th i {
  font-size: 0.8rem;
  margin-left: 0.25rem;
}

.table > :not(caption) > * > * {
  vertical-align: middle;
}
</style>