<!-- src/views/admin/MahasiswaTambah.vue -->
<template>
  <div class="mahasiswa-tambah">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Tambah Mahasiswa Baru</h1>
      <router-link to="/admin/mahasiswa" class="btn btn-secondary">
        <i class="bi bi-arrow-left me-2"></i>
        Kembali
      </router-link>
    </div>

    <!-- Form Card -->
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <form @submit.prevent="handleSubmit">
          <!-- Personal Information Section -->
          <h5 class="mb-3 text-primary">
            <i class="bi bi-person-circle me-2"></i>
            Informasi Pribadi
          </h5>
          <div class="row g-3 mb-4">
            <div class="col-md-6">
              <label for="nim" class="form-label">NIM <span class="text-danger">*</span></label>
              <input
                type="text"
                class="form-control"
                id="nim"
                v-model="formData.nim"
                :class="{ 'is-invalid': errors.nim }"
                required
                placeholder="Contoh: 20220001"
              >
              <div v-if="errors.nim" class="invalid-feedback">
                {{ errors.nim }}
              </div>
            </div>
            
            <div class="col-md-6">
              <label for="nama" class="form-label">Nama Lengkap <span class="text-danger">*</span></label>
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
              <label for="email" class="form-label">Email <span class="text-danger">*</span></label>
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
                placeholder="08xxxxxxxxxx"
              >
            </div>

            <div class="col-md-6">
              <label for="tanggalLahir" class="form-label">Tanggal Lahir <span class="text-danger">*</span></label>
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
              <label for="jenisKelamin" class="form-label">Jenis Kelamin <span class="text-danger">*</span></label>
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

          <!-- Academic Information Section -->
          <h5 class="mb-3 text-primary">
            <i class="bi bi-mortarboard me-2"></i>
            Informasi Akademik
          </h5>
          <div class="row g-3 mb-4">
            <div class="col-md-4">
              <label for="jurusan" class="form-label">Jurusan <span class="text-danger">*</span></label>
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

            <div class="col-md-4">
              <label for="angkatan" class="form-label">Angkatan <span class="text-danger">*</span></label>
              <select
                class="form-select"
                id="angkatan"
                v-model="formData.angkatan"
                :class="{ 'is-invalid': errors.angkatan }"
                required
              >
                <option value="">Pilih Angkatan</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
              <div v-if="errors.angkatan" class="invalid-feedback">
                {{ errors.angkatan }}
              </div>
            </div>

            <div class="col-md-4">
              <label for="status" class="form-label">Status <span class="text-danger">*</span></label>
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
          </div>

          <!-- Form Actions -->
          <div class="d-flex justify-content-end gap-2 mt-4">
            <button 
              type="button" 
              class="btn btn-light"
              @click="resetForm"
            >
              <i class="bi bi-x-circle me-2"></i>
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
                Simpan Mahasiswa
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Info Card -->
    <div class="alert alert-info mt-3">
      <i class="bi bi-info-circle me-2"></i>
      <strong>Catatan:</strong> Setelah mahasiswa ditambahkan, akun login akan otomatis dibuat dengan username menggunakan NIM dan password default "mhs123".
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMahasiswaStore } from '@/stores/mahasiswa'

const router = useRouter()
const mahasiswaStore = useMahasiswaStore()

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

// Form state
const loading = ref(false)
const errors = reactive({})

// Form validation
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
  
  // Tanggal lahir validation
  if (!formData.tanggalLahir) {
    errors.tanggalLahir = 'Tanggal lahir wajib diisi'
    isValid = false
  } else {
    const birthDate = new Date(formData.tanggalLahir)
    const age = new Date().getFullYear() - birthDate.getFullYear()
    if (age < 17 || age > 50) {
      errors.tanggalLahir = 'Umur harus antara 17-50 tahun'
      isValid = false
    }
  }
  
  // Other validations
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
  
  return isValid
}

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  loading.value = true
  
  try {
    const result = await mahasiswaStore.createMahasiswa(formData)
    
    if (result.success) {
      alert(result.message)
      router.push('/admin/mahasiswa')
    } else {
      alert(result.message)
    }
  } catch (error) {
    console.error('Error creating mahasiswa:', error)
    alert('Terjadi kesalahan saat menyimpan data')
  } finally {
    loading.value = false
  }
}

// Reset form
const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (key === 'status') {
      formData[key] = 'Aktif'
    } else if (key === 'ipk') {
      formData[key] = 0
    } else {
      formData[key] = ''
    }
  })
  
  Object.keys(errors).forEach(key => delete errors[key])
}
</script>

<style scoped>
.form-label {
  font-weight: 500;
}

.text-danger {
  font-size: 0.875rem;
}

.alert {
  border: none;
}
</style>