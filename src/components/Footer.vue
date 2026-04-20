<template>
  <footer class="border-t border-slate-200 bg-white">
    <div class="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
      <div>
        <p class="text-base font-semibold text-slate-900">Room Rental Finder for Students</p>
        <p class="mt-1 text-sm text-slate-500">
          Helping students find trusted rooms near their university.
        </p>
      </div>

      <div class="flex flex-wrap gap-4 text-sm text-slate-500">
        <RouterLink class="transition hover:text-slate-900" to="/">Home</RouterLink>
        <RouterLink class="transition hover:text-slate-900" to="/rooms">Rooms</RouterLink>
        <RouterLink class="transition hover:text-slate-900" to="/favorites">Favorites</RouterLink>
        <RouterLink class="transition hover:text-slate-900" to="/login">Login</RouterLink>
      </div>

      <p class="text-sm text-slate-400">
        © 2026 Room Rental Finder. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
