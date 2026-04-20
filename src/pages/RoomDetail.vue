<template>
  <div class="min-h-screen bg-gray-50 pb-16 pt-8">
    <div class="container-shell">
      <!-- Breadcrumbs -->
      <nav class="mb-8 flex" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <router-link to="/" class="hover:text-green-600">Home</router-link>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li>
            <router-link to="/rooms" class="hover:text-green-600">Rooms</router-link>
          </li>
          <li v-if="room">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li v-if="room" class="font-medium text-gray-900 truncate max-w-[200px]">
            {{ room.title }}
          </li>
        </ol>
      </nav>

      <!-- Loading State -->
      <LoadingSkeletonDetail v-if="loading" />

      <!-- Error State -->
      <ErrorState 
        v-else-if="error" 
        :title="errorTitle" 
        :message="errorMessage" 
        @retry="fetchRoomData" 
      />

      <!-- Content -->
      <div v-else-if="room" class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Left Column: Gallery and Info -->
        <div class="lg:col-span-2 space-y-8">
          <ImageGallery :images="roomImages" :alt="room.title" />
          
          <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <RoomInfo :room="room" />
          </div>

          <!-- Location Map Placeholder -->
          <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
            <h2 class="text-xl font-bold text-gray-900">Location</h2>
            <p class="mt-2 text-sm text-gray-500">{{ room.location }}</p>
            <div class="mt-4 aspect-[21/9] w-full overflow-hidden rounded-xl bg-gray-100">
              <div class="flex h-full w-full items-center justify-center text-gray-400">
                <div class="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l5-2.5 5.553 2.776a1 1 0 01.447.894v10.764a1 1 0 01-1.447.894L15 17l-6 3z" />
                  </svg>
                  <p class="text-xs font-medium uppercase tracking-wider">Map Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Sticky Sidebar -->
        <div class="space-y-6">
          <div class="lg:sticky lg:top-24 space-y-6">
            <RoomPriceCard 
              :room="room" 
              :is-favorited="isFavorited" 
              :favorite-loading="favoriteLoading"
              @toggle-favorite="handleToggleFavorite"
            />
            
            <ContactLandlordCard 
              :landlord="landlordInfo" 
              @contact="handleContact"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContactLandlordCard from '../components/ContactLandlordCard.vue'
import ErrorState from '../components/ErrorState.vue'
import ImageGallery from '../components/ImageGallery.vue'
import LoadingSkeletonDetail from '../components/LoadingSkeletonDetail.vue'
import RoomInfo from '../components/RoomInfo.vue'
import RoomPriceCard from '../components/RoomPriceCard.vue'
import { contactLandlord, getRoomById, toggleFavorite } from '../services/roomService'
import { useAuthStore } from '../store/auth'
import api from '../api/axios'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const room = ref(null)
const loading = ref(true)
const error = ref(null)
const favoriteLoading = ref(false)
const isFavorited = ref(false)

const errorTitle = ref('Something went wrong')
const errorMessage = ref('We encountered an error while loading the room details. Please try again later.')

const roomImages = computed(() => {
  if (!room.value) return []
  return room.value.images || [room.value.image].filter(Boolean)
})

const landlordInfo = computed(() => {
  if (!room.value) return {}
  return {
    name: room.value.landlord?.name || 'Landlord',
    avatar: room.value.landlord?.avatar,
    phone: room.value.landlord?.phone
  }
})

const fetchRoomData = async () => {
  const roomId = route.params.id
  loading.value = true
  error.value = null

  try {
    const data = await getRoomById(roomId)
    if (!data) {
      errorTitle.value = 'Room Not Found'
      errorMessage.value = "The room you're looking for doesn't exist or has been removed."
      error.value = 'not_found'
      return
    }
    room.value = data
    await checkFavoriteStatus()
  } catch (err) {
    error.value = err.message || 'Error fetching room'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const checkFavoriteStatus = async () => {
  if (!auth.isAuthenticated()) return

  try {
    const { data } = await api.get('/favorites')
    const favorites = data.data || []
    isFavorited.value = favorites.some(f => (f.room_id || f.id) === Number(route.params.id))
  } catch (err) {
    console.error('Error checking favorite status:', err)
  }
}

const handleToggleFavorite = async () => {
  if (!auth.isAuthenticated()) {
    router.push({ name: 'login', query: { redirect: route.fullPath } })
    return
  }

  favoriteLoading.value = true
  try {
    await toggleFavorite(room.value.id)
    isFavorited.value = !isFavorited.value
  } catch (err) {
    console.error('Error toggling favorite:', err)
  } finally {
    favoriteLoading.value = false
  }
}

const handleContact = async (contactData) => {
  try {
    await contactLandlord({
      roomId: room.value.id,
      ...contactData
    })
  } catch (err) {
    console.error('Error contacting landlord:', err)
    throw err
  }
}

onMounted(() => {
  fetchRoomData()
})
</script>
