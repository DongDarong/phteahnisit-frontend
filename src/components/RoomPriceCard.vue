<template>
  <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
    <div class="flex items-baseline justify-between">
      <div class="flex items-baseline gap-1">
        <span class="text-3xl font-extrabold text-green-600">${{ room.price }}</span>
        <span class="text-sm font-medium text-gray-500">/ month</span>
      </div>
      <div class="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700 uppercase tracking-wider">
        {{ room.status || 'Available' }}
      </div>
    </div>

    <div class="mt-6 space-y-4 border-t border-gray-100 pt-6">
      <div class="flex justify-between text-sm">
        <span class="text-gray-500">Security Deposit</span>
        <span class="font-semibold text-gray-900">${{ room.deposit || room.price }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-500">Minimum Stay</span>
        <span class="font-semibold text-gray-900">{{ room.minStay || '6 months' }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-500">Available From</span>
        <span class="font-semibold text-gray-900">{{ room.availableFrom || 'Immediately' }}</span>
      </div>
    </div>

    <div class="mt-8 flex flex-col gap-3">
      <FavoriteButton
        :is-favorited="isFavorited"
        :loading="favoriteLoading"
        @toggle="$emit('toggle-favorite')"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup>
import FavoriteButton from './FavoriteButton.vue'

defineProps({
  room: {
    type: Object,
    required: true
  },
  isFavorited: {
    type: Boolean,
    default: false
  },
  favoriteLoading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['toggle-favorite'])
</script>
