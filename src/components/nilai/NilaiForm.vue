<!-- src/components/nilai/NilaiForm.vue -->
<template>
  <div class="nilai-form">
    <form @submit.prevent="handleSubmit">
      <!-- Mahasiswa Info -->
      <div class="mahasiswa-info mb-4 p-3 bg-light rounded">
        <div class="row align-items-center">
          <div class="col-auto">
            <div class="avatar-sm">
              <i class="bi bi-person-circle"></i>
            </div>
          </div>
          <div class="col">
            <h6 class="mb-0">{{ mahasiswa?.nama }}</h6>
            <small class="text-muted">{{ mahasiswa?.nim }} - {{ mahasiswa?.jurusan }}</small>
          </div>
          <div class="col-auto">
            <span class="badge bg-primary">IPK: {{ currentIPK }}</span>
          </div>
        </div>
      </div>

      <!-- Semester Selection -->
      <div class="mb-4">
        <label class="form-label">Semester</label>
        <select 
          class="form-select" 
          v-model="selectedSemester"
          @change="loadNilaiSemester"
        >
          <option value="">Pilih Semester</option>
          <option v-for="sem in availableSemesters" :key="sem" :value="sem">
            Semester {{ sem }}
          </option>
        </select>
      </div>

      <!-- Nilai Table -->
      <div v-if="selectedSemester" class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th width="15%">Kode MK</th>
              <th width="35%">Mata Kuliah</th>
              <th width="10%">SKS</th>
              <th width="15%">Nilai Angka</th>
              <th width="15%">Nilai Huruf</th>
              <th width="10%">Bobot</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="mataKuliahList.length === 0">
              <td colspan="6" class="text-center py-3 text-muted">
                Tidak ada mata kuliah untuk semester ini
              </td>
            </tr>
            <tr v-for="(mk, index) in mataKuliahList" :key="mk.id">
              <td>{{ mk.kode }}</td>
              <td>{{ mk.nama }}</td>
              <td class="text-center">{{ mk.sks }}</td>
              <td>
                <input
                  type="number"
                  class="form-control form-control-sm text-center"
                  v-model.number="nilaiData[index].nilaiAngka"
                  @input="updateNilaiHuruf(index)"
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="0-100"
                >
              </td>
              <td>
                <input
                  type="text"
                  class="form-control form-control-sm text-center"
                  v-model="nilaiData[index].nilaiHuruf"
                  readonly
                  :class="getNilaiClass(nilaiData[index].nilaiHuruf)"
                >
              </td>
              <td class="text-center">
                {{ nilaiData[index].bobot.toFixed(2) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th colspan="2" class="text-end">Total</th>
              <th class="text-center">{{ totalSKS }}</th>
              <th colspan="2" class="text-end">IP Semester:</th>
              <th class="text-center">{{ ipSemester }}</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Form Actions -->
      <div v-if="selectedSemester" class="form-actions mt-4">
        <div class="row">
          <div class="col-md-6">
            <div class="alert alert-info mb-0">
              <i class="bi bi-info-circle me-2"></i>
              <small>Input nilai angka (0-100), nilai huruf akan otomatis terkonversi</small>
            </div>
          </div>
          <div class="col-md-6 text-end">
            <button 
              type="button" 
              class="btn btn-secondary me-2"
              @click="resetForm"
            >
              <i class="bi bi-arrow-clockwise me-2"></i>
              Reset
            </button>
            <button 
              type="submit" 
              class="btn btn-success"
              :disabled="loading || !hasChanges"
            >
              <span v-if="loading">
                <span class="spinner-border spinner-border-sm me-2"></span>
                Menyimpan...
              </span>
              <span v-else>
                <i class="bi bi-check-circle me-2"></i>
                Simpan Nilai
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>

    <!-- Grade Reference -->
    <div class="mt-4">
      <h6>Referensi Konversi Nilai</h6>
      <div class="row">
        <div class="col-md-6">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Nilai Angka</th>
                <th>Nilai Huruf</th>
                <th>Bobot</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>85-100</td><td>A</td><td>4.00</td></tr>
              <tr><td>80-84</td><td>A-</td><td>3.75</td></tr>
              <tr><td>75-79</td><td>B+</td><td>3.50</td></tr>
              <tr><td>70-74</td><td>B</td><td>3.00</td></tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-6">
          <table class="table table-sm">
            <thead>
              <tr>
                <th>Nilai Angka</th>
                <th>Nilai Huruf</th>
                <th>Bobot</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>65-69</td><td>B-</td><td>2.75</td></tr>
              <tr><td>60-64</td><td>C+</td><td>2.50</td></tr>
              <tr><td>55-59</td><td>C</td><td>2.00</td></tr>
              <tr><td>40-54</td><td>D</td><td>1.00</td></tr>
              <tr><td>0-39</td><td>E</td><td>0.00</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props
const props = defineProps({
  mahasiswa: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['submit'])

// Data
const selectedSemester = ref('')
const nilaiData = ref([])
const originalData = ref([])
const hasChanges = ref(false)

// Sample mata kuliah data
const mataKuliahData = {
  1: [
    { id: 1, kode: 'IF101', nama: 'Dasar Pemrograman', sks: 4 },
    { id: 2, kode: 'IF102', nama: 'Matematika Diskrit', sks: 3 },
    { id: 3, kode: 'IF103', nama: 'Pengantar Teknologi Informasi', sks: 2 },
    { id: 4, kode: 'IF104', nama: 'Algoritma dan Struktur Data', sks: 4 },
    { id: 5, kode: 'UNI101', nama: 'Bahasa Indonesia', sks: 2 },
    { id: 6, kode: 'UNI102', nama: 'Bahasa Inggris', sks: 2 }
  ],
  2: [
    { id: 7, kode: 'IF201', nama: 'Pemrograman Berorientasi Objek', sks: 4 },
    { id: 8, kode: 'IF202', nama: 'Basis Data', sks: 3 },
    { id: 9, kode: 'IF203', nama: 'Sistem Operasi', sks: 3 },
    { id: 10, kode: 'IF204', nama: 'Jaringan Komputer', sks: 3 },
    { id: 11, kode: 'IF205', nama: 'Statistika', sks: 3 }
  ],
  3: [
    { id: 12, kode: 'IF301', nama: 'Pemrograman Web', sks: 3 },
    { id: 13, kode: 'IF302', nama: 'Rekayasa Perangkat Lunak', sks: 3 },
    { id: 14, kode: 'IF303', nama: 'Sistem Informasi', sks: 3 },
    { id: 15, kode: 'IF304', nama: 'Kecerdasan Buatan', sks: 3 },
    { id: 16, kode: 'IF305', nama: 'Interaksi Manusia Komputer', sks: 3 }
  ]
}

// Computed
const availableSemesters = computed(() => {
  // Calculate available semesters based on angkatan
  if (!props.mahasiswa?.angkatan) return []
  
  const currentYear = new Date().getFullYear()
  const entryYear = parseInt(props.mahasiswa.angkatan)
  const yearDiff = currentYear - entryYear
  const maxSemester = Math.min(yearDiff * 2 + 1, 8)
  
  return Array.from({ length: maxSemester }, (_, i) => i + 1)
})

const mataKuliahList = computed(() => {
  return mataKuliahData[selectedSemester.value] || []
})

const totalSKS = computed(() => {
  return mataKuliahList.value.reduce((sum, mk) => sum + mk.sks, 0)
})

const ipSemester = computed(() => {
  if (nilaiData.value.length === 0) return '0.00'
  
  const totalBobot = nilaiData.value.reduce((sum, nilai) => sum + nilai.bobot, 0)
  const totalSKS = mataKuliahList.value.reduce((sum, mk) => sum + mk.sks, 0)
  
  return totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : '0.00'
})

const currentIPK = computed(() => {
  return props.mahasiswa?.ipk?.toFixed(2) || '0.00'
})

// Methods
const loadNilaiSemester = () => {
  // Initialize nilai data for selected semester
  nilaiData.value = mataKuliahList.value.map(mk => ({
    mataKuliahId: mk.id,
    kode: mk.kode,
    nama: mk.nama,
    sks: mk.sks,
    nilaiAngka: 0,
    nilaiHuruf: 'E',
    bobot: 0
  }))
  
  // Store original data for comparison
  originalData.value = JSON.parse(JSON.stringify(nilaiData.value))
  hasChanges.value = false
}

const konversiNilai = (nilaiAngka) => {
  if (nilaiAngka >= 85) return { huruf: 'A', bobot: 4.00 }
  if (nilaiAngka >= 80) return { huruf: 'A-', bobot: 3.75 }
  if (nilaiAngka >= 75) return { huruf: 'B+', bobot: 3.50 }
  if (nilaiAngka >= 70) return { huruf: 'B', bobot: 3.00 }
  if (nilaiAngka >= 65) return { huruf: 'B-', bobot: 2.75 }
  if (nilaiAngka >= 60) return { huruf: 'C+', bobot: 2.50 }
  if (nilaiAngka >= 55) return { huruf: 'C', bobot: 2.00 }
  if (nilaiAngka >= 40) return { huruf: 'D', bobot: 1.00 }
  return { huruf: 'E', bobot: 0.00 }
}

const updateNilaiHuruf = (index) => {
  const nilai = nilaiData.value[index]
  const nilaiAngka = nilai.nilaiAngka || 0
  
  // Validate input
  if (nilaiAngka < 0) nilai.nilaiAngka = 0
  if (nilaiAngka > 100) nilai.nilaiAngka = 100
  
  // Convert nilai
  const konversi = konversiNilai(nilai.nilaiAngka)
  nilai.nilaiHuruf = konversi.huruf
  nilai.bobot = konversi.bobot * nilai.sks
  
  // Check for changes
  checkChanges()
}

const checkChanges = () => {
  hasChanges.value = JSON.stringify(nilaiData.value) !== JSON.stringify(originalData.value)
}

const getNilaiClass = (nilaiHuruf) => {
  const classes = {
    'A': 'text-success fw-bold',
    'A-': 'text-success',
    'B+': 'text-primary fw-bold',
    'B': 'text-primary',
    'B-': 'text-info',
    'C+': 'text-warning',
    'C': 'text-warning',
    'D': 'text-danger',
    'E': 'text-danger fw-bold'
  }
  return classes[nilaiHuruf] || ''
}

const resetForm = () => {
  if (confirm('Reset semua nilai ke 0?')) {
    nilaiData.value.forEach(nilai => {
      nilai.nilaiAngka = 0
      nilai.nilaiHuruf = 'E'
      nilai.bobot = 0
    })
    checkChanges()
  }
}

const handleSubmit = () => {
  const dataToSubmit = {
    mahasiswaId: props.mahasiswa.id,
    semester: selectedSemester.value,
    nilai: nilaiData.value.map(n => ({
      mataKuliahId: n.mataKuliahId,
      nilaiAngka: n.nilaiAngka,
      nilaiHuruf: n.nilaiHuruf,
      bobot: n.bobot
    }))
  }
  
  emit('submit', dataToSubmit)
}

// Watchers
watch(selectedSemester, (newVal) => {
  if (newVal) {
    loadNilaiSemester()
  }
})
</script>

<style scoped>
.avatar-sm {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  border-radius: 50%;
  font-size: 1.5rem;
  color: #6c757d;
}

.mahasiswa-info {
  border: 1px solid #dee2e6;
}

.form-control-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  font-size: 0.875rem;
}

.table td {
  vertical-align: middle;
}

tfoot th {
  background-color: #e9ecef;
}
</style>