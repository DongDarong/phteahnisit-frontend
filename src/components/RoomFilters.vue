<template>
  <div class="space-y-6">
    <!-- Location Filter -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
      <select
        :value="filters.location"
        @change="$emit('update:filter', 'location', $event.target.value)"
        class="w-full rounded-lg border-gray-200 bg-white text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
      >
        <option value="">All Locations</option>
        <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
      </select>
    </div>

    <!-- University Filter -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Nearby University</label>
      <select
        :value="filters.university"
        @change="$emit('update:filter', 'university', $event.target.value)"
        class="w-full rounded-lg border-gray-200 bg-white text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
      >
        <option value="">All Universities</option>
        <option v-for="uni in universities" :key="uni" :value="uni">{{ uni }}</option>
      </select>
    </div>

    <!-- Price Range Filter -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Price Range ($)</label>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <input
            type="number"
            :value="filters.minPrice"
            @input="$emit('update:filter', 'minPrice', $event.target.value)"
            placeholder="Min"
            class="w-full rounded-lg border-gray-200 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <input
            type="number"
            :value="filters.maxPrice"
            @input="$emit('update:filter', 'maxPrice', $event.target.value)"
            placeholder="Max"
            class="w-full rounded-lg border-gray-200 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>
    </div>

    <button
      @click="$emit('reset')"
      class="w-full rounded-lg border border-gray-200 bg-white py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
    >
      Reset Filters
    </button>
  </div>
</template>

<script setup>
defineProps({
  filters: {
    type: Object,
    required: true
  },
  locations: {
    type: Array,
    default: () => ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville']
  },
  universities: {
    type: Array,
    default: () => ['RUPP', 'ITC', 'NUM', 'UC', 'RULE', 'Norton']
  }
})

defineEmits(['update:filter', 'reset'])
</script>
