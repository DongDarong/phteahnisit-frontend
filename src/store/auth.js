import { reactive, readonly } from 'vue'
import api from '../api/axios'

const state = reactive({
  token: localStorage.getItem('auth_token') || '',
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),
  loading: false,
})

const setSession = (token, user) => {
  state.token = token
  state.user = user

  localStorage.setItem('auth_token', token)
  localStorage.setItem('auth_user', JSON.stringify(user))
}

const clearSession = () => {
  state.token = ''
  state.user = null

  localStorage.removeItem('auth_token')
  localStorage.removeItem('auth_user')
}

const normalizeAuthPayload = (payload, fallbackData) => {
  const token = payload?.token || payload?.access_token || payload?.data?.token || ''
  const user = payload?.user || payload?.data?.user || fallbackData

  return { token, user }
}

const login = async (credentials) => {
  state.loading = true

  try {
    const { data } = await api.post('/login', credentials)
    const { token, user } = normalizeAuthPayload(data, { email: credentials.email })

    if (!token) {
      throw new Error('Authentication token was not returned by the API.')
    }

    setSession(token, user)
    return user
  } finally {
    state.loading = false
  }
}

const register = async (payload) => {
  state.loading = true

  try {
    const { data } = await api.post('/register', payload)
    const fallbackUser = {
      name: payload.name,
      email: payload.email,
      role: payload.role,
    }
    const { token, user } = normalizeAuthPayload(data, fallbackUser)

    if (token) {
      setSession(token, user)
    }

    return user
  } finally {
    state.loading = false
  }
}

const logout = () => {
  clearSession()
}

const getUser = () => state.user

const isAuthenticated = () => Boolean(state.token)

export const useAuthStore = () => ({
  state: readonly(state),
  isAuthenticated,
  getUser,
  login,
  register,
  logout,
})
