<!-- src/components/mahasiswa/MahasiswaDetail.vue -->
<template>
  <div class="mahasiswa-detail">
    <!-- Header -->
    <div class="detail-header mb-4">
      <div class="row align-items-center">
        <div class="col-auto">
          <div class="avatar-large">
            <i class="bi bi-person-circle"></i>
          </div>
        </div>
        <div class="col">
          <h3 class="mb-1">{{ mahasiswa?.nama || '-' }}</h3>
          <p class="text-muted mb-2">{{ mahasiswa?.nim || '-' }}</p>
          <span 
            class="badge"
            :class="{
              'bg-success': mahasiswa?.status === 'Aktif',
              'bg-warning': mahasiswa?.status === 'Non-Aktif',
              'bg-info': mahasiswa?.status === 'Lulus'
            }"
          >
            {{ mahasiswa?.status || '-' }}
          </span>
        </div>
        <div class="col-auto" v-if="showActions">
          <button 
            class="btn btn-warning me-2"
            @click="$emit('edit', mahasiswa)"
          >
            <i class="bi bi-pencil me-2"></i>
            Edit
          </button>
          <button 
            class="btn btn-danger"
            @click="$emit('delete', mahasiswa)"
          >
            <i class="bi bi-trash me-2"></i>
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="row">
      <!-- Personal Information -->
      <div class="col-md-6">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-white">
            <h5 class="mb-0">
              <i class="bi bi-person me-2"></i>
              Informasi Pribadi
            </h5>
          </div>
          <div class="card-body">
            <table class="table table-borderless detail-table">
              <tbody>
                <tr>
                  <th width="40%">Nama Lengkap</th>
                  <td>{{ mahasiswa?.nama || '-' }}</td>
                </tr>
                <tr>
                  <th>Jenis Kelamin</th>
                  <td>{{ mahasiswa?.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan' }}</td>
                </tr>
                <tr>
                  <th>Tanggal Lahir</th>
                  <td>{{ formatDate(mahasiswa?.tanggalLahir) }}</td>
                </tr>
                <tr>
                  <th>Umur</th>
                  <td>{{ calculateAge(mahasiswa?.tanggalLahir) }} tahun</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>
                    <a :href="`mailto:${mahasiswa?.email}`">
                      {{ mahasiswa?.email || '-' }}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>No. Telepon</th>
                  <td>
                    <a :href="`tel:${mahasiswa?.telepon}`">
                      {{ mahasiswa?.telepon || '-' }}
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Alamat</th>
                  <td>{{ mahasiswa?.alamat || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Academic Information -->
      <div class="col-md-6">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-header bg-white">
            <h5 class="mb-0">
              <i class="bi bi-mortarboard me-2"></i>
              Informasi Akademik
            </h5>
          </div>
          <div class="card-body">
            <table class="table table-borderless detail-table">
              <tbody>
                <tr>
                  <th width="40%">NIM</th>
                  <td>{{ mahasiswa?.nim || '-' }}</td>
                </tr>
                <tr>
                  <th>Program Studi</th>
                  <td>{{ mahasiswa?.jurusan || '-' }}</td>
                </tr>
                <tr>
                  <th>Angkatan</th>
                  <td>{{ mahasiswa?.angkatan || '-' }}</td>
                </tr>
                <tr>
                  <th>Semester</th>
                  <td>{{ calculateSemester(mahasiswa?.angkatan) }}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    <span 
                      class="badge"
                      :class="{
                        'bg-success': mahasiswa?.status === 'Aktif',
                        'bg-warning': mahasiswa?.status === 'Non-Aktif',
                        'bg-info': mahasiswa?.status === 'Lulus'
                      }"
                    >
                      {{ mahasiswa?.status || '-' }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>IPK</th>
                  <td>
                    <strong class="text-primary">{{ mahasiswa?.ipk || '0.00' }}</strong>
                    <div class="progress mt-2" style="height: 10px;">
                      <div 
                        class="progress-bar"
                        :class="getIPKClass(mahasiswa?.ipk)"
                        :style="`width: ${(mahasiswa?.ipk / 4) * 100}%`"
                      ></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">
              <i class="bi bi-info-circle me-2"></i>
              Informasi Tambahan
            </h5>
          </div>
          <div class="card-body">
            <table class="table table-borderless detail-table mb-0">
              <tbody>
                <tr>
                  <th width="40%">Dibuat</th>
                  <td>{{ formatDateTime(mahasiswa?.createdAt) }}</td>
                </tr>
                <tr>
                  <th>Diperbarui</th>
                  <td>{{ formatDateTime(mahasiswa?.updatedAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Academic Performance Chart (Optional) -->
    <div class="row mt-4" v-if="showChart">
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white">
            <h5 class="mb-0">
              <i class="bi bi-graph-up me-2"></i>
              Grafik Perkembangan IPK
            </h5>
          </div>
          <div class="card-body">
            <canvas ref="ipkChart" height="100"></canvas>
          </div>
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
  if (!ipk) return 'bg-secondary'
  if (ipk >= 3.5) return 'bg-success'
  if (ipk >= 3.0) return 'bg-primary'
  if (ipk >= 2.5) return 'bg-warning'
  return 'bg-danger'
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
  padding: 1rem 0;
}

.detail-header {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.avatar-large {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9ecef;
  border-radius: 50%;
  font-size: 3rem;
  color: #6c757d;
}

.detail-table th {
  font-weight: 500;
  color: #6c757d;
  padding: 0.5rem 0;
  border: none;
}

.detail-table td {
  padding: 0.5rem 0;
  border: none;
}

.progress {
  background-color: #e9ecef;
}

.card-header {
  background-color: #f8f9fa !important;
  border-bottom: 1px solid #dee2e6;
}

.card-header h5 {
  color: #495057;
  font-weight: 600;
}

a {
  color: #667eea;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>