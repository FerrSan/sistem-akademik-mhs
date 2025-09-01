<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 flex items-center justify-center p-4">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400 to-pink-600 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-300 to-blue-500 rounded-full opacity-10 animate-bounce-gentle"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
          <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Sistem Akademik</h1>
        <p class="text-gray-600">Kelola data akademik dengan mudah dan efisien</p>
      </div>
      
      <router-view class="animate-fade-in-up" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>