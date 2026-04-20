/**
 * notificationService.js
 * Simulates a WebSocket connection for real-time notifications.
 */

class NotificationService {
  constructor() {
    this.subscribers = [];
    this.intervalId = null;
    this.isConnected = false;
    this.types = [
      {
        type: 'new_user_registered',
        title: 'New Student Joined',
        message: 'A new student just registered from Phnom Penh.',
        severity: 'success',
      },
      {
        type: 'new_room_posted',
        title: 'New Listing Added',
        message: 'A landlord posted a new room near RUPP.',
        severity: 'info',
      },
      {
        type: 'room_reported',
        title: 'Listing Reported',
        message: 'A room near ITC has been flagged for review.',
        severity: 'danger',
      },
      {
        type: 'high_traffic_alert',
        title: 'Traffic Spike',
        message: 'High traffic detected on "Shared Studio" listings.',
        severity: 'warning',
      },
      {
        type: 'system_warning',
        title: 'System Maintenance',
        message: 'Scheduled maintenance in 2 hours.',
        severity: 'warning',
      },
    ];
  }

  connect() {
    if (this.isConnected) return;
    this.isConnected = true;
    console.log('Notification Service Connected');

    // Simulate random events every 4-8 seconds
    const scheduleNext = () => {
      const delay = Math.floor(Math.random() * 4000) + 4000;
      this.intervalId = setTimeout(() => {
        if (this.isConnected) {
          this.emitRandomNotification();
          scheduleNext();
        }
      }, delay);
    };

    scheduleNext();
  }

  disconnect() {
    this.isConnected = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    console.log('Notification Service Disconnected');
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== callback);
    };
  }

  emitRandomNotification() {
    const template = this.types[Math.floor(Math.random() * this.types.length)];
    const notification = {
      id: Date.now(),
      ...template,
      timestamp: new Date().toISOString(),
      read: false,
    };

    this.subscribers.forEach((callback) => callback(notification));
  }

  // Manual trigger for testing
  emit(event) {
    this.subscribers.forEach((callback) => callback(event));
  }
}

export const notificationService = new NotificationService();
