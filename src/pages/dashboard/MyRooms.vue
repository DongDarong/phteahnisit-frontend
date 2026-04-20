<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">My Rooms</h1>
        <p class="text-gray-500">Manage and track your property listings.</p>
      </div>
      <router-link to="/dashboard/add-room" class="btn-primary">
        Add New Room
      </router-link>
    </div>

    <div v-if="loading" class="space-y-4">
      <div v-for="i in 5" :key="i" class="h-16 animate-pulse rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"></div>
    </div>

    <div v-else-if="rooms.length">
      <RoomTable :rooms="rooms" @delete="openDeleteModal" />
    </div>

    <EmptyState 
      v-else 
      title="No rooms found" 
      message="You haven't added any rooms yet. Start by creating a new listing."
      @reset="fetchRooms"
    />

    <ConfirmModal 
      :show="showDeleteModal"
      title="Delete Room"
      message="Are you sure you want to delete this room? This action will permanently remove the listing."
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import RoomTable from '../../components/RoomTable.vue'
import EmptyState from '../../components/EmptyState.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { getMyRooms, getRooms, deleteRoom } from '../../services/roomService'
import { useAuthStore } from '../../store/auth'

const auth = useAuthStore()
const rooms = ref([])
const loading = ref(true)
const showDeleteModal = ref(false)
const roomToDelete = ref(null)

const fetchRooms = async () => {
  loading.value = true
  try {
    const isAdmin = auth.state.user?.role === 'admin'
    rooms.value = isAdmin 
      ? await getRooms() 
      : await getMyRooms(auth.state.user.id)
  } catch (err) {
    console.error('Error fetching rooms:', err)
  } finally {
    loading.value = false
  }
}

const openDeleteModal = (id) => {
  roomToDelete.value = id
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!roomToDelete.value) return
  
  try {
    await deleteRoom(roomToDelete.value)
    rooms.value = rooms.value.filter(r => r.id !== roomToDelete.value)
    showDeleteModal.value = false
    roomToDelete.value = null
  } catch (err) {
    console.error('Error deleting room:', err)
  }
}

onMounted(fetchRooms)
</script>
