<template>
  <div class="space-y-8">
    <!-- Header Info -->
    <div>
      <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">{{ room.title }}</h1>
      <div class="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ room.location }}
        </div>
        <div class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Near {{ room.university || 'Main University' }}
        </div>
        <div v-if="room.size" class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          {{ room.size }} sqft
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="border-t border-gray-100 pt-8">
      <h2 class="text-xl font-bold text-gray-900">Description</h2>
      <p class="mt-4 text-gray-600 leading-relaxed">
        {{ room.description || 'This cozy and well-located room offers everything a student needs. It is situated in a safe neighborhood with easy access to public transportation and local amenities.' }}
      </p>
    </div>

    <!-- Facilities -->
    <div class="border-t border-gray-100 pt-8">
      <h2 class="text-xl font-bold text-gray-900">What this room offers</h2>
      <div class="mt-6 grid grid-cols-2 gap-y-4 sm:grid-cols-3">
        <div v-for="facility in facilities" :key="facility.name" class="flex items-center gap-3 text-gray-600">
          <component :is="facility.icon" class="h-6 w-6 text-green-600" />
          <span class="text-sm">{{ facility.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { h } from 'vue'

const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

// Define actual functional components for the icons using h() instead of template strings
const createFacilityIcon = (d) => ({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 2,
    class: 'h-6 w-6 text-green-600'
  }, [
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d })
  ])
})

const IconWifi = createFacilityIcon('M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.345 8.99c5.857-5.858 15.354-5.858 21.21 0')
const IconBed = createFacilityIcon('M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6')
const IconBath = createFacilityIcon('M12 22a8 8 0 008-8V7a1 1 0 00-1-1H5a1 1 0 00-1 1v7a8 8 0 008 8zm0 0V15')
const IconDesk = createFacilityIcon('M4 7h16M4 10h16M4 13h16M4 16h16')
const IconAC = createFacilityIcon('M12 8V4m0 0l-2 2m2-2l2 2m4 4h4m-4 0l-2-2m2 2l-2 2M4 12H0m4 0l2 2m-2-2l2-2m4 4v4m0 0l2-2m-2 2l-2 2')
const IconCheck = createFacilityIcon('M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z')

const facilities = [
  { name: 'Fast WiFi', icon: IconWifi },
  { name: 'Bed Included', icon: IconBed },
  { name: 'Private Bathroom', icon: IconBath },
  { name: 'Desk & Chair', icon: IconDesk },
  { name: 'Air Conditioning', icon: IconAC },
  { name: 'Utilities Included', icon: IconCheck }
]
</script>
