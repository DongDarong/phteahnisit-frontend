<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <div class="flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h2 class="mt-6 text-2xl font-bold text-gray-900">{{ title }}</h2>
    <p class="mt-2 max-w-sm text-gray-500">{{ message }}</p>
    <div class="mt-8 flex gap-4">
      <router-link to="/rooms" class="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
        Back to Listings
      </router-link>
      <button @click="$emit('retry')" class="rounded-xl bg-green-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-700">
        Try Again
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Something went wrong'
  },
  message: {
    type: String,
    default: 'We encountered an error while loading the room details. Please try again later.'
  }
})

defineEmits(['retry'])
</script>
