<template>
  <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
    <h3 class="text-lg font-bold text-gray-900">Contact Landlord</h3>
    
    <div class="mt-4 flex items-center gap-4">
      <div class="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
        <img
          v-if="landlord.avatar"
          :src="landlord.avatar"
          :alt="landlord.name"
          class="h-full w-full object-cover"
        />
        <div v-else class="flex h-full w-full items-center justify-center bg-green-100 text-green-700 font-bold">
          {{ landlord.name?.charAt(0) || 'L' }}
        </div>
      </div>
      <div>
        <p class="font-semibold text-gray-900">{{ landlord.name || 'Owner' }}</p>
        <p class="text-xs text-gray-500">Response time: within 1 hour</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
      <div>
        <label for="message" class="sr-only">Message</label>
        <textarea
          id="message"
          v-model="message"
          rows="4"
          required
          class="w-full rounded-xl border-gray-200 text-sm shadow-sm focus:border-green-500 focus:ring-green-500"
          placeholder="Hi, I'm interested in this room. Is it still available?"
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="sending"
        class="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white transition-all hover:bg-black disabled:opacity-50"
      >
        <svg v-if="sending" class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ sending ? 'Sending...' : 'Send Message' }}
      </button>

      <div v-if="success" class="rounded-lg bg-green-50 p-3 text-center text-xs font-medium text-green-700">
        Message sent successfully!
      </div>
    </form>
    
    <div class="mt-6 border-t border-gray-100 pt-6">
      <a
        v-if="landlord.phone"
        :href="`tel:${landlord.phone}`"
        class="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Landlord
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  landlord: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['contact'])

const message = ref('')
const sending = ref(false)
const success = ref(false)

const handleSubmit = async () => {
  sending.value = true
  success.value = false
  
  try {
    await emit('contact', { message: message.value })
    success.value = true
    message.value = ''
    setTimeout(() => {
      success.value = false
    }, 5000)
  } catch (error) {
    console.error('Contact error:', error)
  } finally {
    sending.value = false
  }
}
</script>
