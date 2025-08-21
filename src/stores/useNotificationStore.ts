import type { NotificationType } from '@/types/Notification';
import { create } from 'zustand';

export const useNotificationStore = create<NotificationType>((set, get) => ({
  notifications: [
    {
      id: '1',
      title: 'Welcome to ModernShop!',
      description: 'Discover amazing products and great deals.',
      type: 'info',
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    },
    {
      id: '2',
      title: 'Order Shipped',
      description: 'Your order #12345 has been shipped and is on its way.',
      type: 'success',
      read: false,
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    {
      id: '3',
      title: 'Flash Sale Alert',
      description: '50% off on selected items. Limited time offer!',
      type: 'warning',
      read: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
  ],
  unreadCount: () =>
    get().notifications.filter((notify) => !notify.read).length,
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: Math.random() * 100 + '',
          read: false,
          timestamp: new Date(),
        },
      ],
    })),
  clearAll: () =>
    set({
      notifications: [],
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notify) =>
        !notify.read ? { ...notify, read: true } : notify
      ),
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notify) =>
        notify.id === id ? { ...notify, read: true } : notify
      ),
    })),
  removeNotification: (id) =>
    set({
      notifications: get().notifications.filter((notify) => notify.id !== id),
    }),
}));
