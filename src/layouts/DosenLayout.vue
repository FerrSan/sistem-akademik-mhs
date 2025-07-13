<!-- src/layouts/DosenLayout.vue -->
<template>
  <div class="dosen-layout">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-success fixed-top">
      <div class="container-fluid">
        <button 
          class="navbar-toggler"
          type="button"
          @click="toggleSidebar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <a class="navbar-brand ms-2" href="#">
          <i class="bi bi-mortarboard-fill me-2"></i>
          Portal Dosen
        </a>

        <div class="d-flex align-items-center">
          <div class="dropdown">
            <button 
              class="btn btn-success dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-person-circle me-2"></i>
              {{ userName }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link to="/dosen/profil" class="dropdown-item">
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

    <!-- Sidebar -->
    <nav 
      class="sidebar bg-light"
      :class="{ 'sidebar-open': sidebarOpen }"
    >
      <div class="sidebar-content">
        <div class="sidebar-header p-3 bg-success text-white">
          <h5 class="mb-0">Menu Dosen</h5>
        </div>
        
        <ul class="nav flex-column p-3">
          <li class="nav-item mb-2">
            <router-link 
              to="/dosen/dashboard" 
              class="nav-link"
              :class="{ 'active': $route.name === 'dosen-dashboard' }"
            >
              <i class="bi bi-speedometer2 me-2"></i>
              Dashboard
            </router-link>
          </li>
          
          <li class="nav-item mb-2">
            <router-link 
              to="/dosen/mahasiswa" 
              class="nav-link"
              :class="{ 'active': $route.name === 'dosen-mahasiswa' }"
            >
              <i class="bi bi-people me-2"></i>
              Data Mahasiswa
            </router-link>
          </li>
          
          <li class="nav-item mb-2">
            <router-link 
              to="/dosen/input-nilai" 
              class="nav-link"
              :class="{ 'active': $route.name === 'input-nilai' }"
            >
              <i class="bi bi-pencil-square me-2"></i>
              Input Nilai
            </router-link>
          </li>
          
          <li class="nav-item mb-2">
            <router-link 
              to="/dosen/profil" 
              class="nav-link"
              :class="{ 'active': $route.name === 'dosen-profil' }"
            >
              <i class="bi bi-person-gear me-2"></i>
              Profil
            </router-link>
          </li>
        </ul>
        
        <!-- Logout Button di Sidebar -->
        <div class="mt-auto p-3">
          <button 
            @click="logout" 
            class="btn btn-danger w-100"
          >
            <i class="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container-fluid p-4">
        <router-view />
      </div>
    </main>

    <!-- Overlay for mobile -->
    <div 
      v-if="sidebarOpen"
      class="sidebar-overlay"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const sidebarOpen = ref(false)

const userName = computed(() => authStore.userName || 'Dosen')

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const logout = () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.dosen-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.bg-success {
  background-color: #28a745 !important;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.sidebar {
  position: fixed;
  top: 56px;
  bottom: 0;
  left: 0;
  width: 250px;
  transform: translateX(-250px);
  transition: transform 0.3s ease-in-out;
  box-shadow: 2px 0 4px rgba(0,0,0,.1);
  z-index: 1040;
}

.sidebar.sidebar-open {
  transform: translateX(0);
}

.sidebar-content {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.nav-link {
  color: #333;
  border-radius: 0.25rem;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: #e9ecef;
  color: #28a745;
}

.nav-link.active {
  background-color: #28a745;
  color: white;
}

.main-content {
  margin-top: 56px;
  min-height: calc(100vh - 56px);
  transition: margin-left 0.3s ease-in-out;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1039;
}

@media (min-width: 768px) {
  .navbar-toggler {
    display: none;
  }
  
  .sidebar {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 250px;
  }
  
  .sidebar-overlay {
    display: none;
  }
}
</style>