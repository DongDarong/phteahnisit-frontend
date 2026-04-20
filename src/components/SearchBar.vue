<template>
  <div class="relative w-full max-w-2xl">
    <div class="relative flex items-center">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="h-12 w-full rounded-xl border-none bg-white pl-12 pr-4 shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-green-500"
        placeholder="Search rooms by title..."
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>
