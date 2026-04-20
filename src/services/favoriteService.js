import api from '../api/axios'

export const addFavorite = async (userId, roomId) => {
  const { data } = await api.post('/favorites', { userId, roomId })
  return data.data
}

export const removeFavorite = async (userId, roomId) => {
  const { data } = await api.delete(`/favorites/${roomId}`, {
    params: { userId },
  })
  return data
}

export const getFavoritesByUser = async (userId) => {
  const { data } = await api.get('/favorites', {
    params: { userId },
  })
  return data.data
}
