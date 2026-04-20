<template>
  <label class="block">
    <span class="mb-2 block text-sm font-medium text-slate-700">{{ label }}</span>

    <div class="relative">
      <input
        :autocomplete="autocomplete"
        :class="[
          'block w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400',
          error
            ? 'border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
            : 'border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-100',
          hasToggle ? 'pr-14' : '',
        ]"
        :name="name"
        :placeholder="placeholder"
        :type="resolvedType"
        :value="modelValue"
        @input="handleInput"
      >

      <button
        v-if="hasToggle"
        class="absolute inset-y-0 right-3 my-auto inline-flex h-9 items-center rounded-xl px-3 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-200"
        type="button"
        @click="isVisible = !isVisible"
      >
        {{ isVisible ? 'Hide' : 'Show' }}
      </button>
    </div>

    <p v-if="error" class="mt-2 text-sm text-rose-600">
      {{ error }}
    </p>
  </label>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  autocomplete: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  toggleable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
const isVisible = ref(false)

const hasToggle = computed(() => props.toggleable && props.type === 'password')
const resolvedType = computed(() => {
  if (!hasToggle.value) {
    return props.type
  }

  return isVisible.value ? 'text' : 'password'
})

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
