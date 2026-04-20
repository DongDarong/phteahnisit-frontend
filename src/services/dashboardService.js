import api from '../api/axios'

export const getStats = async () => {
  const { data } = await api.get('/rooms')
  const rooms = data.data || []
  
  // Simulated stats calculation
  return {
    totalRooms: rooms.length,
    activeListings: rooms.filter(r => r.status !== 'inactive').length,
    totalUsers: 42, // Simulated for admin
    totalViews: 1250, // Simulated fake analytics
    engagementRate: '12.5%'
  }
}

export const getAnalytics = async () => {
  // Simulating daily views for the last 7 days
  return {
    viewsPerDay: [120, 150, 180, 140, 200, 250, 210],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    topRooms: [
      { id: 1, title: 'Luxury Student Studio', views: 450 },
      { id: 2, title: 'Shared Apartment near RUPP', views: 320 },
      { id: 3, title: 'Cozy Room in Boeng Keng Kang', views: 280 }
    ]
  }
}
