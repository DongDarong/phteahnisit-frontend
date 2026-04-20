<template>
  <div class="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
    <table class="w-full text-left text-sm">
      <thead class="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
        <tr>
          <th class="px-6 py-4">User</th>
          <th class="px-6 py-4">Email</th>
          <th class="px-6 py-4">Role</th>
          <th class="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 font-bold">
                {{ user.name?.charAt(0) }}
              </div>
              <span class="font-semibold text-gray-900">{{ user.name }}</span>
            </div>
          </td>
          <td class="px-6 py-4 text-gray-500">{{ user.email }}</td>
          <td class="px-6 py-4">
            <span 
              class="rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wider"
              :class="user.role === 'admin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'"
            >
              {{ user.role }}
            </span>
          </td>
          <td class="px-6 py-4 text-right">
            <button 
              @click="$emit('delete', user.id)"
              class="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600 transition-colors"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true
  }
})

defineEmits(['delete'])
</script>
