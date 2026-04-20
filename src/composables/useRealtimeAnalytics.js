/**
 * useRealtimeAnalytics.js
 * Composable to manage reactive analytics state and handle real-time subscriptions.
 * Uses shallowReactive to prevent recursion loops with Chart.js.
 */
import { ref, reactive, shallowReactive, onUnmounted } from 'vue';
import { realtimeService } from '../services/realtimeService';
import { getInitialStats, getInitialChartData } from '../services/analyticsService';

export function useRealtimeAnalytics() {
  const isConnected = ref(false);
  const stats = reactive(getInitialStats());
  const initialCharts = getInitialChartData();
  
  // Use shallowReactive for chart arrays to avoid deep proxy overhead 
  // and potential recursion with Chart.js internal observation.
  const chartData = shallowReactive({
    labels: [...initialCharts.labels],
    userGrowth: [...initialCharts.userGrowth],
    viewPerformance: [...initialCharts.viewPerformance],
  });

  let unsubscribe = null;

  const handleEvent = (payload) => {
    const { type, increment, timestamp } = payload;

    // 1. Update numeric stats
    switch (type) {
      case 'newUserJoined':
        stats.totalUsers += increment;
        // Update Line Chart History
        chartData.userGrowth.push(stats.totalUsers);
        chartData.userGrowth.shift();
        break;
      case 'newRoomAdded':
        stats.totalRooms += increment;
        break;
      case 'roomViewed':
        stats.totalViews += increment;
        // Update Bar Chart History
        chartData.viewPerformance.push(increment);
        chartData.viewPerformance.shift();
        break;
      case 'favoriteAdded':
        stats.totalFavorites += increment;
        break;
    }

    // 2. Update Labels (Shift timeframe)
    // We only update labels if they don't already match the current time 
    // to avoid redundant pushes if multiple events happen in the same second.
    const timeLabel = timestamp.split(' ')[0];
    if (chartData.labels[chartData.labels.length - 1] !== timeLabel) {
      chartData.labels.push(timeLabel);
      chartData.labels.shift();
    }
  };

  const start = () => {
    if (isConnected.value) return;
    realtimeService.connect();
    isConnected.value = true;
    unsubscribe = realtimeService.subscribe(handleEvent);
  };

  const stop = () => {
    realtimeService.disconnect();
    isConnected.value = false;
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  };

  onUnmounted(() => {
    stop();
  });

  return {
    isConnected,
    stats,
    chartData,
    start,
    stop,
  };
}
