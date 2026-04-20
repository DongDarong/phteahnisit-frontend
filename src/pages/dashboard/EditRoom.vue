<template>
  <div class="space-y-8 max-w-4xl">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Edit Room</h1>
      <p class="text-gray-500">Update your room information and status.</p>
    </div>

    <div v-if="loading" class="h-64 animate-pulse rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"></div>

    <div v-else-if="room" class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <RoomForm 
        :initial-data="room" 
        :loading="saving" 
        @submit="handleUpdate" 
        @cancel="router.back()"
      />
    </div>

    <div v-else class="text-center py-12">
      <p class="text-gray-500">Room not found.</p>
      <button @click="router.back()" class="mt-4 text-green-600 font-semibold">Go Back</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RoomForm from '../../components/RoomForm.vue'
import { getRoomById, updateRoom } from '../../services/roomService'

const route = useRoute()
const router = useRouter()
const room = ref(null)
const loading = ref(true)
const saving = ref(false)

onMounted(async () => {
  try {
    const data = await getRoomById(route.params.id)
    room.value = data
  } catch (err) {
    console.error('Error fetching room:', err)
  } finally {
    loading.value = false
  }
})

const handleUpdate = async (formData) => {
  saving.value = true
  try {
    await updateRoom(route.params.id, formData)
    router.push('/dashboard/rooms')
  } catch (err) {
    console.error('Error updating room:', err)
  } finally {
    saving.value = false
  }
}
</script>
