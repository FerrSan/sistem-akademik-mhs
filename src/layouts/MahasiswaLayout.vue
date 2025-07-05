<!-- src/layouts/MahasiswaLayout.vue -->
<template>
  <div class="mahasiswa-layout">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-info fixed-top">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <i class="bi bi-mortarboard-fill me-2"></i>
          Portal Mahasiswa
        </a>

        <div class="d-flex align-items-center">
          <div class="dropdown">
            <button 
              class="btn btn-info dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-person-circle me-2"></i>
              {{ userName }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link to="/mahasiswa/profil" class="dropdown-item">
                  <i class="bi bi-person me-2"></i>
                  Profil
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <button @click="logout" class="dropdown-item text-danger">
                  <i class="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Simple Navigation -->
    <div class="top-navigation">
      <div class="container-fluid">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link 
              to="/mahasiswa/dashboard" 
              class="nav-link"
              :class="{ 'active': $route.name === 'mahasiswa-dashboard' }"
            >
              <i class="bi bi-house-door me-2"></i>
              Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/mahasiswa/nilai" 
              class="nav-link"
              :class="{ 'active': $route.name === 'mahasiswa-nilai' }"
            >
              <i class="bi bi-clipboard-data me-2"></i>
              Nilai
            </router-link>
          </li>
          <li class="nav-item">
            <router-link 
              to="/mahasiswa/profil" 
              class="nav-link"
              :class="{ 'active': $route.name === 'mahasiswa-profil' }"
            >
              <i class="bi bi-person me-2"></i>
              Profil
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container-fluid p-4">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const userName = computed(() => authStore.userName || 'Mahasiswa')

const logout = () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.mahasiswa-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.bg-info {
  background-color: #17a2b8 !important;
}

.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
  border-color: #117a8b;
  color: white;
}

.top-navigation {
  margin-top: 56px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,.05);
  padding: 1rem 0;
}

.nav-pills .nav-link {
  color: #495057;
  margin: 0 0.5rem;
}

.nav-pills .nav-link:hover {
  background-color: #e9ecef;
}

.nav-pills .nav-link.active {
  background-color: #17a2b8;
}

.main-content {
  min-height: calc(100vh - 120px);
}

@media (max-width: 576px) {
  .nav-pills {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .nav-pills .nav-item {
    flex: 0 0 auto;
  }
}
</style>