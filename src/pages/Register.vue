<template>
  <section class="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
      <div class="grid w-full items-center gap-10 lg:grid-cols-[1fr_460px]">
        <div class="hidden lg:block">
          <span class="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-800">
            Student Housing Platform
          </span>
          <h2 class="mt-6 max-w-xl text-5xl font-semibold tracking-tight text-slate-900">
            Create your account and start renting smarter.
          </h2>
          <p class="mt-5 max-w-lg text-base leading-8 text-slate-600">
            Students can save rooms instantly. Landlords can publish listings and connect with the right renters.
          </p>
        </div>

        <AuthCard
          description="Fill in your details to create an account."
          eyebrow="Get Started"
          title="Register"
        >
          <form class="space-y-5" @submit.prevent="handleSubmit">
            <AuthInput
              v-model="form.name"
              autocomplete="name"
              :error="errors.name"
              label="Name"
              name="name"
              placeholder="Sokha Dara"
              type="text"
            />

            <AuthInput
              v-model="form.email"
              autocomplete="email"
              :error="errors.email"
              label="Email"
              name="email"
              placeholder="name@example.com"
              type="email"
            />

            <AuthInput
              v-model="form.phone"
              autocomplete="tel"
              :error="errors.phone"
              label="Phone"
              name="phone"
              placeholder="+855 12 345 678"
              type="tel"
            />

            <label class="block">
              <span class="mb-2 block text-sm font-medium text-slate-700">Role</span>
              <select
                v-model="form.role"
                :class="[
                  'block w-full rounded-2xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition',
                  errors.role
                    ? 'border-rose-300 focus:border-rose-400 focus:ring-4 focus:ring-rose-100'
                    : 'border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-100',
                ]"
              >
                <option value="">Select a role</option>
                <option value="student">Student</option>
                <option value="landlord">Landlord</option>
              </select>
              <p v-if="errors.role" class="mt-2 text-sm text-rose-600">
                {{ errors.role }}
              </p>
            </label>

            <AuthInput
              v-model="form.password"
              autocomplete="new-password"
              :error="errors.password"
              label="Password"
              name="password"
              placeholder="Minimum 6 characters"
              type="password"
            />

            <AuthInput
              v-model="form.password_confirmation"
              autocomplete="new-password"
              :error="errors.password_confirmation"
              label="Confirm Password"
              name="password_confirmation"
              placeholder="Re-enter your password"
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
              loading-text="Creating account..."
              text="Register"
              type="submit"
            />
          </form>

          <p class="mt-6 text-center text-sm text-slate-500">
            Already have an account?
            <RouterLink class="font-semibold text-green-700 transition hover:text-green-800" to="/login">
              Login
            </RouterLink>
          </p>
        </AuthCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import AuthCard from '../components/AuthCard.vue'
import AuthInput from '../components/AuthInput.vue'
import LoadingButton from '../components/LoadingButton.vue'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  role: '',
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  role: '',
})

const submitError = ref('')
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const clearFieldError = (field) => {
  errors[field] = ''
  submitError.value = ''
}

watch(() => form.name, () => clearFieldError('name'))
watch(() => form.email, () => clearFieldError('email'))
watch(() => form.phone, () => clearFieldError('phone'))
watch(() => form.password, () => clearFieldError('password'))
watch(() => form.password_confirmation, () => clearFieldError('password_confirmation'))
watch(() => form.role, () => clearFieldError('role'))

const validate = () => {
  errors.name = ''
  errors.email = ''
  errors.phone = ''
  errors.password = ''
  errors.password_confirmation = ''
  errors.role = ''

  if (!form.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!emailPattern.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.phone.trim()) {
    errors.phone = 'Phone is required.'
  }

  if (!form.role) {
    errors.role = 'Role is required.'
  }

  if (!form.password) {
    errors.password = 'Password is required.'
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  if (!form.password_confirmation) {
    errors.password_confirmation = 'Confirm password is required.'
  } else if (form.password_confirmation !== form.password) {
    errors.password_confirmation = 'Passwords do not match.'
  }

  return !errors.name &&
    !errors.email &&
    !errors.phone &&
    !errors.password &&
    !errors.password_confirmation &&
    !errors.role
}

const handleSubmit = async () => {
  submitError.value = ''

  if (!validate()) {
    return
  }

  try {
    await auth.register({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
      password_confirmation: form.password_confirmation,
      role: form.role,
    })
    router.push('/')
  } catch (error) {
    submitError.value =
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Unable to register. Please try again.'
  }
}
</script>
