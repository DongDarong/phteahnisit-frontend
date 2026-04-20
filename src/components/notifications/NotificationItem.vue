<template>
  <div 
    class="flex gap-4 p-4 transition-colors hover:bg-gray-50 cursor-pointer border-b border-gray-100"
    :class="{ 'bg-blue-50/30': !notification.read }"
    @click="$emit('read', notification.id)"
  >
    <div 
      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm"
      :class="severityClasses[notification.severity]"
    >
      <component :is="severityIcons[notification.severity]" class="h-5 w-5" />
    </div>

    <div class="flex-1 min-w-0">
      <div class="flex items-center justify-between gap-2">
        <p class="text-sm font-bold text-gray-900 truncate">{{ notification.title }}</p>
        <span class="text-[10px] font-medium text-gray-400 whitespace-nowrap">{{ timeAgo }}</span>
      </div>
      <p class="mt-1 text-xs text-gray-600 line-clamp-2 leading-relaxed">
        {{ notification.message }}
      </p>
    </div>

    <div v-if="!notification.read" class="mt-2 shrink-0">
      <div class="h-2 w-2 rounded-full bg-blue-600"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, h } from 'vue';

const props = defineProps({
  notification: {
    type: Object,
    required: true
  }
});

defineEmits(['read']);

const timeAgo = computed(() => {
  const seconds = Math.floor((new Date() - new Date(props.notification.timestamp)) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return new Date(props.notification.timestamp).toLocaleDateString();
});

const severityClasses = {
  success: 'bg-green-100 text-green-600',
  info: 'bg-blue-100 text-blue-600',
  warning: 'bg-yellow-100 text-yellow-600',
  danger: 'bg-red-100 text-red-600'
};

// Helper for functional icons
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
});

const IconSuccess = createIcon('M5 13l4 4L19 7');
const IconInfo = createIcon('M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z');
const IconWarning = createIcon('M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z');
const IconDanger = IconWarning;

const severityIcons = {
  success: IconSuccess,
  info: IconInfo,
  warning: IconWarning,
  danger: IconDanger
};
</script>
