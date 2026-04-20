<template>
  <div class="min-h-screen bg-gray-50 pb-12 pt-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Header with Real-time Status -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Real-time Dashboard</h1>
          <p class="mt-1 text-gray-500">Live platform activity and student engagement metrics.</p>
        </div>

        <div class="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
          <div class="flex items-center gap-2">
            <span 
              class="relative flex h-3 w-3"
              :class="isConnected ? 'text-green-500' : 'text-red-500'"
            >
              <span 
                v-if="isConnected"
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
              ></span>
              <span class="relative inline-flex h-3 w-3 rounded-full bg-current"></span>
            </span>
            <span class="text-sm font-semibold uppercase tracking-wider" :class="isConnected ? 'text-green-700' : 'text-red-700'">
              {{ isConnected ? 'Connected' : 'Disconnected' }}
            </span>
          </div>
          
          <div class="h-6 w-px bg-gray-200"></div>

          <button 
            @click="toggleConnection"
            class="rounded-xl px-6 py-2 text-sm font-bold text-white transition-all shadow-lg active:scale-95"
            :class="isConnected ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-green-600 hover:bg-green-700 shadow-green-200'"
          >
            {{ isConnected ? 'Stop Simulation' : 'Start Live Feed' }}
          </button>
        </div>
      </div>

      <!-- Live Stat Cards -->
      <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <!-- Card: Total Users -->
        <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Live Users</p>
              <h3 class="mt-2 text-4xl font-black text-gray-900 tabular-nums transition-all">
                {{ stats.totalUsers.toLocaleString() }}
              </h3>
            </div>
            <div class="rounded-xl bg-green-50 p-3 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div v-if="isConnected" class="mt-4 flex items-center text-xs font-bold text-green-600">
            <span class="mr-1 animate-pulse">●</span> Processing live stream...
          </div>
        </div>

        <!-- Card: Total Rooms -->
        <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Rooms</p>
              <h3 class="mt-2 text-4xl font-black text-gray-900 tabular-nums">
                {{ stats.totalRooms.toLocaleString() }}
              </h3>
            </div>
            <div class="rounded-xl bg-blue-50 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <div class="mt-4 h-1.5 w-full rounded-full bg-gray-100">
            <div class="h-full rounded-full bg-blue-500 transition-all duration-1000" :style="{ width: '65%' }"></div>
          </div>
        </div>

        <!-- Card: Total Views -->
        <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Views</p>
              <h3 class="mt-2 text-4xl font-black text-gray-900 tabular-nums">
                {{ stats.totalViews.toLocaleString() }}
              </h3>
            </div>
            <div class="rounded-xl bg-purple-50 p-3 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 text-xs font-semibold text-purple-600">
            Avg. {{ Math.round(stats.totalViews / stats.totalRooms) }} views/room
          </div>
        </div>

        <!-- Card: Total Favorites -->
        <div class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Likes</p>
              <h3 class="mt-2 text-4xl font-black text-gray-900 tabular-nums">
                {{ stats.totalFavorites.toLocaleString() }}
              </h3>
            </div>
            <div class="rounded-xl bg-red-50 p-3 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-1 text-xs font-bold text-red-600">
            <span class="inline-block h-2 w-2 rounded-full bg-red-500"></span>
            Live favorites popping up!
          </div>
        </div>
      </div>

      <!-- Live Charts -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Chart: User Growth -->
        <div class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div class="mb-6 flex items-center justify-between">
            <div>
              <h4 class="text-xl font-bold text-gray-900">User Growth Trend</h4>
              <p class="text-sm text-gray-500">Cumulative student registrations</p>
            </div>
            <div class="rounded-lg bg-gray-50 px-3 py-1 text-xs font-bold text-gray-400">LIVE</div>
          </div>
          <LiveLineChart :labels="chartData.labels" :data="chartData.userGrowth" />
        </div>

        <!-- Chart: View Performance -->
        <div class="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <div class="mb-6 flex items-center justify-between">
            <div>
              <h4 class="text-xl font-bold text-gray-900">Room View Engagement</h4>
              <p class="text-sm text-gray-500">Traffic spikes per interval</p>
            </div>
            <div class="rounded-lg bg-gray-50 px-3 py-1 text-xs font-bold text-gray-400">LIVE</div>
          </div>
          <LiveBarChart :labels="chartData.labels" :data="chartData.viewPerformance" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRealtimeAnalytics } from '../../composables/useRealtimeAnalytics';
import LiveLineChart from '../../components/charts/LiveLineChart.vue';
import LiveBarChart from '../../components/charts/LiveBarChart.vue';

const { isConnected, stats, chartData, start, stop } = useRealtimeAnalytics();

const toggleConnection = () => {
  if (isConnected.value) {
    stop();
  } else {
    start();
  }
};

// Start simulation on component mount for better "live" UX
onMounted(() => {
  start();
});
</script>

<style scoped>
.tabular-nums {
  font-variant-numeric: tabular-nums;
}
</style>
