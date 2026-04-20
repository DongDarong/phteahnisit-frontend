import { db, persistCollection } from './db'
import { getRoomById } from './rooms'

const clone = (value) => JSON.parse(JSON.stringify(value))

export const getFavorites = () => clone(db.favorites)

export const getFavoritesByUser = (userId) => {
  const numericUserId = Number(userId)

  return clone(
    db.favorites
      .filter((favorite) => favorite.userId === numericUserId)
      .map((favorite) => ({
        ...favorite,
        room: getRoomById(favorite.roomId),
      })),
  )
}

export const addFavorite = (userId, roomId) => {
  const numericUserId = Number(userId)
  const numericRoomId = Number(roomId)
  const existing = db.favorites.find(
    (favorite) => favorite.userId === numericUserId && favorite.roomId === numericRoomId,
  )

  if (existing) {
    return clone(existing)
  }

  const favorite = { userId: numericUserId, roomId: numericRoomId }
  db.favorites.push(favorite)
  persistCollection('favorites')

  return clone(favorite)
}

export const removeFavorite = (userId, roomId) => {
  const numericUserId = Number(userId)
  const numericRoomId = Number(roomId)
  const index = db.favorites.findIndex(
    (favorite) => favorite.userId === numericUserId && favorite.roomId === numericRoomId,
  )

  if (index === -1) {
    return false
  }

  db.favorites.splice(index, 1)
  persistCollection('favorites')

  return true
}
