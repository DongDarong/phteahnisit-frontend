<template>
  <div class="space-y-8 max-w-4xl">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Add New Room</h1>
      <p class="text-gray-500">Create a new listing for students to find.</p>
    </div>

    <div class="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <RoomForm 
        :loading="saving" 
        @submit="handleCreate" 
        @cancel="router.back()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RoomForm from '../../components/RoomForm.vue'
import { createRoom } from '../../services/roomService'

const router = useRouter()
const saving = ref(false)

const handleCreate = async (formData) => {
  saving.value = true
  try {
    await createRoom(formData)
    router.push('/dashboard/rooms')
  } catch (err) {
    console.error('Error creating room:', err)
  } finally {
    saving.value = false
  }
}
</script>
