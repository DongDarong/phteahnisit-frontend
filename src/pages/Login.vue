<template>
  <section class="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
      <div class="grid w-full items-center gap-10 lg:grid-cols-[1fr_440px]">
        <div class="hidden lg:block">
          <span class="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-800">
            Room Rental Finder for Students
          </span>
          <h2 class="mt-6 max-w-xl text-5xl font-semibold tracking-tight text-slate-900">
            Sign in to manage favorites and discover student housing faster.
          </h2>
          <p class="mt-5 max-w-lg text-base leading-8 text-slate-600">
            Compare listings, save the best rooms, and connect with landlords from a single student-focused dashboard.
          </p>
        </div>

        <AuthCard
          description="Enter your email and password to continue to your account."
          eyebrow="Welcome Back"
          title="Login"
        >
          <form class="space-y-5" @submit.prevent="handleSubmit">
            <AuthInput
              v-model="form.email"
              autocomplete="email"
              :error="errors.email"
              label="Email"
              name="email"
              placeholder="student@example.com"
              type="email"
            />

            <AuthInput
              v-model="form.password"
              autocomplete="current-password"
              :error="errors.password"
              label="Password"
              name="password"
              placeholder="Enter your password"
              toggleable
              type="password"
            />

            <div
              v-if="submitError"
              class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              {{ submitError }}
            </div>

            <LoadingButton
              full-width
              :loading="auth.state.loading"
              loading-text="Signing in..."
              text="Login"
              type="submit"
            />
          </form>

          <p class="mt-6 text-center text-sm text-slate-500">
            New here?
            <RouterLink class="font-semibold text-green-700 transition hover:text-green-800" to="/register">
              Create an account
            </RouterLink>
          </p>
        </AuthCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AuthCard from '../components/AuthCard.vue'
import AuthInput from '../components/AuthInput.vue'
import LoadingButton from '../components/LoadingButton.vue'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const submitError = ref('')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const clearFieldError = (field) => {
  errors[field] = ''
  submitError.value = ''
}

watch(() => form.email, () => clearFieldError('email'))
watch(() => form.password, () => clearFieldError('password'))

const validate = () => {
  errors.email = ''
  errors.password = ''

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailPattern.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.password) {
    errors.password = 'Password is required.'
  }

  return !errors.email && !errors.password
}

const handleSubmit = async () => {
  submitError.value = ''

  if (!validate()) {
    return
  }

  try {
    await auth.login({
      email: form.email.trim(),
      password: form.password,
    })
    router.push(route.query.redirect || '/')
  } catch (error) {
    submitError.value =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Unable to login. Please try again.'
  }
}
</script>
