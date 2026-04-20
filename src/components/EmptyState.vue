<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    </div>
    <h3 class="mt-4 text-xl font-semibold text-gray-900">{{ title }}</h3>
    <p class="mt-2 max-w-sm text-gray-500">{{ message }}</p>
    <button
      v-if="showReset"
      @click="$emit('reset')"
      class="mt-6 font-medium text-green-600 hover:text-green-500"
    >
      Clear all filters
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'No rooms found'
  },
  message: {
    type: String,
    default: 'Try adjusting your filters to find what you are looking for.'
  },
  showReset: {
    type: Boolean,
    default: true
  }
})

defineEmits(['reset'])
</script>
