// src/stores/mahasiswa.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import mahasiswaService from '@/services/mahasiswaService'

export const useMahasiswaStore = defineStore('mahasiswa', () => {
  // State
  const mahasiswaList = ref([])
  const currentMahasiswa = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const filters = ref({
    search: '',
    jurusan: '',
    angkatan: '',
    status: ''
  })

  // Getters
  const filteredMahasiswa = computed(() => {
    let result = mahasiswaList.value

    // Search filter
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase()
      result = result.filter(mhs => 
        mhs.nama.toLowerCase().includes(searchLower) ||
        mhs.nim.toLowerCase().includes(searchLower) ||
        mhs.email.toLowerCase().includes(searchLower)
      )
    }

    // Jurusan filter
    if (filters.value.jurusan) {
      result = result.filter(mhs => mhs.jurusan === filters.value.jurusan)
    }

    // Angkatan filter
    if (filters.value.angkatan) {
      result = result.filter(mhs => mhs.angkatan === filters.value.angkatan)
    }

    // Status filter
    if (filters.value.status) {
      result = result.filter(mhs => mhs.status === filters.value.status)
    }

    return result
  })

  const totalMahasiswa = computed(() => mahasiswaList.value.length)
  
  const mahasiswaByAngkatan = computed(() => {
    const grouped = {}
    mahasiswaList.value.forEach(mhs => {
      if (!grouped[mhs.angkatan]) {
        grouped[mhs.angkatan] = []
      }
      grouped[mhs.angkatan].push(mhs)
    })
    return grouped
  })

  const mahasiswaByJurusan = computed(() => {
    const grouped = {}
    mahasiswaList.value.forEach(mhs => {
      if (!grouped[mhs.jurusan]) {
        grouped[mhs.jurusan] = []
      }
      grouped[mhs.jurusan].push(mhs)
    })
    return grouped
  })

  const statistik = computed(() => {
    const stats = {
      total: mahasiswaList.value.length,
      aktif: mahasiswaList.value.filter(m => m.status === 'Aktif').length,
      nonAktif: mahasiswaList.value.filter(m => m.status === 'Non-Aktif').length,
      lulus: mahasiswaList.value.filter(m => m.status === 'Lulus').length,
      byJurusan: {},
      byAngkatan: {},
      avgIPK: 0
    }

    // Count by jurusan
    mahasiswaList.value.forEach(mhs => {
      if (!stats.byJurusan[mhs.jurusan]) {
        stats.byJurusan[mhs.jurusan] = 0
      }
      stats.byJurusan[mhs.jurusan]++
      
      if (!stats.byAngkatan[mhs.angkatan]) {
        stats.byAngkatan[mhs.angkatan] = 0
      }
      stats.byAngkatan[mhs.angkatan]++
    })

    // Calculate average IPK
    const totalIPK = mahasiswaList.value.reduce((sum, mhs) => sum + (mhs.ipk || 0), 0)
    stats.avgIPK = mahasiswaList.value.length > 0 ? (totalIPK / mahasiswaList.value.length).toFixed(2) : 0

    return stats
  })

  // Actions
  async function fetchMahasiswa() {
    loading.value = true
    error.value = null
    
    try {
      const response = await mahasiswaService.getAll()
      if (response.success) {
        mahasiswaList.value = response.data
      } else {
        throw new Error(response.message || 'Gagal mengambil data mahasiswa')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat mengambil data'
      console.error('Error fetching mahasiswa:', err)
    } finally {
      loading.value = false
    }
  }

  async function fetchMahasiswaById(id) {
    loading.value = true
    error.value = null
    
    try {
      const response = await mahasiswaService.getById(id)
      if (response.success) {
        currentMahasiswa.value = response.data
        return response.data
      } else {
        throw new Error(response.message || 'Mahasiswa tidak ditemukan')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat mengambil data'
      console.error('Error fetching mahasiswa by id:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  async function createMahasiswa(mahasiswaData) {
    loading.value = true
    error.value = null
    
    try {
      const response = await mahasiswaService.create(mahasiswaData)
      if (response.success) {
        mahasiswaList.value.push(response.data)
        return { success: true, message: 'Mahasiswa berhasil ditambahkan' }
      } else {
        throw new Error(response.message || 'Gagal menambahkan mahasiswa')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat menambahkan data'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  async function updateMahasiswa(id, mahasiswaData) {
    loading.value = true
    error.value = null
    
    try {
      const response = await mahasiswaService.update(id, mahasiswaData)
      if (response.success) {
        const index = mahasiswaList.value.findIndex(m => m.id === id)
        if (index !== -1) {
          mahasiswaList.value[index] = response.data
        }
        return { success: true, message: 'Data mahasiswa berhasil diperbarui' }
      } else {
        throw new Error(response.message || 'Gagal memperbarui data mahasiswa')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat memperbarui data'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  async function deleteMahasiswa(id) {
    loading.value = true
    error.value = null
    
    try {
      const response = await mahasiswaService.delete(id)
      if (response.success) {
        mahasiswaList.value = mahasiswaList.value.filter(m => m.id !== id)
        return { success: true, message: 'Mahasiswa berhasil dihapus' }
      } else {
        throw new Error(response.message || 'Gagal menghapus mahasiswa')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat menghapus data'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  function setFilters(newFilters) {
    filters.value = { ...filters.value, ...newFilters }
  }

  function clearFilters() {
    filters.value = {
      search: '',
      jurusan: '',
      angkatan: '',
      status: ''
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    mahasiswaList,
    currentMahasiswa,
    loading,
    error,
    filters,
    
    // Getters
    filteredMahasiswa,
    totalMahasiswa,
    mahasiswaByAngkatan,
    mahasiswaByJurusan,
    statistik,
    
    // Actions
    fetchMahasiswa,
    fetchMahasiswaById,
    createMahasiswa,
    updateMahasiswa,
    deleteMahasiswa,
    setFilters,
    clearFilters,
    clearError
  }
})