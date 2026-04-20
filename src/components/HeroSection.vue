<template>
  <section class="relative overflow-hidden bg-slate-100">
    <div class="absolute inset-0 bg-gradient-to-br from-green-100 via-white to-slate-100" />
    <div class="absolute -left-24 top-24 h-64 w-64 rounded-full bg-green-200/50 blur-3xl" />
    <div class="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-slate-300/30 blur-3xl" />

    <div class="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span class="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-700 shadow-sm ring-1 ring-slate-200">
            Trusted Student Housing
          </span>

          <h1 class="mt-6 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Find Your Perfect Room Near Your University
          </h1>

          <p class="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Explore affordable student rooms, compare locations, and connect directly with landlords in the areas that matter most.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <RouterLink
              class="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              to="/rooms"
            >
              Browse Rooms
            </RouterLink>
            <RouterLink
              class="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              to="/register"
            >
              List a Room
            </RouterLink>
          </div>
        </div>

        <div class="relative">
          <div class="overflow-hidden rounded-[2rem] border border-white/70 bg-white p-3 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
            <img
              alt="Student room preview"
              class="h-[420px] w-full rounded-[1.5rem] object-cover"
              loading="lazy"
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
            >
          </div>

          <div class="absolute -bottom-6 left-6 right-6 grid grid-cols-3 gap-3 rounded-[1.75rem] border border-white/70 bg-white/95 p-5 text-center shadow-xl backdrop-blur">
            <div>
              <p class="text-2xl font-bold text-green-700">500+</p>
              <p class="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Listings</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-green-700">100+</p>
              <p class="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Campuses</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-green-700">24/7</p>
              <p class="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">Search</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
