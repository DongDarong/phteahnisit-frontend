<template>
  <div 
    class="fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 lg:static lg:translate-x-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Brand -->
    <div class="flex h-16 items-center border-b px-6">
      <router-link to="/" class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white font-bold">R</div>
        <span class="text-xl font-bold text-gray-900 tracking-tight">RoomFinder</span>
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="mt-6 space-y-1 px-4">
      <router-link
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
        :class="isActive(item.to) 
          ? 'bg-green-600 text-white' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
      >
        <component :is="item.icon" class="h-5 w-5" />
        {{ item.label }}
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { computed, h } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'

const props = defineProps({
  isOpen: Boolean
})

const route = useRoute()
const auth = useAuthStore()

const isActive = (path) => {
  if (path === '/dashboard') {
    return route.path === '/dashboard'
  }
  return route.path.startsWith(path)
}

const menuItems = computed(() => {
  const baseItems = [
    { label: 'Dashboard', to: '/dashboard', icon: IconHome },
    { label: 'My Rooms', to: '/dashboard/rooms', icon: IconRoom },
    { label: 'Add Room', to: '/dashboard/add-room', icon: IconAdd },
    { label: 'Analytics', to: '/dashboard/analytics', icon: IconChart },
    { label: 'Live Data', to: '/dashboard/realtime', icon: IconPulse },
  ]

  if (auth.state.user?.role === 'admin') {
    baseItems.push({ label: 'Users', to: '/dashboard/users', icon: IconUsers })
  }

  return baseItems
})

// Helper to create functional icon components without templates
const createIcon = (d) => ({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 2
  }, [
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d })
  ])
})

const IconHome = createIcon('M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6')
const IconRoom = createIcon('M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4')
const IconAdd = createIcon('M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z')
const IconChart = createIcon('M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z')
const IconUsers = createIcon('M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z')
const IconPulse = createIcon('M13 10V3L4 14h7v7l9-11h-7z')
</script>
