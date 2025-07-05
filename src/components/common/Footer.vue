<template>
  <footer class="text-center py-3 bg-light border-top mt-auto">
    <small class="text-muted">
      &copy; {{ year }} Sistem Informasi Manajemen Mahasiswa
    </small>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
footer {
  width: 100%;
  font-size: 0.875rem;
}
</style>
