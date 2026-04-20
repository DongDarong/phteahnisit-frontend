<template>
  <section class="container-shell py-12 sm:py-16">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span class="badge">Saved rooms</span>
        <h1 class="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Your favorite listings
        </h1>
      </div>
      <p class="text-sm text-slate-500">
        Keep a shortlist of the best room options before making contact.
      </p>
    </div>

    <div v-if="loading" class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="item in 3"
        :key="item"
        class="h-[420px] animate-pulse rounded-[2rem] bg-white"
      />
    </div>

    <div v-else-if="error" class="panel mt-8 p-8 text-center">
      <p class="text-lg font-semibold text-slate-900">Unable to load favorites.</p>
      <p class="mt-2 text-sm text-slate-500">{{ error }}</p>
      <button class="btn-primary mt-6" type="button" @click="fetchFavorites">
        Try again
      </button>
    </div>

    <div v-else-if="favoriteRooms.length" class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <RoomCard
        v-for="room in favoriteRooms"
        :key="room.id"
        :favorite-loading="favoriteLoadingIds.includes(room.id)"
        :is-favorited="true"
        :room="room"
        @toggle-favorite="toggleFavorite"
      />
    </div>

    <div v-else class="panel mt-8 p-10 text-center">
      <p class="text-lg font-semibold text-slate-900">No saved rooms yet.</p>
      <p class="mt-2 text-sm text-slate-500">
        Browse listings and save rooms you want to compare later.
      </p>
      <RouterLink class="btn-primary mt-6" to="/rooms">
        Explore rooms
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../api/axios'
import RoomCard from '../components/RoomCard.vue'

const favoriteRooms = ref([])
const favoriteLoadingIds = ref([])
const loading = ref(false)
const error = ref('')

const normalizeFavorites = (payload) => payload?.data || payload?.favorites || payload || []

const fetchFavorites = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data } = await api.get('/favorites')
    favoriteRooms.value = normalizeFavorites(data).map((item) => item.room || item)
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}

const toggleFavorite = async (room) => {
  favoriteLoadingIds.value = [...favoriteLoadingIds.value, room.id]

  try {
    await api.post('/favorites', { room_id: room.id })
    favoriteRooms.value = favoriteRooms.value.filter((favoriteRoom) => favoriteRoom.id !== room.id)
  } finally {
    favoriteLoadingIds.value = favoriteLoadingIds.value.filter((id) => id !== room.id)
  }
}

onMounted(fetchFavorites)
</script>
