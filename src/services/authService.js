import api from '../api/axios'

export const login = async (email, password) => {
  const { data } = await api.post('/login', { email, password })
  return data
}

export const register = async (payload) => {
  const { data } = await api.post('/register', payload)
  return data
}

export const logout = async () => {
  const { data } = await api.post('/logout')
  return data
}

export const getUser = async () => {
  const { data } = await api.get('/me')
  return data.data
}
