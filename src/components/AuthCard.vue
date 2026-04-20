<template>
  <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/70 ring-1 ring-slate-200 sm:p-8">
    <div class="mb-8">
      <span
        v-if="eyebrow"
        class="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-700"
      >
        {{ eyebrow }}
      </span>
      <h1 class="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
        {{ title }}
      </h1>
      <p v-if="description" class="mt-2 text-sm leading-6 text-slate-500">
        {{ description }}
      </p>
    </div>

    <slot />
  </div>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>
