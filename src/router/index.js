// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Layouts
import AuthLayout from '@/layouts/AuthLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import DosenLayout from '@/layouts/DosenLayout.vue'
import MahasiswaLayout from '@/layouts/MahasiswaLayout.vue'

// Auth Views
import LoginView from '@/views/auth/LoginView.vue'

// Admin Views
import DashboardAdmin from '@/views/admin/DashboardAdmin.vue'
import MahasiswaManagement from '@/views/admin/MahasiswaManagement.vue'
import MahasiswaTambah from '@/views/admin/MahasiswaTambah.vue'
import MahasiswaEdit from '@/views/admin/MahasiswaEdit.vue'
import LaporanView from '@/views/admin/LaporanView.vue'
import ProfilAdmin from '@/views/admin/ProfilAdmin.vue'

// Dosen Views
import DashboardDosen from '@/views/dosen/DashboardDosen.vue'
import MahasiswaListDosen from '@/views/dosen/MahasiswaList.vue'
import ProfilDosen from '@/views/dosen/ProfilDosen.vue'

// Mahasiswa Views
import DashboardMahasiswa from '@/views/mahasiswa/DashboardMahasiswa.vue'
import ProfilMahasiswa from '@/views/mahasiswa/ProfilMahasiswa.vue'
import NilaiView from '@/views/mahasiswa/NilaiView.vue'

const routes = [
  // Auth Routes
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: LoginView,
        meta: { requiresAuth: false }
      }
    ]
  },
  
  // Admin Routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: DashboardAdmin,
        meta: { title: 'Dashboard Admin' }
      },
      {
        path: 'mahasiswa',
        name: 'mahasiswa-management',
        component: MahasiswaManagement,
        meta: { title: 'Manajemen Mahasiswa' }
      },
      {
        path: 'mahasiswa/tambah',
        name: 'mahasiswa-tambah',
        component: MahasiswaTambah,
        meta: { title: 'Tambah Mahasiswa' }
      },
      {
        path: 'mahasiswa/edit/:id',
        name: 'mahasiswa-edit',
        component: MahasiswaEdit,
        meta: { title: 'Edit Mahasiswa' }
      },
      {
        path: 'laporan',
        name: 'laporan',
        component: LaporanView,
        meta: { title: 'Laporan' }
      },
      {
        path: 'profil',
        name: 'admin-profil',
        component: ProfilAdmin,
        meta: { title: 'Profil Admin' }
      }
    ]
  },
  
  // Dosen Routes
  {
    path: '/dosen',
    component: DosenLayout,
    meta: { requiresAuth: true, role: 'dosen' },
    children: [
      {
        path: '',
        redirect: '/dosen/dashboard'
      },
      {
        path: 'dashboard',
        name: 'dosen-dashboard',
        component: DashboardDosen,
        meta: { title: 'Dashboard Dosen' }
      },
      {
        path: 'mahasiswa',
        name: 'dosen-mahasiswa',
        component: MahasiswaListDosen,
        meta: { title: 'Data Mahasiswa' }
      },
      {
        path: 'profil',
        name: 'dosen-profil',
        component: ProfilDosen,
        meta: { title: 'Profil Dosen' }
      }
    ]
  },
  
  // Mahasiswa Routes
  {
    path: '/mahasiswa',
    component: MahasiswaLayout,
    meta: { requiresAuth: true, role: 'mahasiswa' },
    children: [
      {
        path: '',
        redirect: '/mahasiswa/dashboard'
      },
      {
        path: 'dashboard',
        name: 'mahasiswa-dashboard',
        component: DashboardMahasiswa,
        meta: { title: 'Dashboard Mahasiswa' }
      },
      {
        path: 'nilai',
        name: 'mahasiswa-nilai',
        component: NilaiView,
        meta: { title: 'Nilai' }
      },
      {
        path: 'profil',
        name: 'mahasiswa-profil',
        component: ProfilMahasiswa,
        meta: { title: 'Profil Mahasiswa' }
      }
    ]
  },
  
  // Root redirect
  {
    path: '/',
    redirect: '/login'
  },
  
  // 404 Not Found
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  // Set page title
  document.title = to.meta.title ? `${to.meta.title} - SI Mahasiswa` : 'SI Manajemen Mahasiswa'
  
  // Get auth store
  const authStore = useAuthStore()
  
  // Initialize auth if not already done
  if (!authStore.user && localStorage.getItem('token')) {
    authStore.initializeAuth()
  }
  
  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.role
  const isAuthenticated = authStore.isAuthenticated
  const userRole = authStore.userRole
  
  // Check if route requires authentication
  if (requiresAuth && !isAuthenticated) {
    // Redirect to login with return url
    return next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  }
  
  // Check role permission
  if (requiresAuth && requiredRole && userRole !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const roleRedirects = {
      admin: '/admin/dashboard',
      dosen: '/dosen/dashboard',
      mahasiswa: '/mahasiswa/dashboard'
    }
    
    const redirectPath = roleRedirects[userRole]
    if (redirectPath && to.path !== redirectPath) {
      return next(redirectPath)
    }
  }
  
  // If already logged in and trying to access login page
  if (to.name === 'login' && isAuthenticated) {
    const roleRedirects = {
      admin: '/admin/dashboard',
      dosen: '/dosen/dashboard',
      mahasiswa: '/mahasiswa/dashboard'
    }
    
    return next(roleRedirects[userRole] || '/')
  }
  
  // Proceed to route
  next()
})

// Handle router errors
router.onError((error) => {
  console.error('Router error:', error)
})

export default router