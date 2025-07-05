<template>
  <div class="mahasiswa-list">
    <div class="mb-4">
      <h1 class="h4 mb-0">Daftar Mahasiswa</h1>
      <p class="text-muted">Lihat dan cari data mahasiswa</p>
    </div>

    <!-- Search Bar -->
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        v-model="searchQuery"
        placeholder="Cari berdasarkan nama atau NIM..."
      />
    </div>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Memuat...</span>
      </div>
    </div>

    <!-- Tabel Mahasiswa -->
    <div v-else>
      <div v-if="filteredMahasiswa.length > 0" class="table-responsive">
        <table class="table table-bordered table-hover">
          <thead class="table-light">
            <tr>
              <th>#</th>
              <th>NIM</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Jurusan</th>
              <th>Angkatan</th>
              <th>Status</th>
              <th class="text-center">IPK</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(mhs, index) in filteredMahasiswa"
              :key="mhs.id"
              :class="{ 'table-active': index % 2 === 0 }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ mhs.nim }}</td>
              <td>{{ mhs.nama }}</td>
              <td>{{ mhs.email }}</td>
              <td>{{ mhs.jurusan }}</td>
              <td>{{ mhs.angkatan }}</td>
              <td>
                <span
                  class="badge"
                  :class="{
                    'bg-success': mhs.status === 'Aktif',
                    'bg-secondary': mhs.status === 'Lulus',
                    'bg-danger': mhs.status === 'Cuti'
                  }"
                >
                  {{ mhs.status }}
                </span>
              </td>
              <td class="text-center">
                <span
                  :class="{
                    'text-danger': mhs.ipk < 2.5,
                    'text-warning': mhs.ipk >= 2.5 && mhs.ipk < 3.5,
                    'text-success': mhs.ipk >= 3.5
                  }"
                >
                  {{ mhs.ipk.toFixed(2) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="alert alert-warning text-center">
        Tidak ada data mahasiswa ditemukan.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import mahasiswaService from '@/services/mahasiswaService'

// State
const mahasiswa = ref([])
const loading = ref(true)
const searchQuery = ref('')

// Ambil data mahasiswa
const fetchMahasiswa = async () => {
  loading.value = true
  try {
    const result = await mahasiswaService.getAll()
    if (result.success) {
      mahasiswa.value = result.data
    } else {
      alert(result.message)
    }
  } catch (error) {
    alert('Gagal memuat data mahasiswa.')
  } finally {
    loading.value = false
  }
}

// Panggil saat komponen dimount
onMounted(fetchMahasiswa)

// Filter pencarian
const filteredMahasiswa = computed(() => {
  if (!searchQuery.value) return mahasiswa.value
  const query = searchQuery.value.toLowerCase()
  return mahasiswa.value.filter(m =>
    m.nama?.toLowerCase().includes(query) ||
    m.nim?.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
.table th,
.table td {
  vertical-align: middle;
}

.table-hover tbody tr:hover {
  background-color: #f1f5f9;
}

input.form-control {
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 1rem;
}

.badge {
  font-size: 0.9rem;
  padding: 0.4em 0.6em;
  border-radius: 0.4rem;
}

.text-success {
  font-weight: 600;
}

.text-danger,
.text-warning {
  font-weight: 600;
}
</style>
