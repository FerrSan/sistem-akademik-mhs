// src/services/nilaiService.js
import api from './api'

const nilaiService = {
  // Get nilai by mahasiswa ID and semester
  async getNilaiByMahasiswaAndSemester(mahasiswaId, semester) {
    try {
      const { data } = await api.get('/nilai', {
        params: { mahasiswaId, semester }
      })
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching nilai:', error)
      return {
        success: false,
        message: 'Gagal mengambil data nilai',
        data: []
      }
    }
  },

  // Get all nilai for a mahasiswa
  async getNilaiByMahasiswa(mahasiswaId) {
    try {
      const { data } = await api.get('/nilai', {
        params: { mahasiswaId }
      })
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching nilai:', error)
      return {
        success: false,
        message: 'Gagal mengambil data nilai',
        data: []
      }
    }
  },

  // Save or update nilai
  async saveNilai(nilaiData) {
    try {
      // Check if nilai already exists for this mahasiswa and semester
      const existing = await this.getNilaiByMahasiswaAndSemester(
        nilaiData.mahasiswaId, 
        nilaiData.semester
      )

      let savedNilai = []

      // Process each nilai
      for (const nilai of nilaiData.nilai) {
        const nilaiRecord = {
          mahasiswaId: nilaiData.mahasiswaId,
          semester: nilaiData.semester,
          mataKuliahId: nilai.mataKuliahId,
          nilaiAngka: nilai.nilaiAngka,
          nilaiHuruf: nilai.nilaiHuruf,
          bobot: nilai.bobot,
          updatedAt: new Date().toISOString()
        }

        // Check if this specific nilai exists
        const existingNilai = existing.data.find(n => 
          n.mataKuliahId === nilai.mataKuliahId
        )

        if (existingNilai) {
          // Update existing
          const { data } = await api.put(`/nilai/${existingNilai.id}`, nilaiRecord)
          savedNilai.push(data)
        } else {
          // Create new
          nilaiRecord.id = Date.now() + Math.random() // Generate unique ID
          nilaiRecord.createdAt = new Date().toISOString()
          const { data } = await api.post('/nilai', nilaiRecord)
          savedNilai.push(data)
        }
      }

      // Update mahasiswa's IPK
      await this.updateMahasiswaIPK(nilaiData.mahasiswaId)

      return {
        success: true,
        data: savedNilai,
        message: 'Nilai berhasil disimpan'
      }
    } catch (error) {
      console.error('Error saving nilai:', error)
      return {
        success: false,
        message: 'Gagal menyimpan nilai'
      }
    }
  },

  // Calculate and update mahasiswa's IPK
  async updateMahasiswaIPK(mahasiswaId) {
    try {
      // Get all nilai for this mahasiswa
      const { data: allNilai } = await api.get('/nilai', {
        params: { mahasiswaId }
      })

      if (allNilai.length === 0) return

      // Get mata kuliah data for SKS information
      const mataKuliahData = await this.getMataKuliahData()
      
      // Calculate IPK
      let totalBobot = 0
      let totalSKS = 0

      allNilai.forEach(nilai => {
        const mk = mataKuliahData.find(m => m.id === nilai.mataKuliahId)
        if (mk) {
          totalBobot += nilai.bobot
          totalSKS += mk.sks
        }
      })

      const ipk = totalSKS > 0 ? (totalBobot / totalSKS).toFixed(2) : 0

      // Update mahasiswa's IPK
      const { data: mahasiswa } = await api.get(`/mahasiswa/${mahasiswaId}`)
      await api.patch(`/mahasiswa/${mahasiswaId}`, { ipk: parseFloat(ipk) })

      return {
        success: true,
        ipk: ipk
      }
    } catch (error) {
      console.error('Error updating IPK:', error)
      return {
        success: false,
        message: 'Gagal mengupdate IPK'
      }
    }
  },

  // Get mata kuliah master data
  async getMataKuliahData() {
    try {
      const { data } = await api.get('/matakuliah')
      return data
    } catch (error) {
      // Return hardcoded data if API fails
      return [
        { id: 1, kode: 'IF101', nama: 'Dasar Pemrograman', sks: 4, semester: 1 },
        { id: 2, kode: 'IF102', nama: 'Matematika Diskrit', sks: 3, semester: 1 },
        { id: 3, kode: 'IF103', nama: 'Pengantar Teknologi Informasi', sks: 2, semester: 1 },
        { id: 4, kode: 'IF104', nama: 'Algoritma dan Struktur Data', sks: 4, semester: 1 },
        { id: 5, kode: 'UNI101', nama: 'Bahasa Indonesia', sks: 2, semester: 1 },
        { id: 6, kode: 'UNI102', nama: 'Bahasa Inggris', sks: 2, semester: 1 },
        { id: 7, kode: 'IF201', nama: 'Pemrograman Berorientasi Objek', sks: 4, semester: 2 },
        { id: 8, kode: 'IF202', nama: 'Basis Data', sks: 3, semester: 2 },
        { id: 9, kode: 'IF203', nama: 'Sistem Operasi', sks: 3, semester: 2 },
        { id: 10, kode: 'IF204', nama: 'Jaringan Komputer', sks: 3, semester: 2 },
        { id: 11, kode: 'IF205', nama: 'Statistika', sks: 3, semester: 2 },
        { id: 12, kode: 'IF301', nama: 'Pemrograman Web', sks: 3, semester: 3 },
        { id: 13, kode: 'IF302', nama: 'Rekayasa Perangkat Lunak', sks: 3, semester: 3 },
        { id: 14, kode: 'IF303', nama: 'Sistem Informasi', sks: 3, semester: 3 },
        { id: 15, kode: 'IF304', nama: 'Kecerdasan Buatan', sks: 3, semester: 3 },
        { id: 16, kode: 'IF305', nama: 'Interaksi Manusia Komputer', sks: 3, semester: 3 }
      ]
    }
  },

  // Get nilai statistics for a mahasiswa
  async getNilaiStatistics(mahasiswaId) {
    try {
      const { data: allNilai } = await api.get('/nilai', {
        params: { mahasiswaId }
      })

      const mataKuliahData = await this.getMataKuliahData()
      
      // Group by semester
      const nilaiPerSemester = {}
      
      allNilai.forEach(nilai => {
        if (!nilaiPerSemester[nilai.semester]) {
          nilaiPerSemester[nilai.semester] = {
            semester: nilai.semester,
            nilai: [],
            totalSKS: 0,
            totalBobot: 0,
            ip: 0
          }
        }
        
        const mk = mataKuliahData.find(m => m.id === nilai.mataKuliahId)
        if (mk) {
          nilaiPerSemester[nilai.semester].nilai.push({
            ...nilai,
            mataKuliah: mk.nama,
            sks: mk.sks
          })
          nilaiPerSemester[nilai.semester].totalSKS += mk.sks
          nilaiPerSemester[nilai.semester].totalBobot += nilai.bobot
        }
      })

      // Calculate IP per semester
      Object.values(nilaiPerSemester).forEach(sem => {
        sem.ip = sem.totalSKS > 0 ? (sem.totalBobot / sem.totalSKS).toFixed(2) : 0
      })

      return {
        success: true,
        data: {
          nilaiPerSemester,
          totalSKS: Object.values(nilaiPerSemester).reduce((sum, sem) => sum + sem.totalSKS, 0),
          totalNilai: allNilai.length
        }
      }
    } catch (error) {
      console.error('Error getting nilai statistics:', error)
      return {
        success: false,
        message: 'Gagal mengambil statistik nilai'
      }
    }
  }
}

export default nilaiService