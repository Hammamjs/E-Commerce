import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import type { Notification } from '@/types/Notification';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { useShallow } from 'zustand/shallow';

const NotificationItem = ({ notification }: { notification: Notification }) => {
  const { markAsRead, removeNotification } = useNotificationStore(
    useShallow((state) => ({
      markAsRead: state.markAsRead,
      removeNotification: state.removeNotification,
    }))
  );

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 text-green-300';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-300';
      case 'error':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-primary/20 text-primary';
    }
  };

  return (
    <div
      className={`p-3 rounded-lg border transition-colors ${
        notification.read
          ? 'bg-muted/50 border-border/50'
          : 'bg-card border-primary/20 shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 ${getTypeColor(
                notification.type
              )}`}
            />
            <h4 className="font-medium text-sm text-foreground truncate">
              {notification.title}
            </h4>
            {!notification.read && (
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            )}
          </div>
          {notification.description && (
            <p className="text-xs text-muted-foreground leading-relaxed mb-2">
              {notification.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
            </span>
            {notification.action && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={notification.action.onClick}
              >
                {notification.action.label}
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {!notification.read && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => markAsRead(notification.id)}
            >
              <Check className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-destructive"
            onClick={() => removeNotification(notification.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const NotificationDropdown = () => {
  const { clearAll, markAllAsRead, unreadCount, notifications } =
    useNotificationStore(
      useShallow((state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
        markAllAsRead: state.markAllAsRead,
        clearAll: state.clearAll,
      }))
    );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount()}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end" sideOffset={8}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Notifications</h3>
            {unreadCount() > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount()} unread
              </Badge>
            )}
          </div>
          {notifications.length > 0 && (
            <div className="flex items-center gap-2 mt-2">
              {unreadCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={markAllAsRead}
                >
                  <Check className="h-3 w-3 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
                onClick={clearAll}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            </div>
          )}
        </div>

        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="p-2 space-y-2">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
