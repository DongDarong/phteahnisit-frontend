import { db, getNextId, persistCollection } from './db'

const clone = (value) => JSON.parse(JSON.stringify(value))

export const sanitizeUser = (user) => {
  if (!user) {
    return null
  }

  const { password, ...safeUser } = user
  return clone(safeUser)
}

export const getUsers = () => clone(db.users)

export const getUserById = (id) => db.users.find((user) => user.id === Number(id)) || null

export const getUserByEmail = (email) => {
  const normalizedEmail = String(email || '').trim().toLowerCase()
  return db.users.find((user) => user.email.toLowerCase() === normalizedEmail) || null
}

export const createUser = (payload) => {
  const user = {
    id: getNextId('users'),
    name: String(payload.name || '').trim(),
    email: String(payload.email || '').trim().toLowerCase(),
    password: String(payload.password || ''),
    role: payload.role || 'student',
    phone: String(payload.phone || '').trim(),
  }

  db.users.push(user)
  persistCollection('users')

  return sanitizeUser(user)
}

export const deleteUser = (id) => {
  const index = db.users.findIndex((user) => user.id === Number(id))
  if (index === -1) return false
  
  db.users.splice(index, 1)
  persistCollection('users')
  return true
}

export const validateUserCredentials = (email, password) => {
  const user = getUserByEmail(email)

  if (!user || user.password !== password) {
    return null
  }

  return sanitizeUser(user)
}
