<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Welcome back, {{ auth.state.user?.name }}!</h1>
      <p class="text-gray-500">Here's what's happening with your rooms today.</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Rooms" :value="stats.totalRooms" :trend="12" />
      <StatCard title="Active Listings" :value="stats.activeListings" :trend="5" />
      <StatCard 
        v-if="isAdmin" 
        title="Total Users" 
        :value="stats.totalUsers" 
        :trend="8" 
        icon-bg="bg-blue-50 text-blue-600"
      />
      <StatCard title="Total Views" :value="stats.totalViews" :trend="24" icon-bg="bg-purple-50 text-purple-600" />
    </div>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <!-- Recent Rooms Table/List -->
      <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-bold text-gray-900">Recent Rooms</h2>
          <router-link to="/dashboard/rooms" class="text-sm font-semibold text-green-600 hover:text-green-700">View All</router-link>
        </div>
        
        <div v-if="loading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="h-16 animate-pulse rounded-xl bg-gray-50"></div>
        </div>
        
        <div v-else-if="recentRooms.length" class="space-y-4">
          <div v-for="room in recentRooms" :key="room.id" class="flex items-center justify-between rounded-xl border border-gray-50 p-4 hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-4">
              <img :src="room.image" class="h-12 w-12 rounded-lg object-cover" alt="" />
              <div>
                <p class="font-semibold text-gray-900 line-clamp-1">{{ room.title }}</p>
                <p class="text-xs text-gray-500">{{ room.location }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-green-600">${{ room.price }}</p>
              <p class="text-xs text-gray-400 capitalize">{{ room.status || 'active' }}</p>
            </div>
          </div>
        </div>

        <EmptyState 
          v-else 
          title="No rooms found" 
          message="Start by adding your first room listing."
          :show-reset="false"
        />
      </div>

      <!-- Quick Chart Placeholder -->
      <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 class="text-lg font-bold text-gray-900 mb-6">Weekly Activity</h2>
        <div class="flex h-64 items-end gap-2">
          <div 
            v-for="(val, i) in analytics.viewsPerDay" 
            :key="i"
            class="group relative flex-1"
          >
            <div 
              class="w-full rounded-t-lg bg-green-100 transition-all group-hover:bg-green-600"
              :style="{ height: `${(val / 300) * 100}%` }"
            ></div>
            <div class="mt-2 text-center text-xs text-gray-400">{{ analytics.days[i] }}</div>
            <!-- Tooltip -->
            <div class="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
              {{ val }} views
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAuthStore } from '../../store/auth'
import StatCard from '../../components/StatCard.vue'
import EmptyState from '../../components/EmptyState.vue'
import { getStats, getAnalytics } from '../../services/dashboardService'
import { getMyRooms, getRooms } from '../../services/roomService'

const auth = useAuthStore()
const isAdmin = computed(() => auth.state.user?.role === 'admin')

const loading = ref(true)
const stats = ref({})
const analytics = ref({ viewsPerDay: [], days: [] })
const recentRooms = ref([])

onMounted(async () => {
  try {
    const [statsData, analyticsData] = await Promise.all([
      getStats(),
      getAnalytics()
    ])
    stats.value = statsData
    analytics.value = analyticsData

    const rooms = isAdmin.value 
      ? await getRooms() 
      : await getMyRooms(auth.state.user.id)
    
    recentRooms.value = rooms.slice(0, 4)
  } catch (err) {
    console.error('Dashboard loading error:', err)
  } finally {
    loading.value = false
  }
})
</script>
