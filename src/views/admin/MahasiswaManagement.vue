<!-- src/views/admin/MahasiswaManagement.vue -->
<template>
  <div class="mahasiswa-management">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Manajemen Mahasiswa</h1>
      <router-link to="/admin/mahasiswa/tambah" class="btn btn-primary">
        <i class="bi bi-plus-circle me-2"></i>
        Tambah Mahasiswa
      </router-link>
    </div>

    <!-- Filters -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
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
            <select 
              class="form-select" 
              v-model="filters.status"
              @change="updateFilters"
            >
              <option value="">Semua Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Non-Aktif">Non-Aktif</option>
              <option value="Lulus">Lulus</option>
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

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger">
      <i class="bi bi-exclamation-triangle me-2"></i>
      {{ error }}
    </div>

    <!-- Data Table -->
    <div v-else class="card border-0 shadow-sm">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <tbody>
              <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Jurusan</th>
                <th>Angkatan</th>
                <th>Status</th>
                <th>IPK</th>
                <th class="text-center">Aksi</th>
              </tr>
            </tbody>
            <tbody>
              <tr v-if="filteredMahasiswa.length === 0">
                <td colspan="8" class="text-center text-muted py-4">
                  Tidak ada data mahasiswa
                </td>
              </tr>
              <tr v-for="mahasiswa in paginatedMahasiswa" :key="mahasiswa.id">
                <td>{{ mahasiswa.nim }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="avatar me-2">
                      <i class="bi bi-person-circle fs-4"></i>
                    </div>
                    <div>
                      <div class="fw-semibold">{{ mahasiswa.nama }}</div>
                      <small class="text-muted">{{ mahasiswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ mahasiswa.email }}</td>
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
                <td>
                  <div class="d-flex justify-content-center gap-1">
                    <button 
                      class="btn btn-sm btn-info text-white"
                      @click="viewDetail(mahasiswa)"
                      title="Lihat Detail"
                    >
                      <i class="bi bi-eye"></i>
                    </button>
                    <router-link 
                      :to="`/admin/mahasiswa/edit/${mahasiswa.id}`"
                      class="btn btn-sm btn-warning text-white"
                      title="Edit"
                    >
                      <i class="bi bi-pencil"></i>
                    </router-link>
                    <button 
                      class="btn btn-sm btn-danger"
                      @click="confirmDelete(mahasiswa)"
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
        <div class="d-flex justify-content-between align-items-center mt-3">
          <div class="text-muted">
            Menampilkan {{ startIndex + 1 }}-{{ endIndex }} dari {{ filteredMahasiswa.length }} mahasiswa
          </div>
          <nav>
            <ul class="pagination mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="currentPage--">
                  <i class="bi bi-chevron-left"></i>
                </button>
              </li>
              <li 
                v-for="page in totalPages" 
                :key="page"
                class="page-item" 
                :class="{ active: currentPage === page }"
              >
                <button class="page-link" @click="currentPage = page">
                  {{ page }}
                </button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="currentPage++">
                  <i class="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
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
          <div class="modal-body" v-if="selectedMahasiswa">
            <div class="row">
              <div class="col-md-6">
                <table class="table table-borderless">
                <tbody>
                  <tr>
                    <th width="35%">NIM</th>
                    <td>{{ selectedMahasiswa.nim }}</td>
                  </tr>
                  <tr>
                    <th>Nama</th>
                    <td>{{ selectedMahasiswa.nama }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ selectedMahasiswa.email }}</td>
                  </tr>
                  <tr>
                    <th>Telepon</th>
                    <td>{{ selectedMahasiswa.telepon || '-' }}</td>
                  </tr>
                  <tr>
                    <th>Jenis Kelamin</th>
                    <td>{{ selectedMahasiswa.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                  <table class="table table-borderless">
                      <tbody>
                          
                        <tr>
                            <th width="35%">Jurusan</th>
                            <td>{{ selectedMahasiswa.jurusan }}</td>
                        </tr>
                        <tr>
                            <th>Angkatan</th>
                            <td>{{ selectedMahasiswa.angkatan }}</td>
                        </tr>
                        <tr>
                            <th>Status</th>
                            <td>
                                <span 
                                class="badge"
                                :class="{
                                    'bg-success': selectedMahasiswa.status === 'Aktif',
                                    'bg-warning': selectedMahasiswa.status === 'Non-Aktif',
                                    'bg-info': selectedMahasiswa.status === 'Lulus'
                                }"
                      >
                      {{ selectedMahasiswa.status }}
                    </span>
                </td>
                  </tr>
                  <tr>
                      <th>IPK</th>
                      <td>{{ selectedMahasiswa.ipk || '-' }}</td>
                    </tr>
                    <tr>
                        <th>Tanggal Lahir</th>
                        <td>{{ formatDate(selectedMahasiswa.tanggalLahir) }}</td>
                    </tr>
                </tbody>
                </table>
            </div>
              <div class="col-12">
                <table class="table table-borderless">
                    <tbody>

                        <tr>
                            <th width="17.5%">Alamat</th>
                            <td>{{ selectedMahasiswa.alamat || '-' }}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
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
import { Modal } from 'bootstrap'

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
const detailModal = ref(null)
let modalInstance = null

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
  modalInstance.show()
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
  
  // Initialize modal
  if (detailModal.value) {
    modalInstance = new Modal(detailModal.value)
  }
})
</script>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  border-radius: 50%;
}

.table > :not(caption) > * > * {
  vertical-align: middle;
}

.btn-group-sm > .btn {
  padding: 0.25rem 0.5rem;
}

.pagination {
  --bs-pagination-padding-x: 0.75rem;
  --bs-pagination-padding-y: 0.375rem;
}

.badge {
  font-weight: 500;
}
</style>