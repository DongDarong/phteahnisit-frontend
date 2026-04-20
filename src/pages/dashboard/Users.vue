<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
      <p class="text-gray-500">View and manage platform users.</p>
    </div>

    <div v-if="loading" class="space-y-4">
      <div v-for="i in 5" :key="i" class="h-16 animate-pulse rounded-2xl bg-white shadow-sm ring-1 ring-gray-100"></div>
    </div>

    <div v-else-if="users.length">
      <UserTable :users="users" @delete="openDeleteModal" />
    </div>

    <EmptyState 
      v-else 
      title="No users found" 
      message="There are no users registered on the platform."
      @reset="fetchUsers"
    />

    <ConfirmModal 
      :show="showDeleteModal"
      title="Delete User"
      message="Are you sure you want to delete this user? This will permanently remove their account."
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import UserTable from '../../components/UserTable.vue'
import EmptyState from '../../components/EmptyState.vue'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { getUsers, deleteUser } from '../../services/userService'

const users = ref([])
const loading = ref(true)
const showDeleteModal = ref(false)
const userToDelete = ref(null)

const fetchUsers = async () => {
  loading.value = true
  try {
    users.value = await getUsers()
  } catch (err) {
    console.error('Error fetching users:', err)
  } finally {
    loading.value = false
  }
}

const openDeleteModal = (id) => {
  userToDelete.value = id
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!userToDelete.value) return
  
  try {
    await deleteUser(userToDelete.value)
    users.value = users.value.filter(u => u.id !== userToDelete.value)
    showDeleteModal.value = false
    userToDelete.value = null
  } catch (err) {
    console.error('Error deleting user:', err)
  }
}

onMounted(fetchUsers)
</script>
