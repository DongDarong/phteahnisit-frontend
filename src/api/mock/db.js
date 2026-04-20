const STORAGE_KEYS = {
  users: 'rrfs_mock_users',
  rooms: 'rrfs_mock_rooms',
  favorites: 'rrfs_mock_favorites',
}

const seedUsers = [
  { id: 1, name: 'Sokha Dara', email: 'student@example.com', password: 'password123', role: 'student' },
  { id: 2, name: 'Malis Chenda', email: 'landlord@example.com', password: 'password123', role: 'landlord' },
  { id: 3, name: 'Vanna Kim', email: 'student2@example.com', password: 'password123', role: 'student' },
]

const seedRooms = [
  {
    id: 1,
    title: 'Bright Private Room near RUPP',
    description: 'A clean private room with Wi-Fi, air conditioning, and easy access to cafes and transport.',
    price: 145,
    location: 'Tuol Kork, Phnom Penh',
    university: 'RUPP',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    landlordId: 2,
  },
  {
    id: 2,
    title: 'Student Studio close to BELTEI',
    description: 'Compact studio with private bathroom and secure parking in a quiet student neighborhood.',
    price: 180,
    location: 'Sen Sok, Phnom Penh',
    university: 'BELTEI',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    landlordId: 2,
  },
  {
    id: 3,
    title: 'Affordable Shared Room near ITC',
    description: 'Shared student room with two beds, study desks, and included utilities.',
    price: 90,
    location: 'Russian Federation Blvd, Phnom Penh',
    university: 'ITC',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    landlordId: 2,
  },
  {
    id: 4,
    title: 'Modern Room for Female Students',
    description: 'Spacious room in a gated property with laundry service and 24-hour security.',
    price: 210,
    location: 'Boeung Keng Kang, Phnom Penh',
    university: 'PPIU',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    landlordId: 2,
  },
  {
    id: 5,
    title: 'Budget Room near Norton University',
    description: 'Simple and comfortable room ideal for students who want low monthly rent near campus.',
    price: 110,
    location: 'Dangkor, Phnom Penh',
    university: 'Norton University',
    image: 'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80',
    landlordId: 2,
  },
  {
    id: 6,
    title: 'Stylish Student Room with Balcony',
    description: 'Well-lit room with balcony, strong internet, and walking distance to campus.',
    price: 230,
    location: 'Chamkar Mon, Phnom Penh',
    university: 'RUPP',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    landlordId: 2,
  },
  {
    id: 7,
    title: 'Private Room with Study Desk',
    description: 'Quiet private room with furnished workspace, fan, and nearby local market.',
    price: 135,
    location: 'Tuol Tom Poung, Phnom Penh',
    university: 'NUM',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    landlordId: 2,
  },
  {
    id: 8,
    title: 'Cozy Room near University of Cambodia',
    description: 'Comfortable rental with shared kitchen, motorcycle parking, and utility package included.',
    price: 170,
    location: 'Meanchey, Phnom Penh',
    university: 'University of Cambodia',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    landlordId: 2,
  },
]

const seedFavorites = [
  { userId: 1, roomId: 2 },
  { userId: 1, roomId: 6 },
  { userId: 3, roomId: 1 },
]

const clone = (value) => JSON.parse(JSON.stringify(value))

const readCollection = (key, fallback) => {
  const raw = localStorage.getItem(key)

  if (!raw) {
    localStorage.setItem(key, JSON.stringify(fallback))
    return clone(fallback)
  }

  try {
    return JSON.parse(raw)
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback))
    return clone(fallback)
  }
}

export const db = {
  users: readCollection(STORAGE_KEYS.users, seedUsers),
  rooms: readCollection(STORAGE_KEYS.rooms, seedRooms),
  favorites: readCollection(STORAGE_KEYS.favorites, seedFavorites),
}

export const persistCollection = (collectionName) => {
  const storageKey = STORAGE_KEYS[collectionName]

  if (!storageKey) {
    throw new Error(`Unknown collection: ${collectionName}`)
  }

  localStorage.setItem(storageKey, JSON.stringify(db[collectionName]))
}

export const getNextId = (collectionName) => {
  const collection = db[collectionName] || []
  return collection.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 0), 0) + 1
}
