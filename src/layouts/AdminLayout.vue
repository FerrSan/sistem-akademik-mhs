<!-- src/layouts/AdminLayout.vue -->
<template>
  <div class="admin-layout">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
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
          SI Manajemen Mahasiswa
        </a>

        <div class="d-flex align-items-center">
          <div class="dropdown">
            <button 
              class="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-person-circle me-2"></i>
              {{ userName }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link to="/admin/profil" class="dropdown-item">
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
        <div class="sidebar-header p-3 bg-primary text-white">
          <h5 class="mb-0">Admin Panel</h5>
        </div>
        
        <ul class="nav flex-column p-3">
          <li class="nav-item mb-2">
            <router-link 
              to="/admin/dashboard" 
              class="nav-link"
              :class="{ 'active': $route.name === 'admin-dashboard' }"
            >
              <i class="bi bi-speedometer2 me-2"></i>
              Dashboard
            </router-link>
          </li>
          
          <li class="nav-item mb-2">
            <router-link 
              to="/admin/mahasiswa" 
              class="nav-link"
              :class="{ 'active': $route.name?.includes('mahasiswa') }"
            >
              <i class="bi bi-people me-2"></i>
              Manajemen Mahasiswa
            </router-link>
          </li>
          
          <li class="nav-item mb-2">
            <router-link 
              to="/admin/laporan" 
              class="nav-link"
              :class="{ 'active': $route.name === 'laporan' }"
            >
              <i class="bi bi-file-earmark-text me-2"></i>
              Laporan
            </router-link>
          </li>
          
          <li class="nav-item mb-2">
            <router-link 
              to="/admin/profil" 
              class="nav-link"
              :class="{ 'active': $route.name === 'admin-profil' }"
            >
              <i class="bi bi-person-gear me-2"></i>
              Profil
            </router-link>
          </li>
        </ul>
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
import Sidebar from '@/components/common/Sidebar.vue'
import Footer from '@/components/common/Footer.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const sidebarOpen = ref(false)

const userName = computed(() => authStore.userName || 'Admin')

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
.admin-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
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
}

.nav-link {
  color: #333;
  border-radius: 0.25rem;
  transition: all 0.3s;
}

.nav-link:hover {
  background-color: #e9ecef;
  color: #0d6efd;
}

.nav-link.active {
  background-color: #0d6efd;
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

/* Desktop styles */
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