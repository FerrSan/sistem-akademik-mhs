// src/services/mahasiswaService.js
import api from './api'

const mahasiswaService = {
  async getAll(params = {}) {
    try {
      const { data } = await api.get('/mahasiswa', { params })
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching mahasiswa:', error)
      return {
        success: false,
        message: 'Gagal mengambil data mahasiswa',
        data: []
      }
    }
  },

  async getById(id) {
    try {
      const { data } = await api.get(`/mahasiswa/${id}`)
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching mahasiswa by id:', error)
      return {
        success: false,
        message: 'Mahasiswa tidak ditemukan'
      }
    }
  },

  async getByNIM(nim) {
    try {
      const { data } = await api.get('/mahasiswa', {
        params: { nim: nim }
      })
      
      if (data.length > 0) {
        return {
          success: true,
          data: data[0]
        }
      } else {
        return {
          success: false,
          message: 'Mahasiswa tidak ditemukan'
        }
      }
    } catch (error) {
      console.error('Error fetching mahasiswa by NIM:', error)
      return {
        success: false,
        message: 'Gagal mengambil data mahasiswa'
      }
    }
  },

  async create(mahasiswaData) {
    try {
      // Check if NIM already exists
      const { data: existing } = await api.get('/mahasiswa', {
        params: { nim: mahasiswaData.nim }
      })
      
      if (existing.length > 0) {
        return {
          success: false,
          message: 'NIM sudah terdaftar'
        }
      }
      
      // Create new mahasiswa
      const newMahasiswa = {
        ...mahasiswaData,
        id: Date.now(), // Generate ID
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const { data } = await api.post('/mahasiswa', newMahasiswa)
      
      // Also create user account for mahasiswa
      const userAccount = {
        id: Date.now() + 1,
        username: mahasiswaData.nim,
        password: 'mhs123', // Default password
        role: 'mahasiswa',
        nama: mahasiswaData.nama,
        email: mahasiswaData.email,
        nim: mahasiswaData.nim
      }
      
      await api.post('/users', userAccount)
      
      return {
        success: true,
        data: data,
        message: 'Mahasiswa berhasil ditambahkan'
      }
    } catch (error) {
      console.error('Error creating mahasiswa:', error)
      return {
        success: false,
        message: 'Gagal menambahkan mahasiswa'
      }
    }
  },

  async update(id, mahasiswaData) {
    try {
      // Get current data
      const { data: currentData } = await api.get(`/mahasiswa/${id}`)
      
      // Check if NIM changed and already exists
      if (mahasiswaData.nim !== currentData.nim) {
        const { data: existing } = await api.get('/mahasiswa', {
          params: { nim: mahasiswaData.nim }
        })
        
        if (existing.length > 0) {
          return {
            success: false,
            message: 'NIM sudah digunakan mahasiswa lain'
          }
        }
      }
      
      // Update mahasiswa
      const updatedMahasiswa = {
        ...currentData,
        ...mahasiswaData,
        id: id, // Ensure ID doesn't change
        updatedAt: new Date().toISOString()
      }
      
      const { data } = await api.put(`/mahasiswa/${id}`, updatedMahasiswa)
      
      // Update corresponding user account if exists
      const { data: users } = await api.get('/users', {
        params: { nim: currentData.nim }
      })
      
      if (users.length > 0) {
        const user = users[0]
        const updatedUser = {
          ...user,
          username: mahasiswaData.nim,
          nama: mahasiswaData.nama,
          email: mahasiswaData.email,
          nim: mahasiswaData.nim
        }
        await api.put(`/users/${user.id}`, updatedUser)
      }
      
      return {
        success: true,
        data: data,
        message: 'Data mahasiswa berhasil diperbarui'
      }
    } catch (error) {
      console.error('Error updating mahasiswa:', error)
      return {
        success: false,
        message: 'Gagal memperbarui data mahasiswa'
      }
    }
  },

  async delete(id) {
    try {
      // Get mahasiswa data first
      const { data: mahasiswa } = await api.get(`/mahasiswa/${id}`)
      
      // Delete mahasiswa
      await api.delete(`/mahasiswa/${id}`)
      
      // Also delete corresponding user account
      const { data: users } = await api.get('/users', {
        params: { nim: mahasiswa.nim }
      })
      
      if (users.length > 0) {
        await api.delete(`/users/${users[0].id}`)
      }
      
      return {
        success: true,
        message: 'Mahasiswa berhasil dihapus'
      }
    } catch (error) {
      console.error('Error deleting mahasiswa:', error)
      return {
        success: false,
        message: 'Gagal menghapus mahasiswa'
      }
    }
  },

  async getByJurusan(jurusan) {
    try {
      const { data } = await api.get('/mahasiswa', {
        params: { jurusan: jurusan }
      })
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching mahasiswa by jurusan:', error)
      return {
        success: false,
        message: 'Gagal mengambil data mahasiswa',
        data: []
      }
    }
  },

  async getByAngkatan(angkatan) {
    try {
      const { data } = await api.get('/mahasiswa', {
        params: { angkatan: angkatan }
      })
      return {
        success: true,
        data: data
      }
    } catch (error) {
      console.error('Error fetching mahasiswa by angkatan:', error)
      return {
        success: false,
        message: 'Gagal mengambil data mahasiswa',
        data: []
      }
    }
  },

  async exportData(filters = {}) {
    try {
      const { data } = await api.get('/mahasiswa', { params: filters })
      
      // Convert to CSV format
      const headers = ['NIM', 'Nama', 'Email', 'Jurusan', 'Angkatan', 'Status', 'IPK']
      const csvContent = [
        headers.join(','),
        ...data.map(m => [
          m.nim,
          `"${m.nama}"`,
          m.email,
          m.jurusan,
          m.angkatan,
          m.status,
          m.ipk
        ].join(','))
      ].join('\n')
      
      return {
        success: true,
        data: csvContent,
        filename: `mahasiswa_${new Date().toISOString().split('T')[0]}.csv`
      }
    } catch (error) {
      console.error('Error exporting mahasiswa data:', error)
      return {
        success: false,
        message: 'Gagal mengekspor data mahasiswa'
      }
    }
  }
}

export default mahasiswaService