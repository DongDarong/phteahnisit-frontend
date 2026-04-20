<template>
  <div class="fixed top-24 right-4 z-[100] flex flex-col gap-3 w-80 sm:w-96 pointer-events-none">
    <transition-group 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div 
        v-for="toast in activeToasts" 
        :key="toast.id"
        class="pointer-events-auto overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
      >
        <div class="flex p-4">
          <div 
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm"
            :class="severityClasses[toast.severity]"
          >
            <component :is="severityIcons[toast.severity]" class="h-5 w-5" />
          </div>

          <div class="ml-4 flex-1">
            <p class="text-sm font-bold text-gray-900">{{ toast.title }}</p>
            <p class="mt-1 text-xs text-gray-500">{{ toast.message }}</p>
          </div>

          <button 
            @click="dismiss(toast.id)"
            class="ml-4 shrink-0 text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Progress Bar (Auto-dismiss timer) -->
        <div class="h-1 w-full bg-gray-100">
          <div 
            class="h-full bg-current transition-all duration-[3000ms] linear"
            :class="severityTextClasses[toast.severity]"
            :style="{ width: timers[toast.id] ? '0%' : '100%' }"
          ></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, watch, h } from 'vue';
import { useNotifications } from '../../composables/useNotifications';

const { toasts, removeToast } = useNotifications();
const activeToasts = ref([]);
const timers = ref({});

const severityClasses = {
  success: 'bg-green-100 text-green-600',
  info: 'bg-blue-100 text-blue-600',
  warning: 'bg-yellow-100 text-yellow-600',
  danger: 'bg-red-100 text-red-600'
};

const severityTextClasses = {
  success: 'text-green-500',
  info: 'text-blue-500',
  warning: 'text-yellow-500',
  danger: 'text-red-500'
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
const IconDanger = IconWarning; // Same icon, different color class

const severityIcons = {
  success: IconSuccess,
  info: IconInfo,
  warning: IconWarning,
  danger: IconDanger
};

const dismiss = (id) => {
  activeToasts.value = activeToasts.value.filter(t => t.id !== id);
  removeToast(id);
};

// Handle incoming toasts from the composable
watch(toasts, (newList) => {
  if (newList.length === 0) return;
  
  const latest = newList[newList.length - 1];
  
  // Only add if not already in active list
  if (!activeToasts.value.find(t => t.id === latest.id)) {
    activeToasts.value.push(latest);
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      timers.value[latest.id] = true;
      setTimeout(() => {
        dismiss(latest.id);
      }, 500); // Small buffer for animation
    }, 3000);
  }
}, { deep: true });
</script>
