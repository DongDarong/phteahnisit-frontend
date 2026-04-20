/**
 * realtimeService.js
 * Simulates WebSocket behavior with connection management and event broadcasting.
 */
import { getRandomIncrement } from './analyticsService';

class RealtimeService {
  constructor() {
    this.subscribers = [];
    this.intervalId = null;
    this.isConnected = false;
    this.eventTypes = ['newUserJoined', 'newRoomAdded', 'roomViewed', 'favoriteAdded'];
  }

  connect() {
    if (this.isConnected) return;
    this.isConnected = true;
    console.log('Real-time service connected');
    
    // Start emitting events every 1.5 seconds
    this.intervalId = setInterval(() => {
      this.emitRandomEvents();
    }, 1500);
  }

  disconnect() {
    if (!this.isConnected) return;
    this.isConnected = false;
    clearInterval(this.intervalId);
    this.intervalId = null;
    console.log('Real-time service disconnected');
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== callback);
    };
  }

  emitRandomEvents() {
    if (!this.isConnected) return;

    // Pick 1-3 random events to emit at once
    const count = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...this.eventTypes].sort(() => 0.5 - Math.random());
    const selectedEvents = shuffled.slice(0, count);

    selectedEvents.forEach(type => {
      const payload = {
        type,
        increment: getRandomIncrement(type),
        timestamp: new Date().toLocaleTimeString(),
      };
      
      this.subscribers.forEach(callback => callback(payload));
    });
  }
}

export const realtimeService = new RealtimeService();
