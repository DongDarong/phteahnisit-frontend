import { addFavorite, getFavoritesByUser, removeFavorite } from './mock/favorites'
import { createRoom, deleteRoom, filterRooms, getRoomById, getRooms, getRoomsByLandlord, updateRoomById } from './mock/rooms'
import { createUser, getUserByEmail, getUserById, getUsers, sanitizeUser, validateUserCredentials } from './mock/users'

const AUTH_TOKEN_KEY = 'auth_token'
const AUTH_USER_KEY = 'auth_user'

const createResponse = (data, status = 200) => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: {},
})

const createError = (message, status = 400, data = {}) => {
  const error = new Error(message)
  error.response = {
    data: { message, ...data },
    status,
    statusText: 'Error',
  }
  return error
}

const parseQueryString = (url) => {
  const [path, queryString] = String(url).split('?')
  const query = Object.fromEntries(new URLSearchParams(queryString || ''))
  return { path, query }
}

const getRequestParams = (url, config = {}) => {
  const parsed = parseQueryString(url)
  return {
    path: parsed.path,
    params: {
      ...parsed.query,
      ...(config.params || {}),
    },
  }
}

const getStoredUser = () => {
  const rawUser = localStorage.getItem(AUTH_USER_KEY)

  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser)
  } catch {
    return null
  }
}

const setAuthSession = (token, user) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
}

const requireAuth = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY)
  const user = getStoredUser()

  if (!token || !user) {
    throw createError('Unauthenticated.', 401)
  }

  return user
}

const randomDelay = () => Math.floor(Math.random() * 700) + 500
const shouldFailRandomly = () => Math.random() < 0.02

const withNetworkSimulation = (handler) =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      try {
        if (shouldFailRandomly()) {
          reject(createError('Network error. Please try again.', 500))
          return
        }

        resolve(handler())
      } catch (error) {
        reject(error)
      }
    }, randomDelay())
  })

const login = (payload) => {
  const email = String(payload?.email || '').trim()
  const password = String(payload?.password || '')

  if (!email || !password) {
    throw createError('Email and password are required.', 422)
  }

  const user = validateUserCredentials(email, password)

  if (!user) {
    throw createError('Invalid email or password.', 401)
  }

  const token = `fake-jwt-token-${user.id}-${Date.now()}`
  setAuthSession(token, user)

  return createResponse({ user, token }, 200)
}

const register = (payload) => {
  const name = String(payload?.name || '').trim()
  const email = String(payload?.email || '').trim().toLowerCase()
  const password = String(payload?.password || '')
  const role = String(payload?.role || '').trim()

  if (!name || !email || !password || !role) {
    throw createError('Name, email, password, and role are required.', 422)
  }

  if (password.length < 6) {
    throw createError('Password must be at least 6 characters.', 422)
  }

  if (getUserByEmail(email)) {
    throw createError('Email is already registered.', 409)
  }

  const user = createUser(payload)
  const token = `fake-jwt-token-${user.id}-${Date.now()}`
  setAuthSession(token, user)

  return createResponse({ user, token }, 201)
}

const listRooms = (params) => {
  const landlordId = params.landlordId || params.landlord_id
  if (landlordId) {
    return createResponse({ data: getRoomsByLandlord(landlordId) }, 200)
  }
  const hasFilters = Object.values(params).some((value) => value !== undefined && value !== '')
  const rooms = hasFilters ? filterRooms(params) : getRooms()
  return createResponse({ data: rooms }, 200)
}

const readRoom = (id) => {
  const room = getRoomById(id)

  if (!room) {
    throw createError('Room not found.', 404)
  }

  return createResponse({ data: room }, 200)
}

const addRoom = (payload) => {
  const currentUser = requireAuth()

  if (currentUser.role !== 'landlord' && currentUser.role !== 'admin') {
    throw createError('Only landlords or admins can create rooms.', 403)
  }

  const requiredFields = ['title', 'description', 'price', 'location']
  const missingField = requiredFields.find((field) => !payload?.[field])

  if (missingField) {
    throw createError(`${missingField} is required.`, 422)
  }

  const room = createRoom({
    ...payload,
    landlordId: currentUser.id,
  })

  return createResponse({ data: room }, 201)
}

const updateRoom = (id, payload) => {
  const currentUser = requireAuth()
  const room = getRoomById(id)

  if (!room) {
    throw createError('Room not found.', 404)
  }

  if (room.landlordId !== currentUser.id && currentUser.role !== 'admin') {
    throw createError('You do not have permission to update this room.', 403)
  }

  const updatedRoom = updateRoomById(id, payload)
  return createResponse({ data: updatedRoom }, 200)
}

const removeRoom = (id) => {
  const currentUser = requireAuth()
  const room = getRoomById(id)

  if (!room) {
    throw createError('Room not found.', 404)
  }

  if (room.landlordId !== currentUser.id && currentUser.role !== 'admin') {
    throw createError('You do not have permission to delete this room.', 403)
  }

  deleteRoom(id)
  return createResponse({ success: true }, 200)
}

const listUsers = () => {
  const currentUser = requireAuth()
  if (currentUser.role !== 'admin') {
    throw createError('Access denied.', 403)
  }
  return createResponse({ data: getUsers().map(sanitizeUser) }, 200)
}

const removeUser = (id) => {
  const currentUser = requireAuth()
  if (currentUser.role !== 'admin') {
    throw createError('Access denied.', 403)
  }
  deleteUser(id)
  return createResponse({ success: true }, 200)
}

const listFavorites = (params) => {
  const currentUser = requireAuth()
  const userId = params.userId || currentUser.id
  return createResponse({ data: getFavoritesByUser(userId) }, 200)
}

const createFavorite = (payload) => {
  const currentUser = requireAuth()
  const roomId = Number(payload?.room_id || payload?.roomId)

  if (!roomId) {
    throw createError('roomId is required.', 422)
  }

  if (!getRoomById(roomId)) {
    throw createError('Room not found.', 404)
  }

  return createResponse({ data: addFavorite(currentUser.id, roomId) }, 201)
}

const deleteFavoriteByRoom = (roomId, userId) => {
  const removed = removeFavorite(userId, roomId)

  if (!removed) {
    throw createError('Favorite not found.', 404)
  }

  return createResponse({ success: true }, 200)
}

const fakeApi = {
  get(url, config = {}) {
    return withNetworkSimulation(() => {
      const { path, params } = getRequestParams(url, config)

      if (path === '/rooms') {
        return listRooms(params)
      }

      if (path.startsWith('/rooms/')) {
        return readRoom(path.split('/')[2])
      }

      if (path === '/favorites') {
        return listFavorites(params)
      }

      if (path === '/users') {
        return listUsers()
      }

      if (path === '/me') {
        const user = requireAuth()
        return createResponse({ data: sanitizeUser(getUserById(user.id)) }, 200)
      }

      throw createError(`Route ${path} not found.`, 404)
    })
  },

  post(url, payload = {}, config = {}) {
    return withNetworkSimulation(() => {
      const { path } = getRequestParams(url, config)

      if (path === '/login') {
        return login(payload)
      }

      if (path === '/register') {
        return register(payload)
      }

      if (path === '/rooms') {
        return addRoom(payload)
      }

      if (path === '/favorites') {
        return createFavorite(payload)
      }

      if (path === '/contact') {
        return createResponse({ message: 'Message sent successfully!' }, 200)
      }

      if (path === '/logout') {
        clearAuthSession()
        return createResponse({ success: true }, 200)
      }

      throw createError(`Route ${path} not found.`, 404)
    })
  },

  put(url, payload = {}, config = {}) {
    return withNetworkSimulation(() => {
      const { path } = getRequestParams(url, config)

      if (path.startsWith('/rooms/')) {
        return updateRoom(path.split('/')[2], payload)
      }

      throw createError(`Route ${path} not found.`, 404)
    })
  },

  delete(url, config = {}) {
    return withNetworkSimulation(() => {
      const currentUser = requireAuth()
      const { path, params } = getRequestParams(url, config)

      if (path.startsWith('/favorites/')) {
        return deleteFavoriteByRoom(path.split('/')[2], params.userId || currentUser.id)
      }

      if (path.startsWith('/rooms/')) {
        return removeRoom(path.split('/')[2])
      }

      if (path.startsWith('/users/')) {
        return removeUser(path.split('/')[2])
      }

      if (path === '/logout') {
        clearAuthSession()
        return createResponse({ success: true }, 200)
      }

      throw createError(`Route ${path} not found.`, 404)
    })
  },
}

export default fakeApi
