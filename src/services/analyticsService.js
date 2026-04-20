/**
 * analyticsService.js
 * Provides data for both static dashboard and real-time simulation.
 */

const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 500) + 500))
const shouldFail = () => Math.random() < 0.1

// --- STATIC DASHBOARD DATA ---

export const getStats = async () => {
  await randomDelay()
  if (shouldFail()) throw new Error('Failed to fetch analytics stats')
  
  return {
    totalUsers: { value: 1250, trend: 12.5, icon: 'users' },
    totalRooms: { value: 450, trend: 8.2, icon: 'home' },
    totalViews: { value: 15400, trend: 24.1, icon: 'eye' },
    totalFavorites: { value: 3200, trend: 15.4, icon: 'heart' }
  }
}

export const getGrowthData = async () => {
  await randomDelay()
  if (shouldFail()) throw new Error('Failed to fetch growth data')

  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Users',
        data: [100, 150, 220, 300, 450, 520, 680, 800, 950, 1100, 1150, 1250],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Rooms',
        data: [20, 50, 80, 120, 180, 220, 280, 310, 350, 390, 420, 450],
        borderColor: '#6366F1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }
}

export const getRoomPerformance = async () => {
  await randomDelay()
  if (shouldFail()) throw new Error('Failed to fetch room performance')

  return {
    labels: ['Luxury Studio', 'Shared near RUPP', 'Boeng Keng Kang Room', 'Modern Condo', 'Student Budget'],
    datasets: [
      {
        label: 'Views',
        data: [1200, 950, 850, 700, 600],
        backgroundColor: '#10B981'
      }
    ]
  }
}

export const getUserDistribution = async () => {
  await randomDelay()
  if (shouldFail()) throw new Error('Failed to fetch user distribution')

  return {
    labels: ['Students', 'Landlords', 'Admins'],
    datasets: [
      {
        data: [850, 350, 50],
        backgroundColor: ['#10B981', '#6366F1', '#F59E0B'],
        borderWidth: 0
      }
    ]
  }
}

// --- REAL-TIME SIMULATION DATA ---

export const getInitialStats = () => ({
  totalUsers: 1250,
  totalRooms: 450,
  totalViews: 15400,
  totalFavorites: 3200,
});

export const getInitialChartData = () => {
  const labels = Array.from({ length: 10 }, (_, i) => `${i}s ago`).reverse();
  return {
    labels,
    userGrowth: [1200, 1210, 1215, 1220, 1230, 1235, 1240, 1245, 1248, 1250],
    viewPerformance: [50, 80, 45, 90, 120, 60, 75, 110, 85, 95],
  };
};

export const getRandomIncrement = (eventType) => {
  switch (eventType) {
    case 'newUserJoined':
      return Math.floor(Math.random() * 3) + 1;
    case 'newRoomAdded':
      return Math.random() > 0.7 ? 1 : 0;
    case 'roomViewed':
      return Math.floor(Math.random() * 15) + 5;
    case 'favoriteAdded':
      return Math.floor(Math.random() * 5) + 1;
    default:
      return 0;
  }
};
