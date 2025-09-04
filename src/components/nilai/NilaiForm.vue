<!-- src/components/nilai/NilaiForm.vue -->
<template>
  <div class="nilai-form">
    <form @submit.prevent="handleSubmit">
      <!-- Mahasiswa Info -->
      <div class="mahasiswa-info mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="avatar-sm">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {{ mahasiswa?.nama?.charAt(0) || 'M' }}
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-1">{{ mahasiswa?.nama }}</h3>
              <p class="text-gray-600 font-mono">{{ mahasiswa?.nim }} • {{ mahasiswa?.jurusan }}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="badge-modern bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-lg">
              🎆 IPK: {{ currentIPK }}
            </div>
          </div>
        </div>
      </div>

      <!-- Semester Selection -->
      <div class="mb-8">
        <label class="block text-sm font-semibold text-gray-700 mb-4">📅 Pilih Semester</label>
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <button
            v-for="sem in availableSemesters" 
            :key="sem"
            type="button"
            class="semester-button"
            :class="{ 'active': selectedSemester === sem }"
            @click="selectSemester(sem)"
          >
            <div class="text-lg font-bold">{{ sem }}</div>
            <div class="text-xs opacity-75">Semester</div>
          </button>
        </div>
      </div>

      <!-- Nilai Table -->
      <div v-if="selectedSemester" class="space-y-6">
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold text-gray-900">📚 Input Nilai Semester {{ selectedSemester }}</h3>
          <div class="badge-modern bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2">
            Total: {{ totalSKS }} SKS
          </div>
        </div>
        
        <div class="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
          <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div class="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">
              <div class="col-span-2">Kode MK</div>
              <div class="col-span-4">Mata Kuliah</div>
              <div class="col-span-1 text-center">SKS</div>
              <div class="col-span-2 text-center">Nilai Angka</div>
              <div class="col-span-2 text-center">Nilai Huruf</div>
              <div class="col-span-1 text-center">Bobot</div>
            </div>
          </div>
          <div class="bg-white">
            <div v-if="mataKuliahList.length === 0" class="p-8 text-center">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <p class="text-gray-500 text-lg">Tidak ada mata kuliah untuk semester ini</p>
            </div>
            
            <div v-for="(mk, index) in mataKuliahList" :key="mk.id" class="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
              <div class="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                <div class="col-span-2">
                  <div class="font-mono font-semibold text-blue-600">{{ mk.kode }}</div>
                </div>
                <div class="col-span-4">
                  <div class="font-medium text-gray-900">{{ mk.nama }}</div>
                </div>
                <div class="col-span-1 text-center">
                  <span class="badge-modern bg-blue-100 text-blue-800 px-2 py-1 text-xs">{{ mk.sks }}</span>
                </div>
                <div class="col-span-2">
                  <input
                    type="number"
                    class="w-full px-3 py-2 border-2 border-gray-200 rounded-lg text-center font-semibold focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    v-model.number="nilaiData[index].nilaiAngka"
                    @input="updateNilaiHuruf(index)"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="0-100"
                  >
                </div>
                <div class="col-span-2">
                  <div
                    class="w-full px-3 py-2 border-2 rounded-lg text-center font-bold transition-all duration-200"
                    :class="getNilaiClass(nilaiData[index].nilaiHuruf)"
                  >
                    {{ nilaiData[index].nilaiHuruf }}
                  </div>
                </div>
                <div class="col-span-1 text-center">
                  <div class="font-semibold text-gray-700">
                    {{ nilaiData[index].bobot.toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-t border-gray-200">
            <div class="grid grid-cols-12 gap-4 items-center">
              <div class="col-span-6">
                <div class="text-lg font-bold text-gray-900">Total Semester {{ selectedSemester }}</div>
              </div>
              <div class="col-span-1 text-center">
                <div class="badge-modern bg-blue-500 text-white px-3 py-2 font-bold">{{ totalSKS }}</div>
              </div>
              <div class="col-span-4 text-center">
                <div class="text-sm font-medium text-gray-600 mb-1">IP Semester</div>
                <div class="text-2xl font-bold" :class="getIPSemesterClass(ipSemester)">{{ ipSemester }}</div>
              </div>
              <div class="col-span-1"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div v-if="selectedSemester" class="form-actions mt-8">
        <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div class="flex-1">
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div class="flex items-start space-x-3">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-blue-900 mb-1">Panduan Input Nilai</h4>
                  <p class="text-blue-800 text-sm">Input nilai angka (0-100), nilai huruf dan bobot akan otomatis terkonversi sesuai standar universitas.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex space-x-3">
            <button 
              type="button" 
              class="btn-modern bg-gray-100 text-gray-700 hover:bg-gray-200"
              @click="resetForm"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Reset
            </button>
            <button 
              type="submit" 
              class="btn-modern btn-gradient-success"
              :disabled="loading || !hasChanges"
            >
              <span v-if="loading" class="flex items-center">
                <svg class="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyimpan...
              </span>
              <span v-else class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                Simpan Nilai
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>

    <!-- Grade Reference -->
    <div class="mt-12">
      <div class="card-modern">
        <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">📊 Referensi Konversi Nilai</h3>
              <p class="text-gray-600 mt-1">Standar penilaian universitas</p>
            </div>
          </div>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-3">
              <div class="grade-ref-item grade-a"><span class="range">85-100</span> <span class="grade">A</span> <span class="point">4.00</span></div>
              <div class="grade-ref-item grade-a-minus"><span class="range">80-84</span> <span class="grade">A-</span> <span class="point">3.75</span></div>
              <div class="grade-ref-item grade-b-plus"><span class="range">75-79</span> <span class="grade">B+</span> <span class="point">3.50</span></div>
              <div class="grade-ref-item grade-b"><span class="range">70-74</span> <span class="grade">B</span> <span class="point">3.00</span></div>
            </div>
            <div class="space-y-3">
              <div class="grade-ref-item grade-b-minus"><span class="range">65-69</span> <span class="grade">B-</span> <span class="point">2.75</span></div>
              <div class="grade-ref-item grade-c-plus"><span class="range">60-64</span> <span class="grade">C+</span> <span class="point">2.50</span></div>
              <div class="grade-ref-item grade-c"><span class="range">55-59</span> <span class="grade">C</span> <span class="point">2.00</span></div>
              <div class="grade-ref-item grade-d"><span class="range">40-54</span> <span class="grade">D</span> <span class="point">1.00</span></div>
              <div class="grade-ref-item grade-e"><span class="range">0-39</span> <span class="grade">E</span> <span class="point">0.00</span></div>
            </div>
          </div>
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
const selectSemester = (semester) => {
  selectedSemester.value = semester
  loadNilaiSemester()
}

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
    'A': 'bg-green-100 border-green-300 text-green-800',
    'A-': 'bg-green-50 border-green-200 text-green-700',
    'B+': 'bg-blue-100 border-blue-300 text-blue-800',
    'B': 'bg-blue-50 border-blue-200 text-blue-700',
    'B-': 'bg-cyan-50 border-cyan-200 text-cyan-700',
    'C+': 'bg-yellow-100 border-yellow-300 text-yellow-800',
    'C': 'bg-yellow-50 border-yellow-200 text-yellow-700',
    'D': 'bg-orange-100 border-orange-300 text-orange-800',
    'E': 'bg-red-100 border-red-300 text-red-800'
  }
  return classes[nilaiHuruf] || 'bg-gray-50 border-gray-200 text-gray-700'
}

const getIPSemesterClass = (ipSemester) => {
  const ip = parseFloat(ipSemester)
  if (ip >= 3.5) return 'text-green-600'
  if (ip >= 3.0) return 'text-blue-600'
  if (ip >= 2.5) return 'text-yellow-600'
  return 'text-red-600'
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
  @apply flex items-center justify-center;
}

.semester-button {
  @apply flex flex-col items-center justify-center p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 cursor-pointer;
}

.semester-button.active {
  @apply border-blue-500 bg-blue-100 text-blue-700 shadow-md;
}

.grade-ref-item {
  @apply flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200;
}

.grade-ref-item .range {
  @apply font-mono text-sm;
}

.grade-ref-item .grade {
  @apply font-bold text-lg px-3 py-1 rounded-md;
}

.grade-ref-item .point {
  @apply font-bold text-sm;
}

.grade-a {
  @apply bg-green-50 border-green-200 text-green-800;
}

.grade-a-minus {
  @apply bg-green-50 border-green-200 text-green-700;
}

.grade-b-plus {
  @apply bg-blue-50 border-blue-200 text-blue-800;
}

.grade-b {
  @apply bg-blue-50 border-blue-200 text-blue-700;
}

.grade-b-minus {
  @apply bg-cyan-50 border-cyan-200 text-cyan-700;
}

.grade-c-plus {
  @apply bg-yellow-50 border-yellow-200 text-yellow-800;
}

.grade-c {
  @apply bg-yellow-50 border-yellow-200 text-yellow-700;
}

.grade-d {
  @apply bg-orange-50 border-orange-200 text-orange-800;
}

.grade-e {
  @apply bg-red-50 border-red-200 text-red-800;
}
</style>