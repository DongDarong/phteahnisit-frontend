<template>
  <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-500">{{ title }}</p>
        <p class="mt-2 text-3xl font-bold text-gray-900">{{ value }}</p>
      </div>
      <div 
        class="flex h-12 w-12 items-center justify-center rounded-xl"
        :class="iconClasses"
      >
        <component :is="iconComponent" class="h-6 w-6" />
      </div>
    </div>
    <div v-if="trend !== undefined" class="mt-4 flex items-center gap-1 text-sm">
      <span :class="trend >= 0 ? 'text-green-600' : 'text-red-600'" class="font-bold flex items-center">
        <svg v-if="trend >= 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
        </svg>
        {{ trend >= 0 ? '+' : '' }}{{ trend }}%
      </span>
      <span class="text-gray-400 text-xs font-medium ml-1">vs last month</span>
    </div>
  </div>
</template>

<script setup>
import { computed, h } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  trend: Number,
  icon: {
    type: String,
    default: 'chart'
  },
  color: {
    type: String,
    default: 'green'
  }
})

const iconClasses = computed(() => {
  const colors = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600'
  }
  return colors[props.color] || colors.green
})

// Use render functions instead of templates to avoid runtime compilation requirement
const createIcon = (d) => ({
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 2
  }, [
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d })
  ])
})

const IconUsers = createIcon('M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z')
const IconHome = createIcon('M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6')
const IconEye = {
  render: () => h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 2
  }, [
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' }),
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' })
  ])
}
const IconHeart = createIcon('M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z')

const iconComponent = computed(() => {
  switch (props.icon) {
    case 'users': return IconUsers
    case 'home': return IconHome
    case 'eye': return IconEye
    case 'heart': return IconHeart
    default: return IconUsers
  }
})
</script>
