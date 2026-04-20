<template>
  <div class="space-y-4">
    <!-- Main Image -->
    <div class="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100 shadow-sm ring-1 ring-gray-100">
      <transition name="fade" mode="out-in">
        <img
          :key="activeIndex"
          :src="images[activeIndex] || placeholderImage"
          :alt="`${alt} - Image ${activeIndex + 1}`"
          loading="lazy"
          class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </transition>
    </div>

    <!-- Thumbnails -->
    <div v-if="images.length > 1" class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="activeIndex = index"
        class="relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 transition-all ring-2"
        :class="activeIndex === index ? 'ring-green-600 scale-95 shadow-inner' : 'ring-transparent opacity-70 hover:opacity-100'"
      >
        <img
          :src="image"
          :alt="`${alt} thumbnail ${index + 1}`"
          loading="lazy"
          class="h-full w-full object-cover"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  alt: {
    type: String,
    default: 'Room Image'
  }
})

const activeIndex = ref(0)
const placeholderImage = 'https://via.placeholder.com/800x450?text=Room+Image'

// Reset active index if images change
watch(() => props.images, () => {
  activeIndex.value = 0
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
