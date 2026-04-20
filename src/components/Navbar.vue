<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <RouterLink class="flex items-center gap-3" to="/">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-sm font-bold text-white shadow-lg shadow-green-600/20">
          RR
        </div>
        <div>
          <p class="text-sm font-semibold text-slate-900">Room Rental Finder</p>
          <p class="text-xs text-slate-500">for Students</p>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-2 md:flex">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          active-class="bg-green-50 text-green-700"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink
          v-if="canAccessDashboard"
          to="/dashboard"
          class="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          active-class="bg-green-50 text-green-700"
        >
          Dashboard
        </RouterLink>
      </nav>

      <div class="hidden items-center gap-3 md:flex">
        <template v-if="!auth.isAuthenticated()">
          <RouterLink
            class="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            to="/login"
          >
            Login
          </RouterLink>
          <RouterLink
            class="inline-flex items-center rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            to="/register"
          >
            Register
          </RouterLink>
        </template>
        <template v-else>
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium text-gray-700">{{ auth.state.user?.name }}</span>
            <button
              @click="handleLogout"
              class="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </template>
      </div>

      <button
        class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 md:hidden"
        type="button"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <span class="text-lg">{{ isMobileMenuOpen ? '✕' : '☰' }}</span>
      </button>
    </div>

    <div v-if="isMobileMenuOpen" class="border-t border-slate-200 bg-white md:hidden">
      <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav class="space-y-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            @click="isMobileMenuOpen = false"
          >
            {{ link.label }}
          </RouterLink>
          <RouterLink
            v-if="canAccessDashboard"
            to="/dashboard"
            class="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            @click="isMobileMenuOpen = false"
          >
            Dashboard
          </RouterLink>
        </nav>

        <div class="mt-4 grid gap-3 border-t border-slate-200 pt-4">
          <template v-if="!auth.isAuthenticated()">
            <RouterLink
              class="block rounded-2xl px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              to="/login"
              @click="isMobileMenuOpen = false"
            >
              Login
            </RouterLink>
            <RouterLink
              class="block rounded-2xl bg-green-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700"
              to="/register"
              @click="isMobileMenuOpen = false"
            >
              Register
            </RouterLink>
          </template>
          <template v-else>
            <button
              @click="handleLogout"
              class="block rounded-2xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Logout
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const isMobileMenuOpen = ref(false)
const auth = useAuthStore()
const router = useRouter()

const canAccessDashboard = computed(() => {
  const role = auth.state.user?.role
  return auth.isAuthenticated() && (role === 'landlord' || role === 'admin')
})

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Rooms', to: '/rooms' },
  { label: 'Favorites', to: '/favorites' },
]

const handleLogout = () => {
  auth.logout()
  isMobileMenuOpen.value = false
  router.push('/')
}
</script>
