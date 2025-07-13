<!-- src/components/mahasiswa/MahasiswaForm.vue -->
<template>
  <form @submit.prevent="handleSubmit">
    <!-- Personal Information Section -->
    <div class="form-section">
      <h5 class="section-title">
        <i class="bi bi-person-circle me-2"></i>
        Informasi Pribadi
      </h5>
      
      <div class="row g-3">
        <div class="col-md-6">
          <label for="nim" class="form-label">
            NIM <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="nim"
            v-model="formData.nim"
            :class="{ 'is-invalid': errors.nim }"
            :disabled="mode === 'edit'"
            required
            placeholder="Contoh: 20220001"
          >
          <div v-if="errors.nim" class="invalid-feedback">
            {{ errors.nim }}
          </div>
        </div>
        
        <div class="col-md-6">
          <label for="nama" class="form-label">
            Nama Lengkap <span class="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="nama"
            v-model="formData.nama"
            :class="{ 'is-invalid': errors.nama }"
            required
            placeholder="Masukkan nama lengkap"
          >
          <div v-if="errors.nama" class="invalid-feedback">
            {{ errors.nama }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="email" class="form-label">
            Email <span class="text-danger">*</span>
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="formData.email"
            :class="{ 'is-invalid': errors.email }"
            required
            placeholder="nama@student.university.ac.id"
          >
          <div v-if="errors.email" class="invalid-feedback">
            {{ errors.email }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="telepon" class="form-label">No. Telepon</label>
          <input
            type="tel"
            class="form-control"
            id="telepon"
            v-model="formData.telepon"
            :class="{ 'is-invalid': errors.telepon }"
            placeholder="08xxxxxxxxxx"
          >
          <div v-if="errors.telepon" class="invalid-feedback">
            {{ errors.telepon }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="tanggalLahir" class="form-label">
            Tanggal Lahir <span class="text-danger">*</span>
          </label>
          <input
            type="date"
            class="form-control"
            id="tanggalLahir"
            v-model="formData.tanggalLahir"
            :class="{ 'is-invalid': errors.tanggalLahir }"
            required
          >
          <div v-if="errors.tanggalLahir" class="invalid-feedback">
            {{ errors.tanggalLahir }}
          </div>
        </div>

        <div class="col-md-6">
          <label for="jenisKelamin" class="form-label">
            Jenis Kelamin <span class="text-danger">*</span>
          </label>
          <select
            class="form-select"
            id="jenisKelamin"
            v-model="formData.jenisKelamin"
            :class="{ 'is-invalid': errors.jenisKelamin }"
            required
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          <div v-if="errors.jenisKelamin" class="invalid-feedback">
            {{ errors.jenisKelamin }}
          </div>
        </div>

        <div class="col-12">
          <label for="alamat" class="form-label">Alamat Lengkap</label>
          <textarea
            class="form-control"
            id="alamat"
            v-model="formData.alamat"
            rows="3"
            placeholder="Masukkan alamat lengkap"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Academic Information Section -->
    <div class="form-section mt-4">
      <h5 class="section-title">
        <i class="bi bi-mortarboard me-2"></i>
        Informasi Akademik
      </h5>
      
      <div class="row g-3">
        <div class="col-md-3">
          <label for="jurusan" class="form-label">
            Jurusan <span class="text-danger">*</span>
          </label>
          <select
            class="form-select"
            id="jurusan"
            v-model="formData.jurusan"
            :class="{ 'is-invalid': errors.jurusan }"
            required
          >
            <option value="">Pilih Jurusan</option>
            <option value="Teknik Informatika">Teknik Informatika</option>
            <option value="Sistem Informasi">Sistem Informasi</option>
          </select>
          <div v-if="errors.jurusan" class="invalid-feedback">
            {{ errors.jurusan }}
          </div>
        </div>

        <div class="col-md-3">
          <label for="angkatan" class="form-label">
            Angkatan <span class="text-danger">*</span>
          </label>
          <select
            class="form-select"
            id="angkatan"
            v-model="formData.angkatan"
            :class="{ 'is-invalid': errors.angkatan }"
            required
          >
            <option value="">Pilih Angkatan</option>
            <option v-for="year in angkatanOptions" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          <div v-if="errors.angkatan" class="invalid-feedback">
            {{ errors.angkatan }}
          </div>
        </div>

        <div class="col-md-3">
          <label for="status" class="form-label">
            Status <span class="text-danger">*</span>
          </label>
          <select
            class="form-select"
            id="status"
            v-model="formData.status"
            :class="{ 'is-invalid': errors.status }"
            required
          >
            <option value="">Pilih Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Non-Aktif">Non-Aktif</option>
            <option value="Lulus">Lulus</option>
          </select>
          <div v-if="errors.status" class="invalid-feedback">
            {{ errors.status }}
          </div>
        </div>

        <div class="col-md-3">
          <label for="ipk" class="form-label">IPK</label>
          <input
            type="number"
            class="form-control"
            id="ipk"
            v-model.number="formData.ipk"
            :class="{ 'is-invalid': errors.ipk }"
            min="0"
            max="4"
            step="0.01"
            placeholder="0.00"
          >
          <div v-if="errors.ipk" class="invalid-feedback">
            {{ errors.ipk }}
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="form-actions mt-4">
      <button 
        type="button" 
        class="btn btn-light me-2"
        @click="handleCancel"
      >
        <i class="bi bi-x-circle me-2"></i>
        Batal
      </button>
      <button 
        type="button" 
        class="btn btn-secondary me-2"
        @click="handleReset"
        v-if="mode === 'create'"
      >
        <i class="bi bi-arrow-clockwise me-2"></i>
        Reset
      </button>
      <button 
        type="submit" 
        class="btn btn-primary"
        :disabled="loading"
      >
        <span v-if="loading">
          <span class="spinner-border spinner-border-sm me-2"></span>
          Menyimpan...
        </span>
        <span v-else>
          <i class="bi bi-check-circle me-2"></i>
          {{ mode === 'create' ? 'Simpan' : 'Update' }} Mahasiswa
        </span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'

// Props
const props = defineProps({
  initialData: {
    type: Object,
    default: null
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value) => ['create', 'edit'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['submit', 'cancel'])

// Form data
const formData = reactive({
  nim: '',
  nama: '',
  email: '',
  telepon: '',
  tanggalLahir: '',
  jenisKelamin: '',
  alamat: '',
  jurusan: '',
  angkatan: '',
  status: 'Aktif',
  ipk: 0
})

// Errors
const errors = reactive({})

// Computed
const currentYear = new Date().getFullYear()
const angkatanOptions = computed(() => {
  const years = []
  for (let i = currentYear; i >= currentYear - 10; i--) {
    years.push(String(i))
  }
  return years
})

// Validation
const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => delete errors[key])
  
  let isValid = true
  
  // NIM validation
  if (!formData.nim) {
    errors.nim = 'NIM wajib diisi'
    isValid = false
  } else if (!/^\d{8}$/.test(formData.nim)) {
    errors.nim = 'NIM harus 8 digit angka'
    isValid = false
  }
  
  // Nama validation
  if (!formData.nama) {
    errors.nama = 'Nama wajib diisi'
    isValid = false
  } else if (formData.nama.length < 3) {
    errors.nama = 'Nama minimal 3 karakter'
    isValid = false
  }
  
  // Email validation
  if (!formData.email) {
    errors.email = 'Email wajib diisi'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Format email tidak valid'
    isValid = false
  }
  
  // Telepon validation
  if (formData.telepon && !/^08\d{9,11}$/.test(formData.telepon)) {
    errors.telepon = 'Format nomor telepon tidak valid'
    isValid = false
  }
  
  // Tanggal lahir validation
  if (!formData.tanggalLahir) {
    errors.tanggalLahir = 'Tanggal lahir wajib diisi'
    isValid = false
  } else {
    const birthDate = new Date(formData.tanggalLahir)
    const age = currentYear - birthDate.getFullYear()
    if (age < 17 || age > 50) {
      errors.tanggalLahir = 'Umur harus antara 17-50 tahun'
      isValid = false
    }
  }
  
  // Other required fields
  if (!formData.jenisKelamin) {
    errors.jenisKelamin = 'Jenis kelamin wajib dipilih'
    isValid = false
  }
  
  if (!formData.jurusan) {
    errors.jurusan = 'Jurusan wajib dipilih'
    isValid = false
  }
  
  if (!formData.angkatan) {
    errors.angkatan = 'Angkatan wajib dipilih'
    isValid = false
  }
  
  if (!formData.status) {
    errors.status = 'Status wajib dipilih'
    isValid = false
  }
  
  // IPK validation
  if (formData.ipk < 0 || formData.ipk > 4) {
    errors.ipk = 'IPK harus antara 0-4'
    isValid = false
  }
  
  return isValid
}

// Methods
const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...formData })
  }
}

const handleCancel = () => {
  emit('cancel')
}

const handleReset = () => {
  Object.assign(formData, {
    nim: '',
    nama: '',
    email: '',
    telepon: '',
    tanggalLahir: '',
    jenisKelamin: '',
    alamat: '',
    jurusan: '',
    angkatan: '',
    status: 'Aktif',
    ipk: 0
  })
  Object.keys(errors).forEach(key => delete errors[key])
}

// Initialize form data from props
const initializeForm = () => {
  if (props.initialData) {
    Object.keys(formData).forEach(key => {
      if (props.initialData[key] !== undefined) {
        formData[key] = props.initialData[key]
      }
    })
    
    // Format date for input
    if (props.initialData.tanggalLahir) {
      formData.tanggalLahir = props.initialData.tanggalLahir.split('T')[0]
    }
  }
}

// Watch for initial data changes
watch(() => props.initialData, () => {
  initializeForm()
}, { immediate: true })
</script>

<style scoped>
.form-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.section-title {
  color: #495057;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #dee2e6;
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}

.text-danger {
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
}

.form-control:focus,
.form-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}
</style>