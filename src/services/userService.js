import api from '../api/axios'

export const getUsers = async () => {
  const { data } = await api.get('/users')
  return data.data
}

export const deleteUser = async (id) => {
  const { data } = await api.delete(`/users/${id}`)
  return data
}
