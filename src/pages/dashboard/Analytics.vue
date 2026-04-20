<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p class="text-gray-500">Overview of platform performance and user engagement.</p>
      </div>
      <div class="flex items-center gap-3">
        <select class="rounded-xl border-gray-200 text-sm focus:border-green-500 focus:ring-green-500 bg-white">
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>Last Year</option>
        </select>
        <button class="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
        </button>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="rounded-2xl bg-red-50 p-6 text-center shadow-sm">
      <p class="text-red-700 font-medium">{{ error }}</p>
      <button @click="fetchAllData" class="mt-4 text-sm font-bold text-red-800 hover:underline">Try Again</button>
    </div>

    <!-- Stat Cards -->
    <div v-if="loading" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="i in 4" :key="i" class="h-32 animate-pulse rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"></div>
    </div>
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Users" :value="stats.totalUsers?.value" :trend="stats.totalUsers?.trend" icon="users" color="green" />
      <StatCard title="Total Rooms" :value="stats.totalRooms?.value" :trend="stats.totalRooms?.trend" icon="home" color="blue" />
      <StatCard title="Total Views" :value="stats.totalViews?.value" :trend="stats.totalViews?.trend" icon="eye" color="purple" />
      <StatCard title="Total Favorites" :value="stats.totalFavorites?.value" :trend="stats.totalFavorites?.trend" icon="heart" color="orange" />
    </div>

    <!-- Main Charts Section -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <!-- Growth Trend (Line Chart) -->
      <div class="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h3 class="text-lg font-bold text-gray-900 mb-6">User & Room Growth</h3>
        <div v-if="loading" class="h-[300px] flex items-center justify-center bg-gray-50 rounded-xl">
          <div class="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
        </div>
        <LineChart v-else-if="growthData.labels" :chart-data="growthData" />
      </div>

      <!-- User Distribution (Doughnut) -->
      <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h3 class="text-lg font-bold text-gray-900 mb-6">User Distribution</h3>
        <div v-if="loading" class="h-[300px] flex items-center justify-center bg-gray-50 rounded-xl">
          <div class="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
        </div>
        <DoughnutChart v-else-if="userDistribution.labels" :chart-data="userDistribution" />
      </div>

      <!-- Room Performance (Bar Chart) -->
      <div class="lg:col-span-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h3 class="text-lg font-bold text-gray-900 mb-6">Top Viewed Rooms</h3>
        <div v-if="loading" class="h-[300px] flex items-center justify-center bg-gray-50 rounded-xl">
          <div class="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
        </div>
        <BarChart v-else-if="roomPerformance.labels" :chart-data="roomPerformance" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import StatCard from '../../components/StatCard.vue'
import LineChart from '../../components/charts/LineChart.vue'
import BarChart from '../../components/charts/BarChart.vue'
import DoughnutChart from '../../components/charts/DoughnutChart.vue'
import { getStats, getGrowthData, getRoomPerformance, getUserDistribution } from '../../services/analyticsService'

const loading = ref(true)
const error = ref(null)

const stats = ref({})
const growthData = ref({})
const roomPerformance = ref({})
const userDistribution = ref({})

const fetchAllData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const [statsRes, growthRes, perfRes, distRes] = await Promise.all([
      getStats(),
      getGrowthData(),
      getRoomPerformance(),
      getUserDistribution()
    ])
    
    stats.value = statsRes
    growthData.value = growthRes
    roomPerformance.value = perfRes
    userDistribution.value = distRes
  } catch (err) {
    error.value = err.message || 'An error occurred while fetching analytics data.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchAllData()
})
</script>
