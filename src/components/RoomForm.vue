<template>
  <form @submit.prevent="handleSubmit" class="space-y-8">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <!-- Title -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700">Room Title</label>
        <input 
          v-model="form.title" 
          type="text" 
          required 
          class="w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
          placeholder="e.g. Modern Studio near RUPP"
        />
      </div>

      <!-- Price -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700">Price per Month ($)</label>
        <input 
          v-model.number="form.price" 
          type="number" 
          required 
          class="w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
          placeholder="e.g. 150"
        />
      </div>

      <!-- Location -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700">Location</label>
        <input 
          v-model="form.location" 
          type="text" 
          required 
          class="w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
          placeholder="e.g. Tuol Kork, Phnom Penh"
        />
      </div>

      <!-- University -->
      <div class="space-y-2">
        <label class="text-sm font-semibold text-gray-700">Nearby University</label>
        <select 
          v-model="form.university" 
          class="w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select University</option>
          <option v-for="uni in universities" :key="uni" :value="uni">{{ uni }}</option>
        </select>
      </div>

      <!-- Description -->
      <div class="space-y-2 md:col-span-2">
        <label class="text-sm font-semibold text-gray-700">Description</label>
        <textarea 
          v-model="form.description" 
          rows="4" 
          required 
          class="w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
          placeholder="Describe the room, facilities, and rules..."
        ></textarea>
      </div>

      <!-- Image URL -->
      <div class="space-y-2 md:col-span-2">
        <label class="text-sm font-semibold text-gray-700">Main Image URL</label>
        <input 
          v-model="form.image" 
          type="url" 
          class="w-full rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <!-- Facilities (Simplified for demo) -->
      <div class="space-y-4 md:col-span-2">
        <label class="text-sm font-semibold text-gray-700">Facilities</label>
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          <label v-for="f in availableFacilities" :key="f" class="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              :value="f" 
              v-model="form.facilities"
              class="rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span class="text-sm text-gray-600">{{ f }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-4 border-t pt-8">
      <button 
        type="button" 
        @click="$emit('cancel')"
        class="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>
      <button 
        type="submit" 
        :disabled="loading"
        class="flex items-center gap-2 rounded-xl bg-green-600 px-8 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
      >
        <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading ? 'Saving...' : (initialData.id ? 'Update Room' : 'Create Room') }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, onMounted, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  loading: Boolean
})

const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  title: '',
  price: '',
  location: '',
  university: '',
  description: '',
  image: '',
  facilities: []
})

const universities = ['RUPP', 'ITC', 'NUM', 'UC', 'RULE', 'Norton']
const availableFacilities = ['Wifi', 'Bed', 'Desk', 'Chair', 'AC', 'Private Bathroom', 'Parking', 'Security']

const populateForm = (data) => {
  if (data && data.id) {
    Object.assign(form, {
      ...data,
      facilities: data.facilities || []
    })
  }
}

onMounted(() => {
  populateForm(props.initialData)
})

watch(() => props.initialData, (newData) => {
  populateForm(newData)
}, { deep: true })

const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>
