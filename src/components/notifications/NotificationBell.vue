<template>
  <div class="relative inline-block text-left" v-outside-click="closeDropdown">
    <button 
      @click="toggleDropdown"
      class="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900"
      :class="{ 'bg-blue-50 text-blue-600': isOpen }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      
      <!-- Unread Badge -->
      <span 
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in"
      >
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </button>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 translate-y-1 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-1 scale-95"
    >
      <NotificationDropdown 
        v-if="isOpen"
        :notifications="notifications"
        @read="markAsRead"
        @mark-all-read="markAllAsRead"
        @clear-all="clearAll"
      />
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNotifications } from '../../composables/useNotifications';
import NotificationDropdown from './NotificationDropdown.vue';

const { 
  notifications, 
  unreadCount, 
  markAsRead, 
  markAllAsRead, 
  clearAll,
  start 
} = useNotifications();

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

// Start simulation when the component that uses it is mounted
// In a real app, this would likely be called globally
onMounted(() => {
  start();
});

// Custom directive for outside click
const vOutsideClick = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
};
</script>

<script>
// Required for the script setup hook to work correctly with onMounted
import { onMounted } from 'vue';
</script>
