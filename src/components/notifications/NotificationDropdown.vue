<template>
  <div class="absolute right-0 mt-2 w-80 sm:w-96 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-200 z-50 transition-all duration-300 transform origin-top-right">
    <div class="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-4 py-3">
      <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider">Notifications</h3>
      <div class="flex gap-2">
        <button 
          v-if="notifications.length > 0"
          @click="$emit('mark-all-read')"
          class="text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase"
        >
          Mark all read
        </button>
        <button 
          v-if="notifications.length > 0"
          @click="$emit('clear-all')"
          class="text-[10px] font-bold text-red-500 hover:text-red-600 uppercase"
        >
          Clear
        </button>
      </div>
    </div>

    <div class="max-h-[400px] overflow-y-auto scrollbar-hide">
      <template v-if="notifications.length > 0">
        <NotificationItem 
          v-for="item in notifications" 
          :key="item.id" 
          :notification="item" 
          @read="$emit('read', $event)"
        />
      </template>
      <div v-else class="flex flex-col items-center justify-center py-12 text-center px-6">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-400 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-900">No notifications yet</p>
        <p class="mt-1 text-xs text-gray-500">We'll alert you when something happens on the platform.</p>
      </div>
    </div>

    <div v-if="notifications.length > 0" class="border-t border-gray-100 bg-gray-50/50 p-2 text-center">
      <button class="text-[11px] font-bold text-gray-500 hover:text-gray-900 transition-colors uppercase">
        View All Activity
      </button>
    </div>
  </div>
</template>

<script setup>
import NotificationItem from './NotificationItem.vue';

defineProps({
  notifications: {
    type: Array,
    required: true
  }
});

defineEmits(['read', 'mark-all-read', 'clear-all']);
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
