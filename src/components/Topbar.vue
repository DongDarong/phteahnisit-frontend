<template>
  <header class="flex h-16 items-center justify-between border-b bg-white px-8">
    <div class="flex items-center gap-4">
      <button 
        @click="$emit('toggle-sidebar')"
        class="text-gray-500 hover:text-gray-900 lg:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h2 class="text-lg font-semibold text-gray-900">{{ pageTitle }}</h2>
    </div>

    <div class="flex items-center gap-4">
      <!-- Notification System -->
      <NotificationBell />

      <div class="h-8 w-px bg-gray-100 mx-2"></div>

      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <p class="text-sm font-semibold text-gray-900">{{ auth.state.user?.name }}</p>
          <p class="text-xs text-gray-500 capitalize">{{ auth.state.user?.role }}</p>
        </div>
        <div class="h-10 w-10 overflow-hidden rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center">
          {{ auth.state.user?.name?.charAt(0) }}
        </div>
      </div>
      <button 
        @click="handleLogout"
        class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors"
        title="Logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import NotificationBell from './notifications/NotificationBell.vue'

defineEmits(['toggle-sidebar'])

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const pageTitle = computed(() => {
  const path = route.path
  if (path === '/dashboard') return 'Overview'
  if (path.includes('/rooms')) return 'My Rooms'
  if (path.includes('/add-room')) return 'Add New Room'
  if (path.includes('/edit-room')) return 'Edit Room'
  if (path.includes('/analytics')) return 'Analytics'
  if (path.includes('/users')) return 'User Management'
  return 'Dashboard'
})

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>
