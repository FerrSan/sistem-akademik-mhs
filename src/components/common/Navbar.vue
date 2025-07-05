<!-- src/components/common/Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark" :class="navbarClass">
    <div class="container-fluid">
      <button 
        v-if="showToggler"
        class="navbar-toggler"
        type="button"
        @click="$emit('toggle-sidebar')"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <a class="navbar-brand ms-2" href="#">
        <i class="bi bi-mortarboard-fill me-2"></i>
        {{ brandText }}
      </a>

      <div class="d-flex align-items-center ms-auto">
        <!-- Notifications -->
        <div class="dropdown me-3">
          <button 
            class="btn btn-link text-white position-relative"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i class="bi bi-bell fs-5"></i>
            <span v-if="notifications > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ notifications }}
            </span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><h6 class="dropdown-header">Notifikasi</h6></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Tidak ada notifikasi baru</a></li>
          </ul>
        </div>

        <!-- User Menu -->
        <div class="dropdown">
          <button 
            class="btn text-white dropdown-toggle"
            :class="buttonClass"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i class="bi bi-person-circle me-2"></i>
            {{ userName }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <router-link :to="profileRoute" class="dropdown-item">
                <i class="bi bi-person me-2"></i>
                Profil
              </router-link>
            </li>
            <li v-if="showSettings">
              <a class="dropdown-item" href="#">
                <i class="bi bi-gear me-2"></i>
                Pengaturan
              </a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <button @click="handleLogout" class="dropdown-item text-danger">
                <i class="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Props
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'info'].includes(value)
  },
  brandText: {
    type: String,
    default: 'SI Manajemen Mahasiswa'
  },
  showToggler: {
    type: Boolean,
    default: true
  },
  showSettings: {
    type: Boolean,
    default: false
  },
  notifications: {
    type: Number,
    default: 0
  }
})

// Emits
defineEmits(['toggle-sidebar'])

const router = useRouter()
const authStore = useAuthStore()

// Computed
const userName = computed(() => authStore.userName || 'User')

const navbarClass = computed(() => {
  const variantMap = {
    primary: 'bg-primary',
    success: 'bg-success',
    info: 'bg-info'
  }
  return variantMap[props.variant] || 'bg-primary'
})

const buttonClass = computed(() => {
  const variantMap = {
    primary: 'btn-primary',
    success: 'btn-success',
    info: 'btn-info'
  }
  return variantMap[props.variant] || 'btn-primary'
})

const profileRoute = computed(() => {
  const role = authStore.userRole
  const routeMap = {
    admin: '/admin/profil',
    dosen: '/dosen/profil',
    mahasiswa: '/mahasiswa/profil'
  }
  return routeMap[role] || '/'
})

// Methods
const handleLogout = () => {
  if (confirm('Apakah Anda yakin ingin keluar?')) {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.btn-link {
  text-decoration: none;
}

.btn-link:focus {
  box-shadow: none;
}

.badge {
  font-size: 0.625rem;
}
</style>