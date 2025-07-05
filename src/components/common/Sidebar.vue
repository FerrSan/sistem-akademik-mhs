<template>
  <nav 
    class="sidebar bg-light"
    :class="{ 'sidebar-open': isOpen }"
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
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 56px; /* height of navbar */
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

@media (min-width: 768px) {
  .sidebar {
    transform: translateX(0);
  }
}
</style>
