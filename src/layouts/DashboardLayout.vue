<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar :is-open="isSidebarOpen" />
    
    <div class="flex-1 flex flex-col min-w-0">
      <Topbar @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />
      
      <main class="flex-1 overflow-y-auto p-8">
        <div class="mx-auto max-w-7xl">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>

    <!-- Mobile Overlay -->
    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden"
      @click="isSidebarOpen = false"
    ></div>

    <!-- Global Dashboard Notifications -->
    <ToastNotification />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Topbar from '../components/Topbar.vue'
import ToastNotification from '../components/notifications/ToastNotification.vue'

const isSidebarOpen = ref(false)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
