export interface Notification {
  id: string;
  title: string;
  description?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationType {
  notifications: Notification[];
  unreadCount: () => number;
  addNotification: (
    notification: Omit<Notification, 'id' | 'read' | 'timestamp'>
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}
