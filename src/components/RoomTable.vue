<template>
  <div class="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
    <table class="w-full text-left text-sm">
      <thead class="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
        <tr>
          <th class="px-6 py-4">Room</th>
          <th class="px-6 py-4">Price</th>
          <th class="px-6 py-4">Location</th>
          <th class="px-6 py-4">Status</th>
          <th class="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="room in rooms" :key="room.id" class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <img 
                :src="room.image || 'https://via.placeholder.com/40'" 
                class="h-10 w-10 rounded-lg object-cover"
                alt=""
              />
              <span class="font-semibold text-gray-900 line-clamp-1">{{ room.title }}</span>
            </div>
          </td>
          <td class="px-6 py-4 font-medium text-green-600">${{ room.price }}/mo</td>
          <td class="px-6 py-4 text-gray-500 line-clamp-1">{{ room.location }}</td>
          <td class="px-6 py-4">
            <span 
              class="rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider"
              :class="room.status === 'inactive' ? 'bg-gray-100 text-gray-600' : 'bg-green-50 text-green-700'"
            >
              {{ room.status || 'Active' }}
            </span>
          </td>
          <td class="px-6 py-4 text-right">
            <div class="flex justify-end gap-2">
              <router-link 
                :to="`/dashboard/edit-room/${room.id}`"
                class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </router-link>
              <button 
                @click="$emit('delete', room.id)"
                class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600 transition-colors"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  rooms: {
    type: Array,
    required: true
  }
})

defineEmits(['delete'])
</script>
