<template>
  <div class="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-1 hover:shadow-xl">
    <div class="relative aspect-[4/3] overflow-hidden">
      <img
        :src="room.image || 'https://via.placeholder.com/400x300?text=No+Image'"
        :alt="room.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <!-- Price Badge -->
      <div class="absolute top-3 right-3">
        <span class="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-bold text-white shadow-lg">
          ${{ room.price }}/mo
        </span>
      </div>

      <!-- Favorite Toggle -->
      <button 
        @click.stop.prevent="$emit('toggle-favorite', room)"
        :disabled="favoriteLoading"
        class="absolute top-3 left-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-700 backdrop-blur-sm transition-all hover:bg-white hover:text-red-500 disabled:opacity-50"
        :class="{ 'text-red-500': isFavorited }"
      >
        <svg 
          v-if="favoriteLoading" 
          class="h-4 w-4 animate-spin" 
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg 
          v-else
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5" 
          :class="{ 'fill-current': isFavorited }"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>

    <div class="p-5">
      <div class="flex items-start justify-between">
        <h3 class="text-lg font-bold text-gray-900 line-clamp-1">
          {{ room.title }}
        </h3>
      </div>

      <div class="mt-2 space-y-2">
        <div class="flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ room.location }}
        </div>
        <div class="flex items-center text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-1.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Nearby: {{ room.university || room.nearby_university || 'N/A' }}
        </div>
      </div>

      <div class="mt-6">
        <router-link
          :to="`/rooms/${room.id}`"
          class="block w-full rounded-xl bg-gray-50 py-3 text-center text-sm font-semibold text-gray-900 transition-colors hover:bg-green-600 hover:text-white"
        >
          View Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  room: {
    type: Object,
    required: true
  },
  isFavorited: {
    type: Boolean,
    default: false
  },
  favoriteLoading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-favorite'])
</script>
