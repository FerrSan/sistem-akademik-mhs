// src/stores/nilai.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import nilaiService from '@/services/nilaiService'

export const useNilaiStore = defineStore('nilai', () => {
  // State
  const nilaiList = ref([])
  const currentNilai = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const mataKuliahList = ref([])

  // Getters
  const nilaiByMahasiswa = computed(() => {
    const grouped = {}
    nilaiList.value.forEach(nilai => {
      if (!grouped[nilai.mahasiswaId]) {
        grouped[nilai.mahasiswaId] = []
      }
      grouped[nilai.mahasiswaId].push(nilai)
    })
    return grouped
  })

  const nilaiByMahasiswaAndSemester = computed(() => {
    const grouped = {}
    nilaiList.value.forEach(nilai => {
      const key = `${nilai.mahasiswaId}-${nilai.semester}`
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(nilai)
    })
    return grouped
  })

  // Actions
  async function fetchNilaiByMahasiswa(mahasiswaId) {
    loading.value = true
    error.value = null
    
    try {
      const response = await nilaiService.getNilaiByMahasiswa(mahasiswaId)
      if (response.success) {
        nilaiList.value = response.data
        return response.data
      } else {
        throw new Error(response.message || 'Gagal mengambil data nilai')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat mengambil data nilai'
      console.error('Error fetching nilai by mahasiswa:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchNilaiByMahasiswaAndSemester(mahasiswaId, semester) {
    loading.value = true
    error.value = null

    try {
      const response = await nilaiService.getNilaiByMahasiswaAndSemester(mahasiswaId, semester)
      if (response.success) {
        return response.data
      } else {
        throw new Error(response.message || 'Gagal mengambil data nilai')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat mengambil data nilai'
      console.error('Error fetching nilai by mahasiswa and semester:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  async function saveNilai(nilaiData) {
    loading.value = true
    error.value = null
    
    try {
      const response = await nilaiService.saveNilai(nilaiData)
      if (response.success) {
        // Update local state
        await fetchNilaiByMahasiswa(nilaiData.mahasiswaId)
        return { 
          success: true, 
          message: 'Nilai berhasil disimpan',
          data: response.data 
        }
      } else {
        throw new Error(response.message || 'Gagal menyimpan nilai')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan saat menyimpan nilai'
      return { 
        success: false, 
        message: error.value 
      }
    } finally {
      loading.value = false
    }
  }

  async function fetchMataKuliah() {
    try {
      mataKuliahList.value = await nilaiService.getMataKuliahData()
      return mataKuliahList.value
    } catch (err) {
      console.error('Error fetching mata kuliah:', err)
      return []
    }
  }

  async function getNilaiStatistics(mahasiswaId) {
    loading.value = true
    error.value = null
    
    try {
      const response = await nilaiService.getNilaiStatistics(mahasiswaId)
      if (response.success) {
        return response.data
      } else {
        throw new Error(response.message || 'Gagal mengambil statistik nilai')
      }
    } catch (err) {
      error.value = err.message || 'Terjadi kesalahan'
      console.error('Error getting statistics:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  function getMataKuliahBySemester(semester) {
    return mataKuliahList.value.filter(mk => mk.semester === semester)
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    nilaiList,
    currentNilai,
    loading,
    error,
    mataKuliahList,

    // Getters
    nilaiByMahasiswa,
    nilaiByMahasiswaAndSemester,

    // Actions
    fetchNilaiByMahasiswa,
    fetchNilaiByMahasiswaAndSemester,
    saveNilai,
    fetchMataKuliah,
    getNilaiStatistics,
    getMataKuliahBySemester,
    clearError
  }
})