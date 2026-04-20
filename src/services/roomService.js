import api from '../api/axios'

export const getRooms = async () => {
  const { data } = await api.get('/rooms')
  return data.data
}

export const getMyRooms = async (landlordId) => {
  const { data } = await api.get('/rooms', { params: { landlord_id: landlordId } })
  return data.data
}

export const getFilteredRooms = async (filters = {}) => {
  const params = {
    title: filters.search || filters.title,
    location: filters.location,
    university: filters.university,
    min_price: filters.minPrice,
    max_price: filters.maxPrice
  }
  
  const { data } = await api.get('/rooms', { params })
  return data.data
}

export const getRoomById = async (id) => {
  const { data } = await api.get(`/rooms/${id}`)
  return data.data
}

export const createRoom = async (payload) => {
  const { data } = await api.post('/rooms', payload)
  return data.data
}

export const updateRoom = async (id, payload) => {
  const { data } = await api.put(`/rooms/${id}`, payload)
  return data.data
}

export const deleteRoom = async (id) => {
  const { data } = await api.delete(`/rooms/${id}`)
  return data
}

export const contactLandlord = async (contactData) => {
  const { data } = await api.post('/contact', contactData)
  return data
}

export const toggleFavorite = async (roomId) => {
  const { data } = await api.post('/favorites', { room_id: roomId })
  return data
}
