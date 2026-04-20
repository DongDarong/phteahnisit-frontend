<template>
  <section class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <span class="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
          Featured Rooms
        </span>
        <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
          Popular room picks for students
        </h2>
        <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Browse high-demand rooms near major universities and compare the best options quickly.
        </p>
      </div>

      <RouterLink class="text-sm font-semibold text-green-700 transition hover:text-green-800" to="/rooms">
        View all rooms
      </RouterLink>
    </div>

    <div v-if="loading" class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="item in 6"
        :key="item"
        class="overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div class="h-56 animate-pulse rounded-2xl bg-slate-200" />
        <div class="mt-5 h-5 w-3/4 animate-pulse rounded-full bg-slate-200" />
        <div class="mt-3 h-4 w-1/2 animate-pulse rounded-full bg-slate-200" />
        <div class="mt-5 h-11 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </div>

    <div v-else-if="error" class="mt-8 rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center">
      <p class="text-lg font-semibold text-slate-900">Unable to load featured rooms.</p>
      <p class="mt-2 text-sm text-slate-600">{{ error }}</p>
      <button
        class="mt-6 inline-flex items-center justify-center rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
        type="button"
        @click="$emit('retry')"
      >
        Try Again
      </button>
    </div>

    <div v-else-if="rooms.length" class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <RoomCard
        v-for="room in rooms"
        :key="room.id"
        :room="room"
      />
    </div>

    <div v-else class="mt-8 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <p class="text-lg font-semibold text-slate-900">No rooms available right now.</p>
      <p class="mt-2 text-sm text-slate-500">
        Check back soon for newly listed student rental rooms.
      </p>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import RoomCard from './RoomCard.vue'

defineProps({
  rooms: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})

defineEmits(['retry'])
</script>
