<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="i in count" :key="i" class="animate-pulse overflow-hidden rounded-xl bg-white shadow-sm">
      <div class="h-48 bg-gray-200"></div>
      <div class="p-5">
        <div class="h-4 w-3/4 rounded bg-gray-200"></div>
        <div class="mt-4 h-3 w-1/2 rounded bg-gray-200"></div>
        <div class="mt-4 flex items-center justify-between">
          <div class="h-5 w-1/4 rounded bg-gray-200"></div>
          <div class="h-8 w-1/3 rounded-lg bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 6
  }
})
</script>
