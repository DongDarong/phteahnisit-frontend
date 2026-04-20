<template>
  <section class="bg-white py-16">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <span class="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-700">
          How It Works
        </span>
        <h2 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
          Rent your next room in three simple steps
        </h2>
        <p class="mt-3 text-sm leading-6 text-slate-500">
          Designed to help students find reliable housing faster with less friction.
        </p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <article
          v-for="step in steps"
          :key="step.title"
          class="rounded-3xl border border-slate-200 bg-slate-50 p-6"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-lg font-bold text-white">
            {{ step.number }}
          </div>
          <h3 class="mt-5 text-xl font-semibold text-slate-900">
            {{ step.title }}
          </h3>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            {{ step.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  {
    number: '1',
    title: 'Search rooms',
    description: 'Use location, budget, and university filters to narrow down the right room for your needs.',
  },
  {
    number: '2',
    title: 'View details',
    description: 'Open room listings to compare photos, pricing, amenities, and nearby campus information.',
  },
  {
    number: '3',
    title: 'Contact landlord',
    description: 'Reach out directly to landlords once you find a room that fits your lifestyle and budget.',
  },
]
</script>
