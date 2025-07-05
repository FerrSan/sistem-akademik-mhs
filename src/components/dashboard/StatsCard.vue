<!-- src/components/dashboard/StatsCard.vue -->
<template>
  <div class="stats-card card border-0 shadow-sm" :class="{ 'card-hover': hover }">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="flex-shrink-0">
          <div class="icon-wrapper" :class="`bg-${variant} bg-opacity-10`">
            <i :class="`bi bi-${icon} text-${variant} fs-3`"></i>
          </div>
        </div>
        <div class="flex-grow-1 ms-3">
          <h6 class="text-muted mb-1">{{ title }}</h6>
          <h3 class="mb-0">{{ value }}</h3>
          <small v-if="subtitle" :class="subtitleClass">
            <i v-if="trend" :class="`bi bi-arrow-${trend}`"></i>
            {{ subtitle }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: String,
    default: 'graph-up'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  subtitle: {
    type: String,
    default: ''
  },
  trend: {
    type: String,
    default: '',
    validator: (value) => ['', 'up', 'down'].includes(value)
  },
  hover: {
    type: Boolean,
    default: false
  }
})

// Computed
const subtitleClass = computed(() => {
  if (!props.trend) return 'text-muted'
  return props.trend === 'up' ? 'text-success' : 'text-danger'
})
</script>

<style scoped>
.stats-card {
  transition: all 0.3s ease;
}

.card-hover {
  cursor: pointer;
}

.card-hover:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
}

.icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

h3 {
  font-weight: 600;
  color: #2d3748;
}
</style>