<!-- src/views/LandingView.vue -->
<template>
  <div class="landing-page">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-800">Sistem Akademik</span>
        </div>
        
        <!-- Navigation Links -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#beranda" class="text-gray-700 hover:text-blue-600 transition-colors">Beranda</a>
          <a href="#tentang" class="text-gray-700 hover:text-blue-600 transition-colors">Tentang</a>
          <a href="#fitur" class="text-gray-700 hover:text-blue-600 transition-colors">Fitur</a>
          <a href="#kontak" class="text-gray-700 hover:text-blue-600 transition-colors">Kontak</a>
        </div>
        
        <!-- Auth Buttons -->
        <div class="flex items-center space-x-3">
          <button 
            @click="goToLogin" 
            class="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Login
          </button>
          <button 
            @click="showRegisterModal = true" 
            class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Daftar
          </button>
        </div>
        
        <!-- Mobile Menu Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t">
        <div class="px-4 py-2 space-y-2">
          <a href="#beranda" class="block py-2 text-gray-700">Beranda</a>
          <a href="#tentang" class="block py-2 text-gray-700">Tentang</a>
          <a href="#fitur" class="block py-2 text-gray-700">Fitur</a>
          <a href="#kontak" class="block py-2 text-gray-700">Kontak</a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="beranda" class="hero-section">
      <div class="container mx-auto px-4 py-20 text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Sistem Informasi
            <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Akademik Modern
            </span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Platform terintegrasi untuk mengelola data mahasiswa, dosen, dan administrasi akademik dengan mudah dan efisien.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              @click="goToLogin" 
              class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl"
            >
              Mulai Sekarang
            </button>
            <button 
              @click="scrollToSection('tentang')" 
              class="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="tentang" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Tentang Sistem Kami</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Solusi digital terdepan untuk manajemen akademik yang memudahkan semua pihak dalam proses pendidikan.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Multi Role</h3>
            <p class="text-gray-600">Mendukung akses untuk Admin, Dosen, dan Mahasiswa dengan hak akses yang berbeda</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Keamanan Terjamin</h3>
            <p class="text-gray-600">Sistem keamanan berlapis dengan enkripsi data dan kontrol akses yang ketat</p>
          </div>
          
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Performa Tinggi</h3>
            <p class="text-gray-600">Interface yang responsif dan cepat untuk pengalaman pengguna yang optimal</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="fitur" class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Berbagai fitur canggih yang dirancang untuk memudahkan pengelolaan akademik.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-blue-100 rounded-xl mb-4 flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Manajemen Mahasiswa</h3>
            <p class="text-gray-600">Kelola data mahasiswa dengan mudah, mulai dari pendaftaran hingga kelulusan</p>
          </div>
          
          <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-green-100 rounded-xl mb-4 flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Sistem Nilai</h3>
            <p class="text-gray-600">Input dan monitoring nilai mahasiswa dengan sistem yang akurat dan real-time</p>
          </div>
          
          <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-purple-100 rounded-xl mb-4 flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Laporan & Analitik</h3>
            <p class="text-gray-600">Generate laporan komprehensif dan analisis data akademik untuk pengambilan keputusan</p>
          </div>
          
          <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-yellow-100 rounded-xl mb-4 flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Dashboard Interaktif</h3>
            <p class="text-gray-600">Dashboard yang user-friendly dengan visualisasi data yang mudah dipahami</p>
          </div>
          
          <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-red-100 rounded-xl mb-4 flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 6h16M4 12h16M4 18h7"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Export Data</h3>
            <p class="text-gray-600">Export data dalam berbagai format untuk keperluan administrasi dan arsip</p>
          </div>
          
          <div class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-indigo-100 rounded-xl mb-4 flex items-center justify-center">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Konfigurasi Fleksibel</h3>
            <p class="text-gray-600">Sistem yang dapat dikonfigurasi sesuai kebutuhan institusi pendidikan</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="kontak" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Hubungi Kami</h2>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Butuh bantuan atau informasi lebih lanjut? Tim kami siap membantu Anda.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl">
            Email Kami
          </button>
          <button class="px-8 py-4 border border-gray-300 text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors">
            WhatsApp
          </button>
        </div>
      </div>
    </section>

    <!-- Register Modal -->
    <div v-if="showRegisterModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-gray-900">Pilih Jenis Akun</h3>
          <button @click="showRegisterModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <button @click="handleRegister('admin')" class="w-full p-4 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors text-left">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-xl mr-4 flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Administrator</h4>
                <p class="text-sm text-gray-600">Kelola sistem dan data akademik</p>
              </div>
            </div>
          </button>
          
          <button @click="handleRegister('dosen')" class="w-full p-4 border-2 border-green-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-colors text-left">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-xl mr-4 flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Dosen</h4>
                <p class="text-sm text-gray-600">Mengelola mata kuliah dan nilai</p>
              </div>
            </div>
          </button>
          
          <button @click="handleRegister('mahasiswa')" class="w-full p-4 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-colors text-left">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-purple-100 rounded-xl mr-4 flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">Mahasiswa</h4>
                <p class="text-sm text-gray-600">Akses nilai dan profil akademik</p>
              </div>
            </div>
          </button>
        </div>
        
        <div class="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun? 
          <button @click="goToLogin" class="text-blue-600 hover:text-blue-700 font-semibold">Login di sini</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const showRegisterModal = ref(false)
const mobileMenuOpen = ref(false)

// Methods
const goToLogin = () => {
  showRegisterModal.value = false
  router.push('/login')
}

const handleRegister = (role) => {
  showRegisterModal.value = false
  // For now, redirect to login with a message about registration
  alert(`Untuk pendaftaran akun ${role}, silakan hubungi administrator sistem`)
  goToLogin()
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.landing-page {
  font-family: 'Inter', sans-serif;
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
}

.hero-section {
  padding-top: 100px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

@keyframes bounce-gentle {
  0%, 100% { transform: translateY(-5px); }
  50% { transform: translateY(5px); }
}

.animate-bounce-gentle {
  animation: bounce-gentle 6s ease-in-out infinite;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
}
</style>