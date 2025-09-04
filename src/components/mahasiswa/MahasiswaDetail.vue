<!-- src/components/mahasiswa/MahasiswaDetail.vue -->
<template>
  <div class="mahasiswa-detail">
    <!-- Header -->
    <div class="detail-header mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-6">
          <div class="avatar-large">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {{ mahasiswa?.nama?.charAt(0) || 'M' }}
            </div>
          </div>
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">{{ mahasiswa?.nama || '-' }}</h2>
            <p class="text-lg text-gray-600 mb-3 font-mono">{{ mahasiswa?.nim || '-' }}</p>
            <span 
              class="badge-modern px-4 py-2 text-sm font-semibold rounded-full"
              :class="{
                'bg-green-100 text-green-800': mahasiswa?.status === 'Aktif',
                'bg-yellow-100 text-yellow-800': mahasiswa?.status === 'Non-Aktif',
                'bg-blue-100 text-blue-800': mahasiswa?.status === 'Lulus'
              }"
            >
              ✨ {{ mahasiswa?.status || '-' }}
            </span>
          </div>
        </div>
        <div v-if="showActions" class="flex space-x-3">
          <button 
            class="btn-modern bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
            @click="$emit('edit', mahasiswa)"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Edit
          </button>
          <button 
            class="btn-modern bg-red-100 text-red-800 hover:bg-red-200"
            @click="$emit('delete', mahasiswa)"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Personal Information -->
      <div>
        <div class="card-modern">
          <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-100">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">👤 Informasi Pribadi</h3>
                <p class="text-gray-600 mt-1">Data personal mahasiswa</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="detail-item">
                <div class="detail-label">Nama Lengkap</div>
                <div class="detail-value font-semibold">{{ mahasiswa?.nama || '-' }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Jenis Kelamin</div>
                <div class="detail-value">{{ mahasiswa?.jenisKelamin === 'L' ? '👨 Laki-laki' : '👩 Perempuan' }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Tanggal Lahir</div>
                <div class="detail-value">{{ formatDate(mahasiswa?.tanggalLahir) }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Umur</div>
                <div class="detail-value">{{ calculateAge(mahasiswa?.tanggalLahir) }} tahun</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">
                  <a :href="`mailto:${mahasiswa?.email}`" class="text-blue-600 hover:text-blue-800 hover:underline">
                    📧 {{ mahasiswa?.email || '-' }}
                  </a>
                </div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">No. Telepon</div>
                <div class="detail-value">
                  <a :href="`tel:${mahasiswa?.telepon}`" class="text-blue-600 hover:text-blue-800 hover:underline">
                    📱 {{ mahasiswa?.telepon || '-' }}
                  </a>
                </div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Alamat</div>
                <div class="detail-value">{{ mahasiswa?.alamat || '-' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Academic Information -->
      <div>
        <div class="card-modern">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 border-b border-gray-100">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">🎓 Informasi Akademik</h3>
                <p class="text-gray-600 mt-1">Data akademik dan prestasi</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="detail-item">
                <div class="detail-label">NIM</div>
                <div class="detail-value font-mono font-semibold text-lg">{{ mahasiswa?.nim || '-' }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Program Studi</div>
                <div class="detail-value font-semibold">{{ mahasiswa?.jurusan || '-' }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Angkatan</div>
                <div class="detail-value">{{ mahasiswa?.angkatan || '-' }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Semester</div>
                <div class="detail-value">{{ calculateSemester(mahasiswa?.angkatan) }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Status</div>
                <div class="detail-value">
                  <span 
                    class="badge-modern px-3 py-1 text-sm font-medium rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': mahasiswa?.status === 'Aktif',
                      'bg-yellow-100 text-yellow-800': mahasiswa?.status === 'Non-Aktif',
                      'bg-blue-100 text-blue-800': mahasiswa?.status === 'Lulus'
                    }"
                  >
                    {{ mahasiswa?.status || '-' }}
                  </span>
                </div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">IPK</div>
                <div class="detail-value">
                  <div class="flex items-center space-x-3">
                    <span class="text-2xl font-bold" :class="getIPKTextClass(mahasiswa?.ipk)">{{ mahasiswa?.ipk || '0.00' }}</span>
                    <div class="flex-1">
                      <div class="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          class="h-3 rounded-full transition-all duration-300"
                          :class="getIPKClass(mahasiswa?.ipk)"
                          :style="`width: ${(mahasiswa?.ipk / 4) * 100}%`"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="card-modern mt-6">
          <div class="bg-gradient-to-r from-gray-50 to-slate-50 p-6 border-b border-gray-100">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-gray-500 to-slate-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">ℹ️ Informasi Tambahan</h3>
                <p class="text-gray-600 mt-1">Data sistem dan log</p>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="detail-item">
                <div class="detail-label">Dibuat</div>
                <div class="detail-value">{{ formatDateTime(mahasiswa?.createdAt) }}</div>
              </div>
              
              <div class="detail-item">
                <div class="detail-label">Diperbarui</div>
                <div class="detail-value">{{ formatDateTime(mahasiswa?.updatedAt) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Academic Performance Chart (Optional) -->
    <div class="mt-8" v-if="showChart">
      <div class="card-modern">
        <div class="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">📊 Grafik Perkembangan IPK</h3>
              <p class="text-gray-600 mt-1">Tren prestasi akademik per semester</p>
            </div>
          </div>
        </div>
        <div class="p-6">
          <canvas ref="ipkChart" height="100"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'

// Props
const props = defineProps({
  mahasiswa: {
    type: Object,
    required: true
  },
  showActions: {
    type: Boolean,
    default: false
  },
  showChart: {
    type: Boolean,
    default: false
  }
})

// Emits
defineEmits(['edit', 'delete'])

// Refs
const ipkChart = ref(null)

// Methods
const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatDateTime = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateAge = (birthDate) => {
  if (!birthDate) return '-'
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

const calculateSemester = (angkatan) => {
  if (!angkatan) return '-'
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const yearDiff = currentYear - parseInt(angkatan)
  
  // Assuming academic year starts in September
  let semester = yearDiff * 2
  if (currentMonth >= 8) { // September onwards
    semester += 1
  }
  
  return `Semester ${Math.min(semester, 8)}`
}

const getIPKClass = (ipk) => {
  if (!ipk) return 'bg-gray-300'
  if (ipk >= 3.5) return 'bg-green-500'
  if (ipk >= 3.0) return 'bg-blue-500'
  if (ipk >= 2.5) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getIPKTextClass = (ipk) => {
  if (!ipk) return 'text-gray-500'
  if (ipk >= 3.5) return 'text-green-600'
  if (ipk >= 3.0) return 'text-blue-600'
  if (ipk >= 2.5) return 'text-yellow-600'
  return 'text-red-600'
}

// Chart initialization
const initChart = () => {
  if (!props.showChart || !ipkChart.value || !window.Chart) return
  
  // Sample data for IPK progression
  const ctx = ipkChart.value.getContext('2d')
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
      datasets: [{
        label: 'IPK',
        data: [3.2, 3.4, 3.5, 3.45, 3.6, props.mahasiswa?.ipk || 0],
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 4
        }
      }
    }
  })
}

// Lifecycle
onMounted(() => {
  if (props.showChart && !window.Chart) {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js'
    script.onload = () => initChart()
    document.head.appendChild(script)
  } else if (props.showChart) {
    initChart()
  }
})

// Watch for mahasiswa changes
watch(() => props.mahasiswa, () => {
  if (props.showChart) {
    initChart()
  }
})
</script>

<style scoped>
.mahasiswa-detail {
  padding: 0;
}

.detail-item {
  @apply flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100 last:border-b-0;
}

.detail-label {
  @apply text-sm font-medium text-gray-600 mb-1 sm:mb-0 sm:w-1/3;
}

.detail-value {
  @apply text-sm text-gray-900 sm:w-2/3 sm:text-right;
}

.avatar-large {
  @apply flex items-center justify-center;
}
</style>