<template>
  <button
    @click="$emit('toggle')"
    :disabled="loading"
    class="group flex items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-all active:scale-95 disabled:opacity-50"
    :class="isFavorited 
      ? 'border-red-100 bg-red-50 text-red-600 hover:bg-red-100' 
      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="h-5 w-5 transition-transform group-hover:scale-110" 
      :class="isFavorited ? 'fill-current' : 'fill-none'"
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
      />
    </svg>
    <span>{{ isFavorited ? 'Saved' : 'Save for Later' }}</span>
  </button>
</template>

<script setup>
defineProps({
  isFavorited: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle'])
</script>
