<!-- src/App.vue -->
<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize auth state from localStorage
  authStore.initializeAuth()
})
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Utility classes */
.cursor-pointer {
  cursor: pointer;
}

/* Override Bootstrap primary color */
:root {
  --bs-primary: #667eea;
  --bs-primary-rgb: 102, 126, 234;
}

.btn-primary {
  --bs-btn-bg: #667eea;
  --bs-btn-border-color: #667eea;
  --bs-btn-hover-bg: #5a67d8;
  --bs-btn-hover-border-color: #5a67d8;
  --bs-btn-active-bg: #4c51bf;
  --bs-btn-active-border-color: #4c51bf;
}

.bg-primary {
  background-color: #667eea !important;
}

.text-primary {
  color: #667eea !important;
}

.border-primary {
  border-color: #667eea !important;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Card hover effect */
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

/* Table improvements */
.table th {
  font-weight: 600;
  color: #495057;
  border-bottom-width: 2px;
}

.table-hover tbody tr:hover {
  background-color: rgba(102, 126, 234, 0.05);
}

/* Form improvements */
.form-control:focus,
.form-select:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

/* Loading spinner */
.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.2em;
}
</style>