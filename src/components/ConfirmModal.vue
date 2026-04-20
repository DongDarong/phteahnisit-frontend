<template>
  <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm" @click="$emit('cancel')"></div>
    
    <!-- Modal -->
    <div class="relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-2xl transition-all">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <div class="mt-4">
        <h3 class="text-lg font-bold text-gray-900">{{ title }}</h3>
        <p class="mt-2 text-sm text-gray-500">{{ message }}</p>
      </div>
      
      <div class="mt-8 flex justify-end gap-3">
        <button 
          @click="$emit('cancel')"
          class="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
          @click="$emit('confirm')"
          class="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Confirm Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: {
    type: String,
    default: 'Are you sure?'
  },
  message: {
    type: String,
    default: 'This action cannot be undone.'
  }
})

defineEmits(['confirm', 'cancel'])
</script>
