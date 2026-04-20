import { db, getNextId, persistCollection } from './db'

const clone = (value) => JSON.parse(JSON.stringify(value))
const normalizeText = (value) => String(value || '').trim().toLowerCase()

export const getRooms = () => clone(db.rooms)

export const getRoomById = (id) => {
  const room = db.rooms.find((item) => item.id === Number(id))
  return room ? clone(room) : null
}

export const createRoom = (payload) => {
  const room = {
    id: getNextId('rooms'),
    title: String(payload.title || '').trim(),
    description: String(payload.description || '').trim(),
    price: Number(payload.price || 0),
    location: String(payload.location || '').trim(),
    university: String(payload.university || payload.nearby_university || '').trim(),
    image: String(payload.image || payload.images?.[0] || payload.image_urls?.[0] || '').trim(),
    landlordId: Number(payload.landlordId),
  }

  db.rooms.unshift(room)
  persistCollection('rooms')

  return clone(room)
}

export const updateRoomById = (id, payload) => {
  const index = db.rooms.findIndex((room) => room.id === Number(id))

  if (index === -1) {
    return null
  }

  db.rooms[index] = {
    ...db.rooms[index],
    ...payload,
    id: db.rooms[index].id,
    landlordId: db.rooms[index].landlordId,
  }

  persistCollection('rooms')
  return clone(db.rooms[index])
}

const resolvePriceBounds = (params = {}) => {
  const min = Number(params.min_price || params.minPrice)
  const max = Number(params.max_price || params.maxPrice)

  return [
    Number.isNaN(min) ? 0 : min,
    Number.isNaN(max) || max === 0 ? Number.POSITIVE_INFINITY : max
  ]
}

export const deleteRoom = (id) => {
  const index = db.rooms.findIndex((room) => room.id === Number(id))
  if (index === -1) return false
  
  db.rooms.splice(index, 1)
  persistCollection('rooms')
  return true
}

export const getRoomsByLandlord = (landlordId) => {
  return clone(db.rooms.filter(room => room.landlordId === Number(landlordId)))
}

export const filterRooms = (params = {}) => {
  const title = normalizeText(params.title || params.search)
  const location = normalizeText(params.location)
  const university = normalizeText(params.university)
  const [minPrice, maxPrice] = resolvePriceBounds(params)

  return clone(
    db.rooms.filter((room) => {
      const roomTitle = normalizeText(room.title)
      const roomLocation = normalizeText(room.location)
      const roomUniversity = normalizeText(room.university)
      const roomPrice = Number(room.price || 0)

      return (
        (!title || roomTitle.includes(title)) &&
        (!location || roomLocation.includes(location)) &&
        (!university || roomUniversity.includes(university)) &&
        roomPrice >= minPrice &&
        roomPrice <= maxPrice
      )
    }),
  )
}
