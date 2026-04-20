/**
 * useNotifications.js
 * Composable for managing notification state and connection.
 */
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { notificationService } from '../services/notificationService';

const notifications = ref([]);
const toasts = ref([]);

export function useNotifications() {
  const unreadCount = computed(() => {
    return notifications.value.filter((n) => !n.read).length;
  });

  const handleNewNotification = (notification) => {
    // Add to list (at the top)
    notifications.value.unshift(notification);
    
    // Add to active toasts
    toasts.value.push(notification);

    // Keep only last 50 notifications for performance
    if (notifications.value.length > 50) {
      notifications.value.pop();
    }
  };

  const markAsRead = (id) => {
    const notification = notifications.value.find((n) => n.id === id);
    if (notification) {
      notification.read = true;
    }
  };

  const markAllAsRead = () => {
    notifications.value.forEach((n) => {
      n.read = true;
    });
  };

  const clearAll = () => {
    notifications.value = [];
  };

  const removeToast = (id) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  const start = () => {
    notificationService.connect();
  };

  const stop = () => {
    notificationService.disconnect();
  };

  // Shared subscription setup (singleton behavior)
  let unsubscribe = null;
  onMounted(() => {
    unsubscribe = notificationService.subscribe(handleNewNotification);
  });

  return {
    notifications,
    toasts,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
    removeToast,
    start,
    stop,
  };
}
