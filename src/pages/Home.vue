<template>
  <div class="min-h-screen bg-slate-100">
    <HeroSection />

    <div class="px-4 sm:px-6 lg:px-8">
      <SearchBar
        v-model:location="filters.location"
        v-model:price-range="filters.priceRange"
        v-model:university="filters.university"
        @search="handleSearch"
      />
    </div>

    <FeaturedRooms
      :error="error"
      :loading="loading"
      :rooms="featuredRooms"
      @retry="fetchFeaturedRooms"
    />

    <HowItWorks />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'
import FeaturedRooms from '../components/FeaturedRooms.vue'
import HeroSection from '../components/HeroSection.vue'
import HowItWorks from '../components/HowItWorks.vue'
import SearchBar from '../components/SearchBar.vue'

const router = useRouter()

const filters = reactive({
  location: '',
  priceRange: '',
  university: '',
})

const featuredRooms = ref([])
const loading = ref(false)
const error = ref('')

const normalizeRooms = (payload) => payload?.data || payload?.rooms || payload || []

const fetchFeaturedRooms = async () => {
  loading.value = true
  error.value = ''

  try {
    const { data } = await api.get('/rooms')
    featuredRooms.value = normalizeRooms(data).slice(0, 6)
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Something went wrong while loading rooms.'
    featuredRooms.value = []
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  router.push({
    path: '/rooms',
    query: {
      location: filters.location || undefined,
      priceRange: filters.priceRange || undefined,
      university: filters.university || undefined,
    },
  })
}

onMounted(fetchFeaturedRooms)
</script>
