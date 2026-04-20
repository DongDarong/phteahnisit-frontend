<template>
  <div class="min-h-screen bg-gray-50 pb-12 pt-8">
    <div class="container-shell">
      <!-- Header -->
      <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Find Your Perfect Room</h1>
          <p class="mt-2 text-gray-600">Browse through the best student-friendly rentals near your campus.</p>
        </div>
        <div class="hidden md:block">
          <SearchBar v-model="filters.search" />
        </div>
      </div>

      <!-- Mobile Search (only visible on small screens) -->
      <div class="mb-6 md:hidden">
        <SearchBar v-model="filters.search" />
      </div>

      <div class="flex flex-col gap-8 lg:flex-row">
        <!-- Sidebar Filters -->
        <aside class="w-full lg:w-64 flex-shrink-0">
          <div class="sticky top-24 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 class="mb-4 text-lg font-semibold text-gray-900">Filters</h2>
            <RoomFilters
              :filters="filters"
              @update:filter="updateFilter"
              @reset="resetFilters"
            />
          </div>
        </aside>

        <!-- Room Listing -->
        <main class="flex-1">
          <!-- Loading State -->
          <LoadingSkeleton v-if="loading" :count="6" />

          <!-- Error State -->
          <div v-else-if="error" class="rounded-2xl bg-white p-12 text-center shadow-sm">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">Failed to load rooms</h3>
            <p class="mt-2 text-gray-500">{{ error }}</p>
            <button @click="fetchRooms" class="mt-6 rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700">
              Try Again
            </button>
          </div>

          <!-- Results -->
          <template v-else>
            <div v-if="rooms.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <RoomCard
                v-for="room in rooms"
                :key="room.id"
                :room="room"
                :is-favorited="favoriteIds.has(room.id)"
                :favorite-loading="favoriteLoadingIds.includes(room.id)"
                @toggle-favorite="handleToggleFavorite"
              />
            </div>

            <!-- Empty State -->
            <EmptyState
              v-else
              @reset="resetFilters"
            />
          </template>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api/axios'
import EmptyState from '../components/EmptyState.vue'
import LoadingSkeleton from '../components/LoadingSkeleton.vue'
import RoomCard from '../components/RoomCard.vue'
import RoomFilters from '../components/RoomFilters.vue'
import SearchBar from '../components/SearchBar.vue'
import { getFilteredRooms, toggleFavorite } from '../services/roomService'
import { useAuthStore } from '../store/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const rooms = ref([])
const loading = ref(true)
const error = ref(null)
const favoriteIds = ref(new Set())
const favoriteLoadingIds = ref([])

// Initialize filters from query params
const filters = reactive({
  search: route.query.search || '',
  location: route.query.location || '',
  university: route.query.university || '',
  minPrice: route.query.min_price || '',
  maxPrice: route.query.max_price || ''
})

const fetchRooms = async () => {
  loading.value = true
  error.value = null
  try {
    rooms.value = await getFilteredRooms(filters)
    if (auth.isAuthenticated()) {
      await fetchFavorites()
    }
  } catch (err) {
    error.value = err.message || 'An error occurred while fetching rooms.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const fetchFavorites = async () => {
  try {
    const { data } = await api.get('/favorites')
    const favorites = data.data || []
    favoriteIds.value = new Set(favorites.map(f => f.room_id || f.id))
  } catch (err) {
    console.error('Error fetching favorites:', err)
  }
}

const handleToggleFavorite = async (room) => {
  if (!auth.isAuthenticated()) {
    router.push({ name: 'login', query: { redirect: route.fullPath } })
    return
  }

  favoriteLoadingIds.value = [...favoriteLoadingIds.value, room.id]
  try {
    await toggleFavorite(room.id)
    const nextFavorites = new Set(favoriteIds.value)
    if (nextFavorites.has(room.id)) {
      nextFavorites.delete(room.id)
    } else {
      nextFavorites.add(room.id)
    }
    favoriteIds.value = nextFavorites
  } catch (err) {
    console.error('Error toggling favorite:', err)
  } finally {
    favoriteLoadingIds.value = favoriteLoadingIds.value.filter(id => id !== room.id)
  }
}

const updateFilter = (key, value) => {
  filters[key] = value
}

const resetFilters = () => {
  filters.search = ''
  filters.location = ''
  filters.university = ''
  filters.minPrice = ''
  filters.maxPrice = ''
}

const syncQueryParams = () => {
  const query = {}
  if (filters.search) query.search = filters.search
  if (filters.location) query.location = filters.location
  if (filters.university) query.university = filters.university
  if (filters.minPrice) query.min_price = filters.minPrice
  if (filters.maxPrice) query.max_price = filters.maxPrice

  router.push({ query })
}

// Watch filters and fetch data
watch(filters, () => {
  syncQueryParams()
  fetchRooms()
})

onMounted(() => {
  fetchRooms()
})
</script>
